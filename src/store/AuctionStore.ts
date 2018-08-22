import { StoreInterface } from "./Store";
import { Auction } from "entity/AuctionEntitys";
import { sessionStoreTool } from "../tools/storagetool";

export class AuctionStore implements StoreInterface
{
    tablename: string = "AUCTION_LIST";
    session: sessionStoreTool = new sessionStoreTool(this.tablename);
    setSotre(data: Auction[]): void
    {
        let list = this.session.getList();
        list = list ? list : {};
        for (let index = 0; index < data.length; index++)
        {
            const auction = data[ index ];
            list[ auction.fulldomain ] = auction;
        }
        this.session.setList(list);
    }
    getSotre(): Auction[]
    {
        let list = this.session.getList();
        let auctions: Auction[] = [];
        for (const key in list)
        {
            if (list.hasOwnProperty(key))
            {
                const auction = list[ key ];
                auctions.push(auction);
            }
        }
        return auctions;
    }
    queryStore(id: string)
    {
        return this.session.select(id);
    }


}