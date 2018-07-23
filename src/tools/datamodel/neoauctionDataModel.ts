import { MyAuction, LoginInfo } from "../entity";
import { tools } from "../importpack";

export class NeoaucionData
{
    static session_open = new tools.sessionstoretool("auction-openSession");

    static async getBidList(address: string)
    {
        //获得加价列表
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        let arr = new Array<MyAuction>();
        //获得session列表
        let obj = this.session_open.getList();
        let list = res ? res[ 0 ][ "list" ] as Array<MyAuction> : [];
        if (res)
        {
            for (let i in list)
            {
                const element = list[ i ];
                //获得当前账户该域名下的余额
                let balanceOfSelling = await tools.nnssell.getBalanceOfSeling(Neo.Uint256.parse(element.id.replace('0x', '')));
                element.receivedState = 0;
                //根据余额和所有者判断当前账户是否领取过了域名或退币
                if (element.auctionState == '0')
                {
                    let current = LoginInfo.getCurrentAddress();
                    if (element.maxBuyer == current)
                    {
                        element.receivedState = element.owner == current ? 1 : 0
                    } else
                    {
                        element.receivedState = balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 ? 2 : 0;
                    }
                }
                //开始时间日期格式化
                element.startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(element.startAuctionTime * 1000));
                if (obj && obj[ element.domain ])   //判断域名在开标缓存中是否存在
                {
                    this.session_open.delete(element.domain);    //如果存在就删除该域名的缓存
                }
            }
        }
        obj = this.session_open.getList();
        for (const key in obj)
        {
            if (obj.hasOwnProperty(key))
            {
                const element = obj[ key ] as MyAuction;
                element.endedState = 0;
                element.auctionState = '3';
                element.maxBuyer = null;
                element.maxPrice = '0';
                let info = await tools.nnssell.getSellingStateByDomain(element.domain);
                if (info.startBlockSelling.compareTo(Neo.BigInteger.Zero) > 0)
                {
                    if (info.maxPrice.compareTo(Neo.BigInteger.Zero) > 0)
                    {
                        element.maxBuyer = ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
                        element.maxPrice = accDiv(parseInt(info.maxPrice.toString()), 100000000).toString();
                    }
                    element.auctionState = '1';
                }
                let bidSession = new tools.sessionstoretool("bidInfo-" + element.domain);
                let bidlist = bidSession.getList();
                if (bidlist)
                {
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
        let session_bid = new tools.sessionstoretool("bidSession");
        session_bid.put(auction.domain, { txid, amount }, txid);
        let domaininfo = this.session_open.select(auction.domain);
        if (!domaininfo)
        {
            this.session_open.put(auction.domain, auction);
        }
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