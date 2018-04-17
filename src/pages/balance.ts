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

  initAddress

  async getBalances()
  {
    CoinTool.initAllAsset();
    var res: Result = await WWW.api_getBalance(this.currentAddress);
    var clamis = await WWW.api_getclaimgas(this.currentAddress);
    var nep5balances = await WWW.api_getnep5Balance(this.currentAddress) as Nep5Balance[];
    if (res.err)
    {
      // mui.alert("Current address balance is empty -_-!");
    } else
    {
      this.balances = res.info;
      this.neoasset.claim = clamis;
      this.balances.map
        (
        (balance) =>
        {
          if (balance.names == "NEO")
          {
            this.neoasset.neo = balance.balance;
          }
          if (balance.names == "GAS")
          {
            this.neoasset.gas = balance.balance;
          }
        }
        )
    }
    if (nep5balances != undefined && nep5balances.length > 0)
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

  toTransfer(asset: string)
  {
    StorageTool.setStorage("transfer_choose", asset);
    window.location.hash = "#transfer";
  }

}