import { LoginInfo, BlanaceInfo, Result, NeoAsset } from './../tools/entity';
import { StorageTool } from './../tools/storagetool';
import Vue from "vue";
import { Component } from "vue-property-decorator";
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"
import { WWW } from '../tools/wwwtool';

declare const mui;

let vm = new Vue();
@Component({
  components: {
    "wallet-layout": WalletLayout    
  }
})
export default class balance extends Vue 
{
  // Data property
  neoasset:NeoAsset = new NeoAsset();
  balances:Array<BlanaceInfo> = new Array();
  currentAddress:string="";

  // Component method
  mounted() 
  { 
    this.currentAddress = StorageTool.getStorage("current-address");
    this.getBalances();
  }

  async getNeoasset()
  {
  }

  async getBalances()
  {
    var res:Result = await WWW.api_getBalance(this.currentAddress);
    var clamis = await WWW.api_getclaimgas(this.currentAddress);
    if(res.err){
      mui.alert("Current address balance is empty -_-!");
    }else{
      this.balances = res.info;
      this.neoasset.claim = clamis;
      this.balances.map
      (
        (balance)=> {
          if(balance.names=="NEO"){
            this.neoasset.neo = balance.balance;
          }
          if(balance.names=="GAS"){
            this.neoasset.gas = balance.balance;
          }
        }
      );

    }
  }

  toTransfer(asset:string){
    vm.$emit('txasset',asset); //触发事件
    window.location.hash = "#transfer";
  }

}