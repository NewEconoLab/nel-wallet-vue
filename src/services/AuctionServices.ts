import { Auction, AuctionState, AuctionView, AuctionInfoView, AuctionAddress } from "../entity/AuctionEntitys";
import { tools } from "../tools/importpack";
import { store } from "../store/index";
import { LoginInfo } from "../tools/entity";

/**
* 竞拍方法类
*/
export class AuctionService
{
    //竞拍列表
    static auctionList: Auction[];
    static auctionViewList: AuctionView[];
    static auctionStore = new store.auction();

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
            let view = new AuctionView(auction);
            this.auctionViewList.push(view);
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
            let list: Auction[] = this.auctionStore.getSotre();
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
                this.auctionStore.setSotre(auctionList, address);
                //获得处理后的缓存数据
                auctionList = this.auctionStore.getSotre() as Auction[];
                console.log(auctionList);
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
        let auctionList = this.auctionStore.getSotre();
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
            this.auctionStore.setSotre(list, address);
            this.auctionList = this.auctionStore.getSotre();
        }
    }

    /**
     * 根据竞拍id获得竞拍详情
     * @param id 竞拍id
     */
    static getAuctionInfoById(id: string)
    {
        let auction = this.auctionStore.queryStore(id);
        let view = new AuctionInfoView(auction);
        return view;
    }

    /**
     * 开标方法类
     * @param domain 
     * @param amount 
     */
    static async auctionRaise(domain: string, amount: number)
    {
        try
        {
            //加价
            let result = await tools.nnssell.raise(domain, amount);
            if (!result.err)
            {
                let txid = result.info;
                let auction = new Auction()
                auction.auctionId = txid;
                //根据标地id查询域名状态
                let res = await tools.wwwtool.getauctioninfobyaucitonid(LoginInfo.getCurrentAddress(), [ txid ]);
                if (res)
                {
                    let auctionstate = res[ 0 ].list[ 0 ] as Auction;
                }
            }
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
        let sessionlist = this.auctionStore.getSotre();
        sessionlist.push(auction);
        this.auctionStore.setSotre(sessionlist, address)
    }
}