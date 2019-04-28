module.exports = (server) => {
    const Auction = require('./Auction');
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log(`${new Date().toLocaleTimeString('pt-PT')}: new connection`);
    });

    const auctionQueue = [];
    let auctionID = 0;
    let currentAuction = null;
    // let auctionStatus = false;
    // let timerID;

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
