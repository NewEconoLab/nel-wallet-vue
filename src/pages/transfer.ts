import { WWW } from '../tools/wwwtool';
import { CoinTool } from '../tools/cointool';
import { neotools } from '../tools/neotools';
import { LoginInfo, BalanceInfo, Result, NeoAsset, Transactionforaddr, Transaction, History } from './../tools/entity';
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
                        mui.toast("Your transaction has been sent, please check it later");
                } else
                {
                    let res: Result = await CoinTool.rawTransaction(this.toaddress, this.asset, this.amount);
                    mui.toast(res.info);
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
                let txid = tx[ "txid" ];
                let vins = tx[ "vin" ];
                let type = tx[ "type" ];
                let vouts = tx[ "vout" ];
                let value = tx[ "value" ];
                let txtype = tx[ "txType" ];
                let assetType = tx[ "assetType" ]
                let blockindex = tx[ "blockindex" ];
                let time: number = tx[ "blocktime" ].includes("$date") ? JSON.parse(tx[ "blocktime" ])[ "$date" ] : parseInt(tx[ "blocktime" ] + "000");
                let date: string = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time));

                if (txtype == "InvocationTransaction")
                    continue;
                if (type == "out")
                {
                    if (vins && vins.length == 1)
                    {
                        const vin = vins[ 0 ];
                        let address = vin[ "address" ];
                        let asset = vin[ "asset" ];
                        let amount = vin[ "value" ];
                        let assetname = "";
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
                    for (const index in vouts)
                    {
                        let i = parseInt(index);
                        const out = vouts[ i ];
                        let address = out[ "address" ];
                        let amount = out[ "value" ];
                        let asset = out[ "asset" ];
                        let assetname = "";
                        if (assetType == "utxo")
                            assetname = CoinTool.assetID2name[ asset ];
                        else
                        {
                            let nep5 = await WWW.getNep5Asset(asset);
                            assetname = nep5[ "name" ];
                        }
                        let n = out[ "n" ];
                        // if (address != currentAddress)
                        // {
                        if (arr[ address ] && arr[ address ][ assetname ])
                        {
                            arr[ address ][ assetname ] += amount;
                        } else
                        {
                            var assets = {}
                            assets[ assetname ] = amount;
                            arr[ address ] = assets;
                        }
                        // }
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