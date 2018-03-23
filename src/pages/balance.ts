import Vue from "vue";
import { Component } from "vue-property-decorator";
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"

declare const mui;

@Component({
  components: {
    "wallet-layout": WalletLayout
  }
})
export default class balance extends Vue {
  // Data property
  balances:Array<{name:string,amount:number}> = new Array()
  props:["Message"]

  // Component method
  mounted() {
      this.balances.push({name:"NEO",amount:20},{name:"GAS",amount:20}) ;
  }
}