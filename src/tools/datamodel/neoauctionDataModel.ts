import { MyAuction, LoginInfo } from "../entity";
import { tools } from "../importpack";

export class NeoaucionData
{
    static session = new tools.localstoretool("auction-openSession");
    static async getBidList(address: string)
    {
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        let arr = new Array<MyAuction>();
        let obj = this.session.getList();
        let list = res[ 0 ][ "list" ] as Array<MyAuction>;
        if (res)
        {
            for (let i in list)
            {
                const element = list[ i ];
                element.auctionState = tools.nnssell.compareTime(list[ i ].startAuctionTime * 1000);
                element.startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(list[ i ].startAuctionTime * 1000));
                if (element.auctionState == 0)
                {
                    element[ "endedState" ] = element.maxBuyer == address ? 1 : 2;
                }
                if (obj && obj[ element.domain ])
                {
                    this.session.delete(element.domain);
                }
            }
        }
        for (const key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                const element = obj[ key ] as MyAuction;
                let domain = element[ "domain" ];
                element.endedState = 0;
                element.auctionState = 2;
                element.maxBuyer = null;
                element.maxPrice = '0';
                // let state = await tools.nnssell.getSellingStateByDomain(domain);
                // if (state.startBlockSelling.toInt32())
                // {
                //     let time = await tools.wwwtool.api_getBlockInfo(state.startBlockSelling.toInt32());
                //     element.startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time * 1000));
                //     element.maxBuyer = state.maxBuyer ? ThinNeo.Helper.GetAddressFromScriptHash(state.maxBuyer) : null;
                //     element.maxPrice = state.maxPrice.toString();
                //     element.owner = state.owner ? state.owner.toString() : null;
                //     let startTime = await tools.wwwtool.api_getBlockInfo(state.startBlockSelling.toInt32());
                // element.auctionState = tools.nnssell.compareTime(startTime * 1000);

                //     element.auctionState = tools.nnssell.compareTime(element.startAuctionTime * 1000);
                //     if (element.auctionState == 0)
                //     {
                //         element[ "endedState" ] = element.maxBuyer == address ? 1 : 2;
                //     }
                // }
                arr.push(element)
            }
        }

        arr = arr.concat(list);

        return arr
    }

    static async setOpenSession(auction: MyAuction)
    {
        this.session.put(auction.domain, auction);
    }
}