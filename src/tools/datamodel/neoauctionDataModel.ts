import { MyAuction, LoginInfo } from "../entity";
import { tools } from "../importpack";

export class NeoaucionData
{
    static session_open = new tools.sessionstoretool("auction-openSession");

    static async getBidList(address: string)
    {
        //获得加价列表
        try
        {
            let res = await tools.wwwtool.api_getBidListByAddress(address);
            let arr = new Array<MyAuction>();
            //获得session列表
            let obj = this.session_open.getList();
            let list = res ? res[ 0 ][ "list" ] as Array<MyAuction> : [];
            let ids = list.map(auction =>
            {
                return auction.id;
            });
            let amounts = await tools.nnssell.getBalanceOfBidArray(ids);

            if (res)
            {
                for (let i in list)
                {
                    const element = list[ i ];
                    element.receivedState = 0;
                    //根据余额和所有者判断当前账户是否领取过了域名或退币
                    if (element.auctionState == '0')
                    {
                        let current = LoginInfo.getCurrentAddress();
                        //获得当前账户该域名下的余额
                        let balanceOfSelling = amounts[ element.id ];
                        if (element.maxBuyer == current)
                        {
                            //  判断所有者是不是自己并且余额为0
                            element.receivedState = (balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 && element.owner == current) ? 1 : 0;
                        } else
                        {
                            element.receivedState = balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 ? 2 : 0;
                        }
                    }
                    //开始时间日期格式化
                    element.startTimeStr = tools.timetool.getTime(element.startAuctionTime);
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
                        // element.auctionState = '1';
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
        } catch (error)
        {
            console.error(error);

        }
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

    /**搜索参与竞拍的域名列表 */
    static async searchBidList(address: string, searchDomain: string)
    {
        //获得加价列表
        try
        {
            let res = await tools.wwwtool.searchdomainbyaddress(address, searchDomain);
            let arr = new Array<MyAuction>();
            //获得session列表
            // let obj = this.session_open.getList();
            let list = res ? res[ "list" ] as Array<MyAuction> : [];
            let ids = list.map(auction =>
            {
                return auction.id;
            });
            let amounts = await tools.nnssell.getBalanceOfBidArray(ids);

            if (res)
            {
                for (let i in list)
                {
                    const element = list[ i ];
                    element.receivedState = 0;
                    //根据余额和所有者判断当前账户是否领取过了域名或退币
                    if (element.auctionState == '0')
                    {
                        let current = LoginInfo.getCurrentAddress();
                        //获得当前账户该域名下的余额
                        let balanceOfSelling = amounts[ element.id ];
                        if (element.maxBuyer == current)
                        {
                            //  判断所有者是不是自己并且余额为0
                            element.receivedState = (balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 && element.owner == current) ? 1 : 0;
                        } else
                        {
                            element.receivedState = balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 ? 2 : 0;
                        }
                    }
                    //开始时间日期格式化
                    element.startTimeStr = tools.timetool.getTime(element.startAuctionTime);
                }
            }

            arr = arr.concat(list);

            return arr
        } catch (error)
        {
            console.error(error);

        }
    }
}