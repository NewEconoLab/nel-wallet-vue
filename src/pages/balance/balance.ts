import { LoginInfo, BalanceInfo, Result, NeoAsset, Nep5Balance, Task, ConfirmType, TaskType } from '../../tools/entity';
import Vue from "vue";
import { Component } from "vue-property-decorator";
import WalletLayout from "../../layouts/wallet.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";

declare const mui;

@Component({
  components: {
    "wallet-layout": WalletLayout,
    "spinner-wrap": Spinner
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
  loadmsg: string = "";
  claimbtn: boolean = true;
  isgetGas: boolean = false;//是否可领取gas false为可领取状态，true为不可以领取
  gettingGas: boolean;//false为正在领取状态
  openToast: Function;

  constructor()
  {
    super();
    this.neoasset = new NeoAsset();
    this.balances = new Array();
    this.neoasset.gas = 0;
    this.neoasset.neo = 0;
    this.neoasset.claim = '';
    this.chooseAddressarr = new Array();
    this.gettingGas = true;
    // this.chooseAddressarr = tools.storagetool.getLoginArr();
  }
  // Component method
  mounted()
  {
    this.currentAddress = LoginInfo.getCurrentAddress();
    this.isGetGas(this.currentAddress);
    this.getBalances();
    this.openToast = this.$refs.toast[ "isShow" ];
    // setInterval(() =>
    // {

    // }, 30000)
  }
  //判断是否可以领取gas
  async isGetGas(address: string)
  {
    let res = await tools.wwwtool.api_hasclaimgas(address);
    console.log(res);
    if (res)
    {
      if (res[ 0 ].code == "3010")
      {
        this.isgetGas = false;//可领取
        return true;
      } else if (res[ 0 ].code == "3012")
      {
        this.isgetGas = true;//已领取
        return false;
      } else if (res[ 0 ].code == "3011")
      {
        this.gettingGas = false;//正在领取
        return false;
      }
    }
    return false;
  }
  //手动领取测试gas
  async getTestGas()
  {
    let isOk = await this.isGetGas(this.currentAddress);
    if (isOk)
    {
      this.gettingGas = false;
      let res = await tools.wwwtool.api_claimgas(this.currentAddress, 10);
      if (res)
      {
        if (res[ 0 ].code == "3000")
        {
          this.openToast("success", "" + this.$t("balance.successmsg"), 4000);
          this.gettingGas = false;//正在领取
          this.isgetGas = true;//不可点击
        }
        else if (res[ 0 ].code == "3001")
        {
          console.log(res[ 0 ].codeMessage);
          this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
        }
        else if (res[ 0 ].code == "3002")//余额不足
        {
          this.openToast("error", "" + this.$t("balance.errmsg2"), 4000);
          console.log(res[ 0 ].codeMessage);
          this.gettingGas = true;
          this.isgetGas = true;
        }
        else if (res[ 0 ].code == "3004")//超出领取金额
        {
          this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
          console.log(res[ 0 ].codeMessage);
          this.gettingGas = true;
          this.isgetGas = true;
        }
      }
    }
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
    tools.coinTool.initAllAsset();
    //获得balance列表
    var balances = await tools.wwwtool.api_getBalance(this.currentAddress) as BalanceInfo[];
    var clamis = await tools.wwwtool.api_getclaimgas(this.currentAddress, 0);
    var clamis2 = await tools.wwwtool.api_getclaimgas(this.currentAddress, 1);
    var nep5balances = await tools.wwwtool.api_getnep5Balance(this.currentAddress) as Nep5Balance[];
    let height = await tools.wwwtool.api_getHeight();
    this.neoasset.neo = 0;
    this.neoasset.gas = 0;
    if (balances) //余额不唯空
    {
      let sum1 = Neo.Fixed8.parse(clamis[ "gas" ].toFixed(8));
      let sum2 = Neo.Fixed8.parse(clamis2[ "gas" ].toFixed(8));
      let sum = sum1.add(sum2).toString()
      this.neoasset.claim = sum;   //塞入claim
      balances.forEach //取NEO 和GAS
        (balance =>
        {
          if (balance.asset == tools.coinTool.id_NEO)
          {
            this.neoasset.neo = balance.balance;
          }
          if (balance.asset == tools.coinTool.id_GAS)
          {
            this.neoasset.gas = balance.balance;
          }
        });
    }



    this.balances = await BalanceInfo.getBalancesByArr(balances, nep5balances, height);
    tools.storagetool.setStorage("balances_asset", JSON.stringify(this.balances));
  }

  async toClaimGas()
  {
    if (Neo.Fixed8.parse(this.neoasset.claim).compareTo(Neo.Fixed8.Zero) > 0)
    {
      if (this.neoasset.neo > 0)
      {
        this.claimbtn = false;
        this.loadmsg = "" + this.$t("balance.msg1");
        let res = await tools.coinTool.rawTransaction(this.currentAddress, tools.coinTool.id_NEO, this.neoasset.neo.toString());
        if (res.info)
        {
          this.loadmsg = "" + this.$t("balance.msg2");
          this.queryNEOTx(res.info);
        }
      } else
      {
        this.loadmsg = "" + this.$t("balance.msg3");
        let res = await tools.coinTool.claimGas();
        if (res[ "sendrawtransactionresult" ])
        {
          let txid = res[ "txid" ];
          this.queryClaimTx(txid);
        }
      }
    }
  }

  async queryNEOTx(txid)
  {
    setTimeout(async () =>
    {
      let res = await tools.wwwtool.getrawtransaction(txid);
      if (!res)
      {
        this.queryNEOTx(txid);
        return;
      }
      this.loadmsg = "" + this.$t("balance.msg3");
      let result = await tools.coinTool.claimGas();
      if (result[ "sendrawtransactionresult" ])
      {
        let txid = result[ "txid" ];
        this.queryClaimTx(txid);
      }
    }, 30000);
  }

  async queryClaimTx(txid)
  {
    setTimeout(async () =>
    {
      var res = await tools.wwwtool.getrawtransaction(txid);
      if (res)
      {
        this.loadmsg = "" + this.$t("balance.msg4");
        this.claimbtn = true;
        this.getBalances();
        return;
      }
      this.queryClaimTx(txid);
    }, 30000);
  }

  toTransfer(asset: string)
  {
    tools.storagetool.setStorage("transfer_choose", asset);
    window.location.hash = "#transfer";
  }

}