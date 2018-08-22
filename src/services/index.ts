import { AuctionInfoService } from "./AuctionInfoService";
import { AuctionService } from "./AuctionServices";

export namespace services
{
    export const auctionInfo = AuctionInfoService;
    export const auction = AuctionService;
}