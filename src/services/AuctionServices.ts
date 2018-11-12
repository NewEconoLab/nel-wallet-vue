import { Auction, AuctionState, AuctionView } from "../entity/AuctionEntitys";
import { tools } from "../tools/importpack";
import { LoginInfo, Task, ConfirmType, TaskType, SellDomainInfo, Result, TaskFunction, RootDomainInfo } from "../tools/entity";
import { AuctionStore } from "../store/AuctionStore";

/**
* 竞拍方法类
*/
export class AuctionService
{
    //竞拍列表
    auctionList: Auction[];
    auctionViewList: AuctionView[];
    store: AuctionStore;
    root: RootDomainInfo;

    constructor(store: AuctionStore)
    {
        this.store = store;
    }

    /**
     * 获得列表数据
     * @param address 地址
     * @param currentPage 当前有页码
     * @param pageSize 分页条数
     * @returns AuctionView[]
     */
    async getMyAuctionList(address: string, currentPage: number, pageSize: number): Promise<AuctionView[]>
    {
        let auctionViewList = [];
        let auctions = await this.getAuctionList(address);
        auctions = !auctions ? [] : auctions;
        for (let index = 0; index < auctions.length; index++)
        {
            const auction = auctions[ index ];
            if (auction.auctionState != AuctionState.open)
            {
                if (auction.auctionState == AuctionState.end)
                {
                    if (auction.addWho)
                    {
                        let view = new AuctionView(auction);
                        auctionViewList.push(view);
                    }
                }
                else
                {
                    let view = new AuctionView(auction);
                    auctionViewList.push(view);
                }
            }
        }
        auctionViewList.sort((a1, a2) =>
        {
            return a2.startTime.blocktime - a1.startTime.blocktime;
        })
        return auctionViewList;
    }

    /**
     * 获得分页竞拍数据
     * @param address 要查询的地址
     * @param currentPage 当前页码
     * @param pageSize 查询的条数
     */
    async getAuctionList(address: string): Promise<Auction[]>
    {
        try
        {
            let auctionSessionList = this.store.getSotre() as Auction[];
            if (!!auctionSessionList && auctionSessionList.length > 0)
            {
                return auctionSessionList;
            }
            else
            {
                //从列表种拉取数据
                let count = await tools.wwwtool.getauctioninfocount(address, "." + this.root.rootname);
                let result = await tools.wwwtool.getauctioninfobyaddress(address, 1, count, "." + this.root.rootname);
                if (result)
                {
                    let auctionList = result[ 0 ].list as Auction[];
                    //对比信息并保存至缓存
                    this.store.setSotre(auctionList, address);
                    //获得处理后的缓存数据
                    auctionList = this.store.getSotre() as Auction[];
                    return auctionList;
                }
                else  
                {
                    let list: Auction[] = this.store.getSotre();
                    return list ? list : [];
                }
            }
        }
        catch (error)
        {

        }

    }

    /**
     * 更新可能会有状态变化的域名数据
     */
    async updateAuctionList(address: string)
    {
        let auctionList = this.store.getSotre();
        let ids: string[] = [];
        //获得所有需要更新的域名竞拍id
        for (let index = 0; index < auctionList.length; index++)
        {
            const auction = auctionList[ index ];
            if (auction.auctionState == AuctionState.end)
            {
                if (auction.addWho)
                {
                    if (auction.maxBuyer == auction.addWho.address)    //未领取的域名需要更新
                    {
                        if (!auction.addWho.getdomainTime)
                            ids.push(auction.auctionId);
                    }
                    else                                      //未退币的域名需要更新
                    {
                        if (!auction.addWho.accountTime)
                            ids.push(auction.auctionId);
                    }
                }
            }
            else                                          //未结束的域名都需要更新
            {
                ids.push(auction.auctionId);
            }
        }
        let result = await tools.wwwtool.getauctioninfobyaucitonid(address, ids, "." + this.root.rootname);
        if (result)
        {
            let list = result[ 0 ].list as Auction[];
            this.store.setSotre(list, address);
            this.auctionList = this.store.getSotre();
        }
        if (TaskFunction.auctionStateUpdate)
            TaskFunction.auctionStateUpdate();
    }

    /**
     * 根据域名查询竞标信息
     * @param subname 二级域名
     * @param rootname 根域名
     */
    async queryAuctionByDomain(subname: string): Promise<Auction>
    {
        const res = await tools.wwwtool.getdomainauctioninfo([ subname, this.root.rootname ].join('.'));
        const info = res ? res[ 0 ] : undefined;
        let auction = new Auction();
        if (info)
        {
            auction.parse(info, LoginInfo.getCurrentAddress());
        }
        return auction;

    }

    /**
     * 开标方法
     * @param subname 二级域名
     * @param rootname 根域名
     */
    async startAuction(subname: string): Promise<any>
    {
        let address = LoginInfo.getCurrentAddress()     //当前地址
        let domain: string = [ subname, this.root.rootname ].join(".");
        let auction: Auction = new Auction();
        try
        {
            let result = await tools.nnssell.startAuciton(subname, this.root);
            let txid = result.info;
            let task = new Task(ConfirmType.contract, txid, { domain: domain })
            tools.taskManager.addTask(task, TaskType.openAuction);
            let result2 = await tools.wwwtool.getauctioninfobyaucitonid(address, [ txid ], "." + this.root.rootname);
            if (!!result2)
            {
                let list = result[ 0 ].list as Auction[];
                auction.parse(list[ 0 ], address);
            }
            else
            {
                auction.auctionId = txid;
                auction.domain = subname;
                auction.fulldomain = domain;
                auction.auctionState = AuctionState.open;
            }
            this.store.push(auction);
            return txid;
        } catch (error)
        {

        }
    }

    /**
     * 开标方法类
     * @param domain 
     * @param amount 
     */
    async auctionRaise(auctionId: string, domain: string, amount: number, register: Neo.Uint160)
    {
        let address = LoginInfo.getCurrentAddress();
        let res = new Result()
        try
        {
            //加价
            let result = await tools.nnssell.raise(auctionId, amount, register);
            if (!result.err)
            {
                let txid = result.info;
                let task = new Task(
                    ConfirmType.contract, txid, { domain: domain, amount: amount }
                )
                tools.taskManager.addTask(task, TaskType.addPrice);
                //根据标地id查询域名状态
                let result2 = await tools.wwwtool.getauctioninfobyaucitonid("", [ auctionId ], "." + this.root.rootname);
                let auction = new Auction()
                if (res)
                {
                    res.err = false;
                    res.info = txid;
                    let list = result2[ 0 ].list as Auction[];
                    auction.parse(list[ 0 ], address);
                }
                else
                {
                    auction.auctionState = AuctionState.open;
                }
                this.store.push(auction);
            }
            else
            {
                res.err = true;
                res.info = "raise fail";
            }
            return res;
        }
        catch (error)
        {
            throw error;
        }
    }

    /**
     * 竞拍缓存添加方法
     * @param auction 竞拍方法
     */
    pushAuctionToSession(auction: Auction)
    {
        let address = LoginInfo.getCurrentAddress();
        let sessionlist = this.store.getSotre();
        sessionlist.push(auction);
        this.store.setSotre(sessionlist, address)
    }
}