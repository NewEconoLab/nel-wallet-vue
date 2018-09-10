import { StoreInterface } from "./Store";
import { Auction, AuctionState } from "../entity/AuctionEntitys";
import { sessionStoreTool } from "../tools/storagetool";

export class AuctionStore implements StoreInterface
{
    tablename: string;
    session: sessionStoreTool;

    constructor(table: string)
    {
        this.tablename = table;
        this.session = new sessionStoreTool(table);
    }

    /**
     * 更新缓存队列
     * @param data 
     * @param address 
     */
    setSotre(data: Auction[], address: string): void
    {
        let list = this.session.getList();
        list = list ? list : {};
        for (let index = 0; index < data.length; index++)
        {
            const auction = data[ index ];
            if (auction.auctionState != AuctionState.pass)
            {
                if (auction.addwholist)
                {
                    for (let i = 0; i < auction.addwholist.length; i++)
                    {
                        let who = auction.addwholist[ i ];
                        if (who.address == address)
                        {
                            auction.addWho = who;
                        }
                    }
                }
                list[ auction.auctionId ] = auction;
            }
            else
            {
                delete list[ auction.auctionId ];
            }
        }
        this.session.setList(list);
    }

    /**
     * 
     * 从缓存中获得域名列表
     */
    getSotre(): Auction[]
    {
        let list = this.session.getList();
        let auctions: Auction[] = [];
        for (const key in list)
        {
            if (list.hasOwnProperty(key))
            {
                const auction = list[ key ];
                // if (auction[ "auctionState" ] != AuctionState.watting)
                auctions.push(auction);
            }
        }
        return auctions;
    }

    /**
     * 往域名列表中塞值
     * @param auction 域名信息
     */
    push(auction: Auction)
    {
        let list = this.session.getList();
        list[ auction.auctionId ] = auction;
        this.session.setList(list);
    }

    /**
     * 查询对应id 的竞标信息
     * @param id 
     */
    queryStore(id: string)
    {
        return this.session.select(id) as Auction;
    }


}