import { store } from "../store/index";
import { Process, Auction, AuctionState, AuctionInfoView, AuctionView } from "../entity/AuctionEntitys";
import { tools } from "../tools/importpack";
export class AuctionInfoService
{
    static auctionId: string;
    static getAuctionInfo()
    {
        if (this.auctionId)
        {
            let auction = store.auction.queryStore(this.auctionId);
            let auctionInfo = new AuctionInfoView(auction);
            return auctionInfo;
        }
    }

    /**
     * 时间轴
     * @param auction 竞拍类
     */
    static getProcess(auction: AuctionInfoView)
    {
        let process = new Process(auction.startTime.blocktime);
        let currenttime = !!auction.endTime && !!auction.endTime.blocktime ? auction.endTime.blocktime : tools.timetool.currentTime();
        let oldtime = accSub(currenttime, auction.startTime.blocktime);
        let a: number = 0;
        if (auction.state == AuctionState.fixed)
        {
            process.state = AuctionState.fixed;
            a = accDiv(oldtime, 3 * 24 * 60 * 60);
            process.timearr.length = 3;
        }
        else if (auction.state == AuctionState.random)
        {
            process.state = AuctionState.random;
            a = accDiv(oldtime, 5 * 24 * 60 * 60);
            process.timearr.length = 5;
        } else
        {
            process.state = AuctionState.end;
            let subtime = accSub(auction.addwho.lastTime.blocktime, auction.startTime.blocktime);
            if (subtime < 2 * 5 * 60)  //判断第三天有无出价
            {
                a = accDiv(oldtime, 3 * 24 * 60 * 60);
                process.timearr.length = 3;
            } else
            {
                a = accDiv(oldtime, 5 * 24 * 60 * 60);
                process.timearr.length = 5;
            }
        }
        let width = a >= 1 ? 100 : accMul(a, 100);
        process.width = parseFloat(width.toFixed(2));
        return process;
    }
}