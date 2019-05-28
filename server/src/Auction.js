class Auction {
    constructor(item, id) {
        this.item = item.itemName;
        this.quantity = item.quantity;
        this.minBid = item.minBid;
        this.winningBid = item.minBid;
        this.seller = item.seller;
        this.ID = id;
        this.bidder = '';
        this.duration = 90;
    }

    get details() {
        return {
            ID: this.ID,
            itemName: this.item,
            quantity: this.quantity,
            seller: this.seller,
            buyer: this.bidder,
            bid: this.winningBid,
            minBid: this.minBid,
            duration: this.duration
        };
    }

    placeBid(bidder, bid) {
        this.bidder = bidder;
        this.winningBid = bid;
    }
}

module.exports = Auction;
