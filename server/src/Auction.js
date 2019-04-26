class Auction {
    constructor(item) {
        this.item = item.itemName;
        this.quantity = item.quantity;
        this.minBid = item.minBid;
        this.seller = item.seller;
        this.winningBid = 0;
        this.bidder = '';
        this.duration = 90;
    }

    get() {
        return {
            itemName: this.item,
            quantity: this.quantity,
            seller: this.seller,
            buyer: this.bidder,
            value: this.winningBid
        };
    }

    placeBid(bidder, bid) {
        this.bidder = bidder;
        this.winningBid = bid;
    }
}

module.exports = Auction;
