import { Auction, AuctionState, AuctionView, AuctionInfoView } from "../entity/AuctionEntitys";
import { tools } from "../tools/importpack";
import { store } from "../store/index";

/**
* 竞拍方法类
*/
export class AuctionService
{
    //竞拍列表
    static auctionList: Auction[];
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
        let viewlist: AuctionView[] = [];
        let auctions = await this.getAuctionList(address, currentPage, pageSize);
        for (let index = 0; index < auctions.length; index++)
        {
            const auction = auctions[ index ];
            let view = new AuctionView(auction);
            viewlist.push(view);
        }
        return viewlist;
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
            //从列表种拉取数据
            let result = await tools.wwwtool.getauctioninfobyaddress(address, currentPage, pageSize);
            if (result)
            {
                this.auctionList = result[ 0 ].list as Auction[];
                //对比信息并保存至缓存
                this.auctionStore.setSotre(this.auctionList);
                //获得处理后的缓存数据
                this.auctionList = this.auctionStore.getSotre() as Auction[];
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
        let ids: string[] = [];
        //获得所有需要更新的域名竞拍id
        for (let index = 0; index < this.auctionList.length; index++)
        {
            const auction = this.auctionList[ index ];
            if (auction.auctionState != AuctionState.end)
            {
                let addrWho = auction.addwholist[ 0 ];
                if (auction.maxBuyer == addrWho.address)    //未领取的域名需要更新
                {
                    if (!addrWho.getdomainTime)
                        ids.push(auction.auctionId);
                } else                                      //未退币的域名需要更新
                {
                    if (!addrWho.accountTime)
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
            this.auctionStore.setSotre(list);
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
}