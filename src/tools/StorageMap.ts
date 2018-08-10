import { sessionStoreTool } from "./storagetool";

export default class Store
{
    static blockheight = new sessionStoreTool("block");
    static auctionInfo = new sessionStoreTool("auctionInfo");
}