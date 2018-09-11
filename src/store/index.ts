import { AuctionStore } from "./AuctionStore";

export namespace store
{
    export const auction_neo = new AuctionStore("AUCTION_LIST_NEO");
    export const auction_test = new AuctionStore("AUCTION_LIST_TEST");
}