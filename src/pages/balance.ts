import { CoinTool } from './../tools/cointool';
import { LoginInfo, BalanceInfo, Result, NeoAsset } from './../tools/entity';
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
  neoasset: NeoAsset = new NeoAsset();
  balances: Array<BalanceInfo> = new Array();
  currentAddress: string = "";
  chooseAddress: Array<StorageTool> = new Array();

  constructor()
  {
    super();
    this.neoasset = new NeoAsset();
    this.balances = new Array();
    this.neoasset.gas = 0;
    this.neoasset.neo = 0;
    this.neoasset.claim = 0;
    this.chooseAddress = new Array();
    this.chooseAddress = StorageTool.getLoginArr();
  }
  // Component method
  mounted() 
  {
    this.currentAddress = LoginInfo.getCurrentAddress();
    this.getBalances();
  }

  async getNeoasset()
  {
  }

  async getBalances()
  {
    CoinTool.initAllAsset();
    var res: Result = await WWW.api_getBalance(this.currentAddress);
    var clamis = await WWW.api_getclaimgas(this.currentAddress);
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
      StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
    }
  }

  toTransfer(asset: string)
  {
    StorageTool.setStorage("transfer_choose", asset);
    window.location.hash = "#transfer";
  }

}