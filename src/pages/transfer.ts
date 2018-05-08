import { WWW } from '../tools/wwwtool';
import { CoinTool } from '../tools/cointool';
import { neotools } from '../tools/neotools';
import { LoginInfo, BalanceInfo, Result, NeoAsset, Transactionforaddr, Transaction, History, Nep5Balance } from '../tools/entity';
import { StorageTool } from '../tools/storagetool';
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"
import Vue from "vue";
import Component from "vue-class-component";
import { DateTool } from '../tools/timetool';
import { NNSTool } from '../tools/nnstool';

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout
    }
})
export default class transfer extends Vue 
{
    target: string;
    isDomain: boolean;
    toaddress: string;
    amount: string;
    asset: string;
    balances: BalanceInfo[] = [];
    balance: BalanceInfo = new BalanceInfo();
    addrerr: string = "";
    amounterr: string = "";
    txs: History[] = [];
    nextpage: boolean = true;
    txpage: number;
    cutshow: boolean = true;
    constructor() 
    {
        super();
        this.target = "";
        this.isDomain = false;
        this.toaddress = "";
        this.amount = "";
        this.asset = "";
        this.txpage = 1;
    }
    mounted() 
    {
        var str = StorageTool.getStorage("balances_asset");
        if (str == null)
            this.balances = new Array<BalanceInfo>();
        else
        {
            this.balances = JSON.parse(str) as BalanceInfo[];
            var choose = StorageTool.getStorage("transfer_choose");
            this.asset = (choose == null ? this.balances[ 0 ].asset : choose);
            var n: number = this.balances.findIndex(b => b.asset == this.asset);
            n = n < 0 ? 0 : n;
            this.balance = this.balances[ n ];
            this.history();
        }
    }

    cutPage(btn: string)
    {
        btn == "next" ? this.txpage++ : (this.txpage <= 1 ? this.txpage = 1 : this.txpage--);
        this.history();
    }
    choose(assetid: string)
    {
        this.asset = assetid
        StorageTool.setStorage("transfer_choose", assetid);
        var n: number = this.balances.findIndex(b => b.asset == this.asset);
        this.balance = this.balances[ n ];
        this.verify_Amount();
    }

    async updateBalances()
    {
        let currcountAddr = LoginInfo.getCurrentAddress();
        var balances = await WWW.api_getBalance(currcountAddr) as BalanceInfo[];
        var nep5balances = await WWW.api_getnep5Balance(currcountAddr) as Nep5Balance[];
        let height = await WWW.api_getHeight();
        this.balances = BalanceInfo.getBalancesByArr(balances, nep5balances, height);
        StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
    }

    async verify_addr()
    {
        let isDomain = NNSTool.verifyDomain(this.target);
        let isAddress = NNSTool.verifyAddr(this.target);
        if (isDomain)
        {
            let addr = await NNSTool.resolveData(this.target);
            if (addr)
            {
                this.toaddress = addr;
                this.isDomain = true;
                this.addrerr = 'false'; return true;
            }
            else
            {
                this.addrerr = 'true'; return false;
            }
        }
        else if (isAddress)
        {
            if (neotools.verifyPublicKey(this.target))
            {
                this.toaddress = this.target;
                this.addrerr = 'false'; return true;
            }
        }
        else { this.addrerr = 'true'; return false; }
    }
    verify_Amount()
    {
        let balancenum = Neo.Fixed8.parse(this.balance.balance + '');
        let inputamount = Neo.Fixed8.parse(this.amount);
        let compare = balancenum.compareTo(inputamount);
        compare >= 1 ? this.amount = this.amount : this.amount = balancenum.toString();
        return true;
    }
    async send()
    {
        try
        {
            if (this.verify_addr() && this.verify_Amount())
            {
                if (!!this.balance[ "type" ] && this.balance.type == "nep5")
                {
                    let res = await CoinTool.nep5Transaction(LoginInfo.getCurrentAddress(), this.toaddress, this.asset, this.amount);
                    if (!res[ "err" ])
                    {
                        mui.toast("Your transaction has been sent, please check it later");
                        let his: History = new History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his[ "waiting" ] = true;
                        his.time = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [ his ].concat(this.txs);
                        let num = parseFloat(this.balance.balance + "");
                        let bear = num - parseFloat(this.amount);
                        this.balance.balance = bear;
                        var height = await WWW.api_getHeight();
                        BalanceInfo.setBalanceSotre(this.balance, height);
                        History.setHistoryStore(his, height);
                    }
                } else
                {
                    let res: Result = await CoinTool.rawTransaction(this.toaddress, this.asset, this.amount);
                    mui.toast(res.info);
                    let his: History = new History();
                    his.address = this.toaddress;
                    his.asset = this.asset;
                    his.value = this.amount;
                    his.txtype = "in";
                    his[ "waiting" ] = true;
                    his.time = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
                    his.assetname = this.balance.names;
                    his.txid = res.info;
                    this.txs = [ his ].concat(this.txs);
                    let num = parseFloat(this.balance.balance + "");
                    let bear = num - parseFloat(this.amount);
                    console.log(bear);
                    this.balance.balance = bear;
                    var height = await WWW.api_getHeight();
                    BalanceInfo.setBalanceSotre(this.balance, height);
                    History.setHistoryStore(his, height);
                }
            }
        } catch (error)
        {
            mui.alert("-_-!!!You don't have enough change, you have to wait for the block height to change before you can make the next transaction ");
        }
    }
    async history()
    {
        await CoinTool.initAllAsset();
        var currentAddress = LoginInfo.getCurrentAddress();
        var res = await WWW.gettransbyaddress(currentAddress, 5, this.txpage);
        res = res ? res : []; //将空值转为长度0的数组
        this.txpage == 1 && res.length > 5 ? this.cutshow = false : this.cutshow = true;
        if (res.length > 0)
        {

            this.txs = [];
            for (let index = 0; index < res.length; index++)
            {
                const tx = res[ index ];
                let txid = tx[ "txid" ] as string;
                txid = txid.replace('0x', '');
                let vins = tx[ "vin" ];
                let type = tx[ "type" ];
                let vouts = tx[ "vout" ];
                let value = tx[ "value" ];
                let txtype = tx[ "txType" ];
                let assetType = tx[ "assetType" ]
                let blockindex = tx[ "blockindex" ];
                let time: number = tx[ "blocktime" ].includes("$date") ? JSON.parse(tx[ "blocktime" ])[ "$date" ] : parseInt(tx[ "blocktime" ] + "000");
                let date: string = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time));

                if (type == "out")
                {
                    if (vins && vins.length == 1)
                    {
                        let assetname = "";
                        const vin = vins[ 0 ];
                        let asset = vin[ "asset" ];
                        let amount = value[ asset ];
                        let address = vin[ "address" ];
                        if (assetType == "utxo")
                        {
                            assetname = CoinTool.assetID2name[ asset ];
                        }
                        else
                        {
                            let nep5 = await WWW.getNep5Asset(asset);
                            assetname = nep5[ "name" ];
                        }
                        var history = new History();
                        history.time = date;
                        history.txid = txid;
                        history.assetname = assetname;
                        history.address = address;
                        history.value = amount;
                        history.txtype = type;
                        this.txs.push(history);
                    }
                }
                else
                {
                    var arr = {}
                    let currcount = 0;
                    for (const index in vouts)
                    {
                        let i = parseInt(index);
                        const out = vouts[ i ];
                        let address = out[ "address" ];
                        let amount = out[ "value" ];
                        let asset = out[ "asset" ];
                        let assetname = "";

                        if (address != currentAddress)
                        {
                            if (assetType == "utxo")
                                assetname = CoinTool.assetID2name[ asset ];
                            else
                            {
                                let nep5 = await WWW.getNep5Asset(asset);
                                assetname = nep5[ "name" ];
                            }
                            let n = out[ "n" ];
                            if (arr[ address ] && arr[ address ][ assetname ])
                            {
                                arr[ address ][ assetname ] += amount;
                            } else
                            {
                                var assets = {}
                                assets[ assetname ] = amount;
                                arr[ address ] = assets;
                            }
                        } else { currcount++ }
                    }
                    if (currcount == vouts.length)
                    {
                        for (const asset in value)
                        {
                            if (value.hasOwnProperty(asset))
                            {
                                const amount = value[ asset ];

                                let assetname = "";
                                if (assetType == "utxo")
                                    assetname = CoinTool.assetID2name[ asset ];
                                else
                                {
                                    let nep5 = await WWW.getNep5Asset(asset);
                                    assetname = nep5[ "name" ];
                                }

                                var assets = {}
                                assets[ assetname ] = amount;
                                arr[ currentAddress ] = assets;
                            }
                        }
                    }
                    for (const address in arr)
                    {
                        if (arr.hasOwnProperty(address))
                        {
                            const data = arr[ address ];
                            for (const asset in data)
                            {
                                if (data.hasOwnProperty(asset))
                                {
                                    const amount = data[ asset ];
                                    var history = new History();
                                    history.time = date;
                                    history.txid = txid;
                                    history.assetname = asset;
                                    history.address = address;
                                    history.value = amount;
                                    history.txtype = type;
                                    this.txs.push(history);
                                }
                            }
                        }
                    }
                }
            }
        }
        //分页判断
        res.length < 5 ? this.nextpage = false : this.nextpage = true;    //判断是否是最后一页
        this.txpage > 1 && res == 0 ? this.txpage-- : this.txpage;   //判断是否到最后一页

    }
}