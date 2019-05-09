module.exports = (server) => {
    const Auction = require('./Auction');
    const db = require('./db');
    const io = require('socket.io')(server);

    const auctionQueue = [];
    let auctionID = 0;
    let currentAuction = null;
    let auctionStatus = false;

    io.on('connection', (socket) => {
        console.log(`${new Date().toLocaleTimeString('pt-PT')}: new connection`);

        socket.on('placeBid', bid => {
            if (bid.id == currentAuction.ID) {
                currentAuction.placeBid(bid.bidder, bid.bid);
                if (currentAuction.duration < 10) {
                    currentAuction.duration = 10;
                }
                console.log(`New bid: Bidder -> ${bid.bidder}; Bid -> ${bid.bid}`);
                io.sockets.emit('newBid', currentAuction.details);
            }
        });
    });

    const newAuction = (details) => {
        auctionQueue.push(new Auction(details, auctionID++));

        if (auctionStatus == false) {
            startAuction();
        }
    };

    const getCurrentAuction = () => currentAuction;

    const startAuction = () => {
        currentAuction = auctionQueue.shift();
        auctionStatus = true;
        const timerID = setInterval(() => {
            currentAuction.duration--;
            if (currentAuction.duration === 0) {
                clearInterval(timerID);
                endAuction().catch(reason => console.error(reason));
            }
        }, 1000);
        // console.log('begin auction');
        io.sockets.emit('startAuction', currentAuction);
    };

    const endAuction = async () => {
        const auctionDetails = currentAuction.details;

        if (auctionDetails.buyer != '') {
            try {
                const item = auctionDetails.itemName;

                // Update seller
                const sellerName = auctionDetails.seller;
                const seller = await db.getUser(sellerName);
                let sellerPayload = {
                    coins: seller.coins + auctionDetails.bid,
                    inventory: seller.inventory
                };
                sellerPayload.inventory[item] = seller.inventory[item] - auctionDetails.quantity;
                await db.updateUser(sellerName, sellerPayload);

                // Update buyer
                const buyerName = auctionDetails.buyer;
                const buyer = await db.getUser(buyerName);
                let buyerPayload = {
                    coins: buyer.coins - auctionDetails.bid,
                    inventory: buyer.inventory
                };
                buyerPayload.inventory[item] = buyer.inventory[item] + auctionDetails.quantity;
                await db.updateUser(buyerName, buyerPayload);

                io.sockets.emit('endAuction', auctionDetails);
                // console.log('end of auction');
            } catch (e) {
                throw e;
            }
        } else {
            io.sockets.emit('endAuction');
        }

        // Wait 10 seconds between auctions
        setTimeout(() => {
            if (auctionQueue.length > 0) {
                startAuction();
            } else {
                currentAuction = null;
                auctionStatus = false;
            }
        }, 10000);
    };

    return {
        newAuction,
        getCurrentAuction
    };
};
