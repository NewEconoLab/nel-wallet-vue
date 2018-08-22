import { store } from "../store/index";
import { Process, Auction, AuctionState, AuctionInfoView } from "../entity/AuctionEntitys";
export class AuctionInfoService
{
    static auctionId: string;
    static getAuctionInfo()
    {
        if (this.auctionId)
        {
            let auction_Store = new store.auction();
            let auction = auction_Store.queryStore(this.auctionId);
            let auctionInfo = new AuctionInfoView(auction);
            return auctionInfo;
        }
    }

    /**
     * 时间轴
     * @param auction 竞拍类
     */
    static getProcess(auction: Auction)
    {
        let addWho = auction.addwholist[ 0 ];
        let process = new Process(auction.startTime.blocktime);
        let currenttime = !auction.endTime ? new Date().getTime() : auction.endTime.blocktime;
        let oldtime = accSub(currenttime, auction.startTime.blocktime);
        let a: number = 0;
        if (auction.auctionState == AuctionState.fixed || auction.auctionState == AuctionState.open)
        {
            process.state = AuctionState.fixed;
            a = accDiv(oldtime, 5 * 3 * 60 * 1000);
            process.timearr.length = 3;
        }
        else if (auction.auctionState == AuctionState.random)
        {
            process.state = AuctionState.random;
            a = accDiv(oldtime, 5 * 5 * 60 * 1000);
            process.timearr.length = 5;
        } else
        {
            process.state = AuctionState.end;
            let subtime = accSub(addWho.lastTime.blocktime, auction.startTime.blocktime);
            if (subtime < 5 * 2 * 60 * 1000)  //判断第三天有无出价
            {
                a = accDiv(oldtime, 3 * 5 * 60 * 1000);
            } else
            {
                a = accDiv(oldtime, 5 * 5 * 60 * 1000);
            }
        }
        let width = a >= 1 ? 100 : accMul(a, 100);
        process.width = parseInt(width.toString());
        return process;
    }
}