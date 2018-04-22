import { CoinTool } from './../tools/cointool';
import { LoginInfo, BalanceInfo, Result, NeoAsset, Nep5Balance } from './../tools/entity';
import { StorageTool } from './../tools/storagetool';
import Vue from "vue";
import { Component } from "vue-property-decorator";
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"
import { WWW } from '../tools/wwwtool';

declare const mui;

@Component({
  components: {
    "wallet-layout": WalletLayout
  }
})
export default class balance extends Vue 
{
  // Data property
  neoasset: NeoAsset;
  balances: Array<BalanceInfo>;
  currentAddress: string = "";
  chooseAddressarr: Array<LoginInfo>;
  chooseAddress: string = "";

  constructor()
  {
    super();
    this.neoasset = new NeoAsset();
    this.balances = new Array();
    this.neoasset.gas = 0;
    this.neoasset.neo = 0;
    this.neoasset.claim = 0;
    this.chooseAddressarr = new Array();
    this.chooseAddressarr = StorageTool.getLoginArr();
  }
  // Component method
  mounted()
  {
    this.currentAddress = LoginInfo.getCurrentAddress();
    this.getBalances();
  }

  addressSwitch()
  {
    LoginInfo.setCurrentAddress(this.chooseAddress);
    this.currentAddress = this.chooseAddress;
    this.getBalances();
  }

  //获取余额
  async getBalances()
  {
    CoinTool.initAllAsset();
    //获得balance列表
    var balances = await WWW.api_getBalance(this.currentAddress) as BalanceInfo[];
    var clamis = await WWW.api_getclaimgas(this.currentAddress, 0);
    var clamis2 = await WWW.api_getclaimgas(this.currentAddress, 1);
    var nep5balances = await WWW.api_getnep5Balance(this.currentAddress) as Nep5Balance[];
    if (balances) //余额不唯空
    {
      balances.map(item => item.names = CoinTool.assetID2name[ item.asset ]); //将列表的余额资产名称赋值
      this.balances = balances; //塞入页面modual
      this.neoasset.claim = clamis + clamis2;   //塞入claim
      this.balances.forEach //取NEO 和GAS
        (
        (balance) =>
        {
          if (balance.asset == CoinTool.id_NEO)
          {
            this.neoasset.neo = balance.balance;
          }
          if (balance.asset == CoinTool.id_GAS)
          {
            this.neoasset.gas = balance.balance;
          }
        });
    }
    if (nep5balances)
    {
      for (let index = 0; index < nep5balances.length; index++)
      {
        const nep5 = nep5balances[ index ];
        var nep5b: BalanceInfo = new BalanceInfo();
        nep5b.asset = nep5.assetid;
        nep5b.balance = nep5.balance;
        nep5b.names = nep5.symbol;
        nep5b.type = "nep5";
        this.balances.push(nep5b);
      }
    }
    StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
  }

  async toClaimGas()
  {
    if (this.neoasset.claim > 0)
    {
      let res = await CoinTool.rawTransaction(this.currentAddress, CoinTool.id_NEO, this.neoasset.neo.toString());
      if (res.info)
      {
      }
    }
  }

  async queryClaimTx(txid)
  {
    setTimeout(() =>
    {
      var res = WWW.getrawtransaction(txid);
      if (!res)
        this.queryClaimTx(txid);
      CoinTool.claimgas();
    }, 30000);
  }

  toTransfer(asset: string)
  {
    StorageTool.setStorage("transfer_choose", asset);
    window.location.hash = "#transfer";
  }

}