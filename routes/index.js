'use strict';

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var io = require('../app').io;
var socket;

var databaseUrl = 'mydb';
var collections = ['users', 'auctions'];
var db = mongojs(databaseUrl, collections);

db.on('connect', () => {
    console.log('MongoDB connected!');
});

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/getUsers', (req, res, next) => {
    db.users.find((err, data) => {
        res.send(data);
    });
});

router.post('/newUser', (req, res) => {
    db.users.insert(req.body, (err, data) => {
        if (err || !data) {
            console.error('Users not saved');
            res.sendStatus(500);
        } else {
            console.log(`New user created! User: ${data.player}`);
            res.sendStatus(200);
        }
    });
});

router.get('/getAuctions', (req, res) => {
    db.auctions.find((err, users) => {
        if (err) {
            console.error('No users found');
            res.sendStatus(500);
        } else {
            res.send(users);
        }
    });
});

router.post('/startAuction', (req, res) => {
    db.auctions.insert(req.body, (err, data) => {
        if (err || !data) {
            console.error('Auction not created!');
            res.sendStatus(500);
        } else {
            console.log('New auction added to the list!');

            // Start auction via socket.io
            var auction = findAuctions(function(auction) {
                if (auction) {
                    beginAuction(auction);
                    res.sendStatus(200);
                } else {
                    res.sendStatus(500);
                }
            });
        }
    });
});

function findAuctions(callback) {
    db.auctions.find((err, aucs) => {
        if (err || !aucs) {
            console.error('No auction to start!');
            return null;
        } else {
            if (aucs.length === 1) {
                callback(aucs[0]);
            }
        }
    });
}

function removeAuctionFromList(id) {
    db.auctions.remove({_id: id});
    findAuctions(function(data) {
        return data;
    });
}

function beginAuction(item) {
    io.emit('beginAuction', item);
    var timeLeft = 90;
    var winBid = {};
    
    var internalObj = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            io.emit('updateTime', timeLeft);
        }
        if (timeLeft === 0) {
            clearInterval(internalObj);
            finalizeAuction(item, winBid, function() {
                var auction = removeAuctionFromList(item._id);
                console.warn(auction);
                io.emit('finalizeAuction');
                if (auction) {
                    beginAuction(auction);
                }
            });
        }
    }, 1000);

    io.on('connection', (mySocket) => {
        console.log('Socket.io connect!');

        mySocket.on('ping', () => {
            mySocket.emit('pong', 'pong');
        });

        socket = mySocket;

        mySocket.on('isRunningAuction', () => {
            if (item) {
                if (winBid.bidder) {
                    item.minBid = winBid.winBid;
                }
                mySocket.emit('runningAuction', item);
            }
        });

        socket.on('placeBid', (data) => {
            if (timeLeft <= 10) {
                timeLeft += 10;
            }
            winBid = data;

            io.emit('updateBid', {winBid: data.winBid});
        });
    });
}

function finalizeAuction(item, winBid, callback) {
    if (winBid.bidder) {
        db.users.find((err, users) => {
            if (err || !users) {
                console.error('No user found!');
            } else {
                // The bidder part
                let bidder = users.find((usr) => {
                    return usr.player === winBid.bidder;
                });
                let bidderBal = bidder.balance - winBid.winBid;
                let bidderInv = bidder.inventory;
                bidderInv[item.itemName] += item.quantity;
                db.users.update({player: bidder.player}, {$set: {balance: bidderBal, inventory: bidderInv}});

                // The seller part
                let seller = users.find((usr) => {
                    return usr.player === item.seller;
                });
                let sellerBal = seller.balance + winBid.winBid;
                let sellerInv = seller.inventory;
                sellerInv[item.itemName] -= item.quantity;
                db.users.update({player: seller.player}, {$set: {balance: sellerBal, inventory: sellerInv}});

                callback();
            }
        });
    }
}

module.exports = router;
