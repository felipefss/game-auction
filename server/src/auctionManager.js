module.exports = (server) => {
    const Auction = require('./Auction');
    const io = require('socket.io')(server);

    const auctionQueue = [];
    let auctionID = 0;
    let currentAuction = null;
    // let auctionStatus = false;
    // let timerID;

    io.on('connection', (socket) => {
        console.log(`${new Date().toLocaleTimeString('pt-PT')}: new connection`);

        socket.on('placeBid', bid => {
            if (bid.id == currentAuction.ID) {
                currentAuction.placeBid(bid.bidder, bid.bid);
                if (currentAuction.duration < 10) {
                    currentAuction.duration = 10;
                }
                console.log(`New bid: Bidder -> ${bid.bidder}; Bid -> ${bid.bid}`);
                socket.emit('newBid', currentAuction);
            }
        });
    });

    const newAuction = (details) => {
        // auctionQueue.push(new Auction(details));
        // if (auctionStatus == false) {
        //     startAuction();
        // }
        currentAuction = new Auction(details, auctionID++);
        startAuction();
    };

    const startAuction = () => {
        // currentAuction = auctionQueue[0];
        // auctionStatus = true;
        const timerID = setInterval(() => {
            currentAuction.duration--;
            if (currentAuction.duration === 0) {
                clearInterval(timerID);
                endAuction();
            }
        }, 1000);
        console.log('begin auction')
        io.sockets.emit('startAuction', currentAuction);

        // const timer = ;
    };

    const endAuction = () => {
        console.log('end of auction')
    };

    return {
        newAuction,
        currentAuction
    };
};
