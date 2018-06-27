import { MyAuction, LoginInfo } from "../entity";
import { tools } from "../importpack";

export class NeoaucionData
{
    static session_open = new tools.localstoretool("auction-openSession");

    static async getBidList(address: string)
    {
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        let arr = new Array<MyAuction>();
        let obj = this.session_open.getList();
        let list = res ? res[ 0 ][ "list" ] as Array<MyAuction> : [];
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
                if (obj && obj[ element.domain ])   //判断域名在开标缓存中是否存在
                {
                    this.session_open.delete(element.domain);    //如果存在就删除该域名的缓存
                }
                let bidlist = tools.localstoretool.getTable("bidInfo-" + element.domain)
                if (bidlist && Object.keys(bidlist).length > 0)
                {
                    let bidSession = new tools.localstoretool("bidInfo-" + element.domain);
                    for (const key in bidlist)
                    {
                        if (bidlist.hasOwnProperty(key))
                        {
                            const element = bidlist[ key ];
                            let res = await tools.wwwtool.getrawtransaction(key);
                            if (res)
                            {
                                bidSession.delete(key);
                            }
                        }
                    }
                    element.bidListSession = bidlist;
                }
            }
        }
        for (const key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                const element = obj[ key ] as MyAuction;
                element.endedState = 0;
                element.auctionState = 2;
                element.maxBuyer = null;
                element.maxPrice = '0';
                let bidlist = tools.localstoretool.getTable("bidInfo-" + element.domain)
                if (bidlist)
                {
                    let bidSession = new tools.localstoretool("bidInfo-" + element.domain);
                    for (const key in bidlist)
                    {
                        if (bidlist.hasOwnProperty(key))
                        {
                            const element = bidlist[ key ];
                            let res = await tools.wwwtool.getrawtransaction(key);
                            if (res)
                            {
                                bidSession.delete(key);
                            }
                        }
                    }
                    element.bidListSession = bidlist;
                }
                arr.push(element)
            }
        }

        arr = arr.concat(list);

        return arr
    }

    static async setOpenSession(auction: MyAuction)
    {
        this.session_open.put(auction.domain, auction);
    }

    static async setBidSession(auction: MyAuction, amount: string, txid: string)
    {
        let session_bid = new tools.localstoretool("bidInfo-" + auction.domain);
        this.session_open.put(auction.domain, auction);
        session_bid.put(txid, amount);
    }

    static async getAssetBalance()
    {
        let sgas = tools.coinTool.id_SGAS.toString();
        let gas = tools.coinTool.id_GAS;
        let obj = {}
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(sgas, LoginInfo.getCurrentAddress());
        let res = await tools.wwwtool.api_getBalance(LoginInfo.getCurrentAddress());
        let balances = res as Array<any>;
        let balance;
        balances.map((item, index, array) =>
        {
            if (item.asset == gas)
            {
                balance = item.balance;
                return;
            }
        })
        obj[ gas ] = balance;
        obj[ sgas ] = nep5[ "nep5balance" ];
        return obj;
        // obj[gas] = await tools.wwwtool.api_getBalance()
        // tools.coinTool.initAllAsset()
    }

}