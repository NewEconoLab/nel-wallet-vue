import { tools } from "./importpack";
import { Domainmsg, DomainInfo, SellDomainInfo, NNSResult, ResultItem, DataType, LoginInfo, OldUTXO, Consts, DomainState, MyAuction, RootDomainInfo } from "./entity";
import { Auction, AuctionState, AuctionAddress } from "../entity/AuctionEntitys";
export default class NNSSell
{
    constructor() { }

    /**
     * 获得竞拍域名详情
     * @param domain 域名
     */
    static async getSellingStateByDomain(domain: string, root: RootDomainInfo)
    {
        var nnshash: Neo.Uint256 = tools.nnstool.nameHashSub(root.roothash, domain);
        let data = tools.contract.buildScript(root.register, "getAuctionStateByFullhash", [ "(hex256)" + nnshash.toString() ]);
        let result = await tools.wwwtool.rpc_getInvokescript(data);
        let domainInfo: DomainInfo = await tools.nnstool.getOwnerInfo(nnshash, Consts.baseContract);
        let info = new SellDomainInfo();
        info.copyDomainInfoToThis(domainInfo);
        info.domain = domain;
        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("FAULT, BREAK"))
            {
                throw "FAULT, BREAK";
            }
            let rest = new NNSResult();
            rest.textInfo = result;
            var stackarr = result[ "stack" ] as any[];
            let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[ 0 ].subItem
            info.id = stack[ 0 ].AsHash256();
            info.startBlockSelling = stack[ 4 ].AsInteger();
            info.endBlock = stack[ 5 ].AsInteger();
            info.maxPrice = stack[ 6 ].AsInteger();
            info.maxBuyer = stack[ 7 ].AsHash160();
            info.lastBlock = stack[ 8 ].AsInteger();
            if (!!info.id)
            {   //竞拍id不为空则查询域名下的余额
                info.balanceOfSelling = await this.getBalanceOfBid(info.id, root.register);
            }

            return info;
        }
        catch (e)
        {
            console.error(e);

        }
    }

    /**
     * 获得
     * @param id 竞拍id
     */
    static async getBalanceOfBid(id: Neo.Uint256, register: Neo.Uint160)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);

        let res = await tools.contract.contractInvokeScript(
            register,
            "balanceOfBid",
            "(hex160)" + who.toString(),
            "(hex256)" + id.toString()
        );
        var stackarr = res[ "stack" ] as any[];
        let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[ 0 ];
        let balance = stack.AsInteger();
        return balance;
    }

    /**
     * 获得
     * @param id 竞拍id
     */
    static async getBalanceOfBidArray(ids: string[], register: Neo.Uint160)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        var sb = new ThinNeo.ScriptBuilder();
        for (const index in ids)
        {
            if (ids.hasOwnProperty(index))
            {
                const id = ids[ index ];
                sb.EmitParamJson([
                    "(hex160)" + who.toString(),
                    "(hex256)" + id
                ]);//第二个参数是个数组
                sb.EmitPushString("balanceOfBid");
                sb.EmitAppCall(register);
            }
        }
        let res = await tools.wwwtool.rpc_getInvokescript(sb.ToArray());
        var stackarr = res[ "stack" ] as any[];
        let stack = ResultItem.FromJson(DataType.Array, stackarr);
        let obj = {};
        for (let i = 0; i < ids.length; i++)
        {
            const id = ids[ i ];
            obj[ id ] = stack.subItem[ i ].AsInteger();
        }
        return obj;

        // let balance = stack.AsInteger();
        // return balance;
    }

    static async gasToRecharge(transcount: number, register: Neo.Uint160)
    {
        let script = tools.contract.buildScript(tools.coinTool.id_SGAS, "mintTokens", []);
        //获得sgas的合约地址
        var sgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
        try
        {
            let data1 = await tools.contract.buildInvokeTransData(script, sgasaddr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
            let data2 = await tools.nnssell.rechargeReg(transcount.toFixed(8), register);
            let res = await tools.wwwtool.rechargeandtransfer(data1.data, data2);
            if (res[ 'errCode' ] == '0000')
            {
                var height = await tools.wwwtool.api_getHeight();
                let txid = res[ 'txid' ];
                let olds = data1.tranmsg.info[ 'oldarr' ] as OldUTXO[];
                olds.map(old => old.height = height);
                OldUTXO.oldutxosPush(olds);
                return txid;
            } else
            {
                return undefined;
            }
        } catch (error)
        {
            throw error;
        }
    }

    /**
     * 注册器充值
     * @param amount 充值金额
     */
    static async rechargeReg(amount: string, register: Neo.Uint160)
    {
        let addressto = ThinNeo.Helper.GetAddressFromScriptHash(register);
        let address = LoginInfo.getCurrentAddress();

        let sb = new ThinNeo.ScriptBuilder()
        //生成随机数
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson([
            "(addr)" + address,//from
            "(addr)" + addressto,//to
            "(int)" + amount.replace(".", "")//value
        ]);//参数倒序入
        sb.EmitPushString("transfer");//参数倒序入
        sb.EmitAppCall(tools.coinTool.id_SGAS);//nep5脚本

        ////这个方法是为了在同一笔交易中转账并充值
        ////当然你也可以分为两笔交易
        ////插入下述两条语句，能得到txid
        sb.EmitSysCall("System.ExecutionEngine.GetScriptContainer");
        sb.EmitSysCall("Neo.Transaction.GetHash");
        //把TXID包进Array里
        sb.EmitPushNumber(Neo.BigInteger.fromString("1"));
        sb.Emit(ThinNeo.OpCode.PACK);
        sb.EmitPushString("setmoneyin");
        sb.EmitAppCall(register);
        let script = sb.ToArray();
        let res = await tools.contract.buildInvokeTransData_attributes(script);
        // console.log(res);
        return res;
    }

    /**
     * 域名开标
     */
    static async startAuciton(subname: string, root: RootDomainInfo)
    {
        try
        {
            let addr = LoginInfo.getCurrentAddress();
            let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
            let param = [
                '(hex160)' + who.toString(),
                "(hex256)" + root.roothash.toString(),
                "(str)" + subname
            ];

            let data = tools.contract.buildScript_random(root.register, "startAuction", param);
            let res = await tools.contract.contractInvokeTrans_attributes(data);
            return res
        } catch (error)
        {
            throw error;
        }

    }

    /**
     * 竞标加价
     * @param domain 域名
     */
    static async raise(id: string, amount: number, register: Neo.Uint160)
    {
        let who = new Neo.Uint160(
            ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress
                (
                LoginInfo.getCurrentAddress()
                ).buffer
        );
        let count = Neo.Fixed8.parse(amount.toString()).getData().toNumber()
        let data = tools.contract.buildScript_random(
            register,
            "raise",
            [ "(hex160)" + who.toString(), "(hex256)" + id, "(int)" + count ]
        );
        let res = await tools.contract.contractInvokeTrans_attributes(data);
        return res;
    }

    /**
     * 
     * @param info 域名状态信息
     */
    static async getAuctionByStateInfo(info: SellDomainInfo, day?: number): Promise<Auction>
    {
        day = day ? day : 24 * 60 * 60; //如果没有传值，默认一天是24小时
        let auction = new Auction();
        auction.auctionId = info.id.toString();
        auction.fulldomain = info.domain;
        auction.maxBuyer = !info.maxBuyer ? "" : ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
        auction.maxPrice = !info.maxPrice ? 0 : accDiv(info.maxPrice.toString(), 100000000);
        auction.addWho = new AuctionAddress(LoginInfo.getCurrentAddress(), accDiv(info.balanceOfSelling.toString(), 100000000));
        let startTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.startBlockSelling.toString()));
        //根据开标的区块高度获得开标的时间
        let currentTime = tools.timetool.currentTime();
        let dtime = currentTime - startTime; //时间差值;
        //如果超过到期时间
        if (dtime > 365 * day)
            auction.auctionState = AuctionState.expire;
        else if (dtime > 3 * day)
        {

            //获得最后一次出价时间和开始时间的时间戳
            let lastTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.lastBlock.toString()));
            let dlast = lastTime - startTime;

            //最大金额为0，无人加价，流拍数据，或者域名到期，都可以重新开标
            if (info.maxPrice.compareTo(Neo.BigInteger.Zero) == 0)  
            {
                auction.auctionState = AuctionState.pass;
            }
            //先判断最后出价时间是否在第三天之前
            else if (dlast < 2 * day)
            {
                auction.auctionState = AuctionState.end;
            }
            //判断是否已有结束竞拍的区块高度。如果结束区块大于零则状态为结束
            else if (info.endBlock.compareTo(Neo.BigInteger.Zero) > 0)
            {
                auction.auctionState = AuctionState.end;
            }
            //如果不超过五天则是随机器
            else if (dtime < 5 * day)
            {
                auction.auctionState = AuctionState.random;
            }
            //超过五天则是结束 
            else
            {
                auction.auctionState = AuctionState.end;
            }
        }
        else
        {
            auction.auctionState = AuctionState.fixed;
        }
        return auction;
    }

    /**
     * 结束竞拍
     * @param domain 域名
     */
    static async bidSettlement(id: string, register: Neo.Uint160)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let script = tools.contract.buildScript_random(
            register,
            "bidSettlement",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + id
            ]
        );
        let res = await tools.contract.buildInvokeTransData_attributes(script);
        return res;
    }

    /**
     * 获得领取域名
     * @param domain 域名
     */
    static async collectDomain(id: string, register: Neo.Uint160)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let script = tools.contract.buildScript_random(
            register,
            "collectDomain",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + id
            ]
        );
        let res = await tools.contract.buildInvokeTransData_attributes(script);
        return res;
    }

    static async getBalanceOf(addr: string, register: Neo.Uint160)
    {
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let info = await tools.contract.contractInvokeScript(
            register, "balanceOf", "(hex160)" + who.toString()
        );

        var stackarr = info[ "stack" ] as any[];
        let stack = ResultItem.FromJson(DataType.Array, stackarr);
        let num = stack.subItem[ 0 ].AsInteger();
        let res = accDiv(num.toString(), 100000000);
        return res.toString();
    }

    /**
     * 取回存储器下的sgas
     */
    static async getMoneyBack(amount: number, register: Neo.Uint160)
    {
        let addr = LoginInfo.getCurrentAddress()
        let transcount = amount.toFixed(8).replace(".", "");
        let data = tools.contract.buildScript_random(
            register,
            "getmoneyback",
            [ "(addr)" + addr, "(int)" + transcount ]
        )
        let res = await tools.contract.contractInvokeTrans_attributes(data)
        return res;
    }

    static async renewDomain(domain: string, register: Neo.Uint160)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let domainarr = domain.split(".").reverse();
        let str = domainarr[ 1 ];
        let roothash = tools.nnstool.nameHash(domainarr[ 0 ]);
        let data = tools.contract.buildScript_random(
            register,
            "renewDomain", [
                "(hex160)" + who.toString(),
                "(hex256)" + roothash.toString(),
                "(str)" + str
            ]);
        try
        {
            let res = await tools.contract.contractInvokeTrans_attributes(data);
            return res;
        } catch (error)
        {

        }

    }

}