module.exports = (server) => {
    const Auction = require('./Auction');
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('new connection');
    });

    const auctionQueue = [];
    let currentAuction = null;
    // let auctionStatus = false;
    let timerID;

    const newAuction = (details) => {
        // auctionQueue.push(new Auction(details));
        // if (auctionStatus == false) {
        //     startAuction();
        // }
        currentAuction = new Auction(details);
    };

    const startAuction = () => {
        // currentAuction = auctionQueue[0];
        // auctionStatus = true;
        timerID = setInterval(timer, 1000);

        const timer = () => {
            if (duration === 0) {
                clearInterval(timerID);
                endAuction();
            }
            let duration = currentAuction.duration--;
        };
    };

    const endAuction = () => { };

    // module.exports = {
    //     newAuction,
    //     currentAuction
    // };
    return {
        newAuction,
        currentAuction
    };
};
