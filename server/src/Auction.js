class Auction {
    constructor(item, id) {
        this.item = item.itemName;
        this.quantity = item.quantity;
        this.minBid = item.minBid;
        this.seller = item.seller;
        this.winningBid = 0;
        this.ID = id;
        this.bidder = '';
        this.duration = 90;
    }

    get details() {
        return {
            itemName: this.item,
            quantity: this.quantity,
            seller: this.seller,
            buyer: this.bidder,
            bid: this.winningBid,
            duration: this.duration
        };
    }

    placeBid(bidder, bid) {
        this.bidder = bidder;
        this.winningBid = bid;
    }
}

module.exports = Auction;
