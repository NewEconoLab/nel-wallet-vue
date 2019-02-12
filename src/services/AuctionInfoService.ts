import { store } from "../store/index";
import { Process, Auction, AuctionState, AuctionInfoView, AuctionView } from "../entity/AuctionEntitys";
import { tools } from "../tools/importpack";
import { AuctionStore } from "../store/AuctionStore";
export class AuctionInfoService
{
    day: number;
    // store: AuctionStore;
    auctionInfo: Auction;
    auctionId: string;

    constructor(day: number)
    {
        // this.store = store;
        this.day = day;
    }

    getAuctionInfo()
    {
        // this.auctionId = id;
        // let auction = this.store.queryStore(this.auctionId);
        let auctionInfoItem = new AuctionInfoView(this.auctionInfo);
        auctionInfoItem.process = this.getProcess(auctionInfoItem);
        return auctionInfoItem;
    }

    /**
     * 时间轴
     * @param auction 竞拍类
     */
    getProcess(auction: AuctionInfoView)
    {
        let process = new Process(auction.startTime.blocktime, this.day);
        let currenttime = !!auction.endTime && !!auction.endTime.blocktime ? auction.endTime.blocktime : tools.timetool.currentTime();
        let oldtime = accSub(currenttime, auction.startTime.blocktime);
        let a: number = 0;
        if (auction.state == AuctionState.fixed)
        {
            process.state = AuctionState.fixed;
            a = accDiv(oldtime, 3 * this.day);
            process.timearr.length = 3;
        }
        else if (auction.state == AuctionState.random)
        {
            process.state = AuctionState.random;
            a = accDiv(oldtime, 5 * this.day);
            process.timearr.length = 5;
        } else
        {
            process.state = AuctionState.end;
            let subtime = accSub(auction.addwho.lastTime.blocktime, auction.startTime.blocktime);
            if (subtime < 2 * this.day)  //判断第三天有无出价
            {
                a = accDiv(oldtime, 3 * this.day);
                process.timearr.length = 3;
            } else
            {
                a = accDiv(oldtime, 5 * this.day);
                process.timearr.length = 5;
            }
        }
        let width = a >= 1 ? 100 : accMul(a, 100);
        process.width = parseFloat(width.toFixed(2));
        return process;
    }
}