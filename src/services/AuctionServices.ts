import { Auction, AuctionState, AuctionView, AuctionInfoView, AuctionAddress } from "../entity/AuctionEntitys";
import { tools } from "../tools/importpack";
import { store } from "../store/index";
import { LoginInfo, Task, ConfirmType, TaskType, SellDomainInfo, Result } from "../tools/entity";

/**
* 竞拍方法类
*/
export class AuctionService
{
    //竞拍列表
    static auctionList: Auction[];
    static auctionViewList: AuctionView[];

    /**
     * 获得列表数据
     * @param address 地址
     * @param currentPage 当前有页码
     * @param pageSize 分页条数
     * @returns AuctionView[]
     */
    static async getMyAuctionList(address: string, currentPage: number, pageSize: number): Promise<AuctionView[]>
    {
        this.auctionViewList = [];
        let auctions = await this.getAuctionList(address, currentPage, pageSize);
        auctions = !auctions ? [] : auctions;
        for (let index = 0; index < auctions.length; index++)
        {
            const auction = auctions[ index ];
            if (auction.auctionState != AuctionState.open)
            {
                let view = new AuctionView(auction);
                this.auctionViewList.push(view);
            }
        }
        return this.auctionViewList;
    }

    /**
     * 获得分页竞拍数据
     * @param address 要查询的地址
     * @param currentPage 当前页码
     * @param pageSize 查询的条数
     */
    static async getAuctionList(address: string, currentPage: number, pageSize: number): Promise<Auction[]>
    {
        try
        {
            let list: Auction[] = store.auction.getSotre();
            if (list && list.length > 0)
            {
                return list;
            }
            //从列表种拉取数据
            let result = await tools.wwwtool.getauctioninfobyaddress(address, currentPage, pageSize);
            if (result)
            {
                let auctionList = result[ 0 ].list as Auction[];
                //对比信息并保存至缓存
                store.auction.setSotre(auctionList, address);
                //获得处理后的缓存数据
                auctionList = store.auction.getSotre() as Auction[];
                return this.auctionList;
            } else
            {
                return [];
            }
        } catch (error)
        {

        }

    }

    /**
     * 更新可能会有状态变化的域名数据
     */
    static async updateAuctionList(address: string)
    {
        let auctionList = store.auction.getSotre();
        let ids: string[] = [];
        //获得所有需要更新的域名竞拍id
        for (let index = 0; index < auctionList.length; index++)
        {
            const auction = auctionList[ index ];
            if (auction.auctionState == AuctionState.end && auction.addWho)
            {
                if (auction.maxBuyer == auction.addWho.address)    //未领取的域名需要更新
                {
                    if (!auction.addWho.getdomainTime)
                        ids.push(auction.auctionId);
                } else                                      //未退币的域名需要更新
                {
                    if (!auction.addWho.accountTime)
                        ids.push(auction.auctionId);
                }
            } else                                          //未结束的域名都需要更新
            {
                ids.push(auction.auctionId);
            }
        }
        let result = await tools.wwwtool.getauctioninfobyaucitonid(address, ids);
        if (result)
        {
            let list = result[ 0 ].list as Auction[];
            store.auction.setSotre(list, address);
            this.auctionList = store.auction.getSotre();
        }
    }

    /**
     * 根据竞拍id获得竞拍详情
     * @param id 竞拍id
     */
    static getAuctionInfoById(id: string)
    {
        let auction = store.auction.queryStore(id);
        let view = new AuctionInfoView(auction);
        return view;
    }

    /**
     * 根据域名查询竞标信息
     * @param subname 二级域名
     * @param rootname 根域名
     */
    static async queryAuctionByDomain(subname: string, rootname): Promise<Auction>
    {
        let info: SellDomainInfo = await tools.nnssell.getSellingStateByDomain([ subname, rootname ].join("."));
        let auction = new Auction();
        if (info.id)
        {
            auction = await tools.nnssell.getAuctionByStateInfo(info);
            return auction;
        }
        return auction;

    }

    /**
     * 开标方法
     * @param subname 二级域名
     * @param rootname 根域名
     */
    static async startAuction(subname: string, rootname: string): Promise<any>
    {
        let address = LoginInfo.getCurrentAddress()     //当前地址
        let domain: string = [ subname, rootname ].join(".");
        let roothash: Neo.Uint256 = tools.nnstool.nameHash(rootname);
        let auction: Auction = new Auction();
        try
        {
            let result = await tools.nnssell.startAuciton(subname, roothash);
            let txid = result.info;
            let task = new Task(ConfirmType.contract, txid, { domain: domain })
            tools.taskManager.addTask(task, TaskType.openAuction);
            let result2 = await tools.wwwtool.getauctioninfobyaucitonid(address, [ txid ]);
            if (!!result2)
            {
                let list = result[ 0 ].list as Auction[];
                auction.parse(list[ 0 ], address);
            } else
            {
                auction.auctionId = txid;
                auction.domain = subname;
                auction.fulldomain = domain;
                auction.auctionState = AuctionState.open;
            }
            store.auction.push(auction);
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
    static async auctionRaise(auctionId: string, domain: string, amount: number)
    {
        let address = LoginInfo.getCurrentAddress();
        let res = new Result()
        try
        {
            //加价
            let result = await tools.nnssell.raise(auctionId, amount);
            if (!result.err)
            {
                let txid = result.info;
                let task = new Task(
                    ConfirmType.contract, txid, { domain: domain, amount: amount }
                )
                tools.taskManager.addTask(task, TaskType.addPrice);
                //根据标地id查询域名状态
                let result2 = await tools.wwwtool.getauctioninfobyaucitonid("", [ auctionId ]);
                let auction = new Auction()
                if (res)
                {
                    res.err = false;
                    res.info = txid;
                    let list = result2[ 0 ].list as Auction[];
                    auction.parse(list[ 0 ], address);
                } else
                {
                    auction.auctionState = AuctionState.open;
                }
                store.auction.push(auction);
            } else
            {
                res.err = true;
                res.info = "raise fail";
            }
            return res;
        } catch (error)
        {

        }
    }

    /**
     * 竞拍缓存添加方法
     * @param auction 竞拍方法
     */
    static pushAuctionToSession(auction: Auction)
    {
        let address = LoginInfo.getCurrentAddress();
        let sessionlist = store.auction.getSotre();
        sessionlist.push(auction);
        store.auction.setSotre(sessionlist, address)
    }
}