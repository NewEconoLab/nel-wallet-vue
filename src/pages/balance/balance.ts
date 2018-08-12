import { LoginInfo, BalanceInfo, Result, NeoAsset, Nep5Balance, Task, ConfirmType, TaskType, TaskFunction, TaskState } from '../../tools/entity';
import Vue from "vue";
import { Component } from "vue-property-decorator";
import WalletLayout from "../../layouts/wallet.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { TaskManager } from '../../tools/taskmanager';
import Store from '../../tools/StorageMap';

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
  /**
   * 是否可领取gas 0为可领取状态，1为不可以领取,2为正在领取
   */
  getGas: number;
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
    this.getGas = 0;
    // this.chooseAddressarr = tools.storagetool.getLoginArr();
  }
  // Component method
  mounted()
  {
    this.currentAddress = LoginInfo.getCurrentAddress();
    this.getBalances();
    let claimState = sessionStorage.getItem("claimState");
    if (claimState)
    {
      this.claimbtn = false;
      this.loadmsg = (claimState == "1") ? "" + this.$t("balance.msg2") : "" + this.$t("balance.msg3");
    }
    this.openToast = this.$refs.toast[ "isShow" ];

    TaskManager.functionList = [];
    TaskManager.functionList.push(this.getBalances);
    TaskFunction.claimGas = this.startClaimGas;
    TaskFunction.claimState = this.claimState;
    TaskFunction.getGasTest = this.btnState;
  }

  btnState(state: number)
  {
    this.getGas = state;
  }

  claimState(state: number)
  {
    if (state == 0)
    {
      this.claimbtn = true;
      this.loadmsg = "";
    }
    if (state == 1)
    {
      this.claimbtn = true;
      this.loadmsg = "" + this.$t("balance.msg4");
    }
    sessionStorage.removeItem("claimState");
  }


  //手动领取测试gas
  async getTestGas()
  {
    this.getGas = 2;
    let res = await tools.wwwtool.api_claimgas(this.currentAddress, 10);
    if (res)
    {
      let height = Store.blockheight.select("height");
      if (res[ 0 ].code == "3000")//交易待发送
      {
        this.openToast("success", "" + this.$t("balance.successmsg"), 4000);
        // this.getGas = 1;
        let task = new Task(height, ConfirmType.tranfer, "", { amount: 10 });
        TaskManager.addTask(task, TaskType.getGasTest);
      }
      else if (res[ 0 ].code == "3002")//余额不足
      {
        this.openToast("error", "" + this.$t("balance.errmsg2"), 4000);
        this.getGas = 0;
      }
      else if (res[ 0 ].code == "3003")//已领取
      {
        this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
        this.getGas = 1;
      }
      else if (res[ 0 ].code == "3004")//超出领取金额
      {
        this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
        this.getGas = 1;
      }
      else
      {
        this.openToast("error", "" + this.$t("balance.errmsg3"), 4000);
        this.getGas = 0;
      }
    }
    else
    {
      this.openToast("error", "" + this.$t("balance.errmsg3"), 4000);
      this.getGas = 0;
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
    let height = Store.blockheight.select("height");
    if (Neo.Fixed8.parse(this.neoasset.claim).compareTo(Neo.Fixed8.Zero) > 0)
    {
      if (this.neoasset.neo > 0)
      {
        let res = await tools.coinTool.rawTransaction(this.currentAddress, tools.coinTool.id_NEO, this.neoasset.neo.toString());
        if (res.info)
        {
          this.claimbtn = false;
          this.loadmsg = "" + this.$t("balance.msg1");
          TaskManager.addTask(
            new Task(height, ConfirmType.tranfer, res.info, { type: "Claim", amount: this.neoasset.neo, assetname: "NEO", toaddress: this.currentAddress }),
            TaskType.tranfer
          );
          sessionStorage.setItem("claimState", "1");
          this.loadmsg = "" + this.$t("balance.msg2");
          // this.queryNEOTx(res.info);
        }
      } else
      {
        this.startClaimGas();
      }
    }
  }

  async startClaimGas()
  {
    let height = Store.blockheight.select("height");
    this.loadmsg = "" + this.$t("balance.msg3");
    let res = await tools.coinTool.claimGas();
    if (res[ "sendrawtransactionresult" ])
    {
      let txid = res[ "txid" ];
      let amount = JSON.parse(res[ 'amount' ]);
      TaskManager.addTask(
        new Task(height, ConfirmType.tranfer, txid, { amount }),
        TaskType.ClaimGas
      );
      sessionStorage.setItem("claimState", "2");
    }
  }

  // async queryNEOTx(txid)
  // {
  //   setTimeout(async () =>
  //   {
  //     let res = await tools.wwwtool.getrawtransaction(txid);
  //     if (!res)
  //     {
  //       this.queryNEOTx(txid);
  //       return;
  //     }
  //     this.loadmsg = "" + this.$t("balance.msg3");
  //     let result = await tools.coinTool.claimGas();
  //     if (result[ "sendrawtransactionresult" ])
  //     {
  //       let txid = result[ "txid" ];
  //       this.queryClaimTx(txid);
  //     }
  //   }, 30000);
  // }

  // async queryClaimTx(txid)
  // {
  //   setTimeout(async () =>
  //   {
  //     var res = await tools.wwwtool.getrawtransaction(txid);
  //     if (res)
  //     {
  //       this.loadmsg = "" + this.$t("balance.msg4");
  //       this.claimbtn = true;
  //       this.getBalances();
  //       return;
  //     }
  //     this.queryClaimTx(txid);
  //   }, 30000);
  // }

  toTransfer(asset: string)
  {
    tools.storagetool.setStorage("transfer_choose", asset);
    window.location.hash = "#transfer";
  }

}