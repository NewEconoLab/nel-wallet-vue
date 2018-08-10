import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../../layouts/wallet.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, BalanceInfo, UTXO, TaskFunction, Task, ConfirmType, TaskType } from '../../tools/entity';
import { TaskManager } from "../../tools/taskmanager";
import Store from "../../tools/StorageMap";
@Component({
    components: {
        "wallet-layout": WalletLayout
    }
})
export default class Exchange extends Vue
{
    currentAddress: string = "";   //获取当前地址
    changeSGas: boolean;           //控制SGas与Gas的转换
    transcount: string;            //交易金额
    myGas: number;                 //拥有的Gas
    mySGas: number;                //拥有的SGas
    exMaxcount: number;            //当前能转换的最高金额
    exchangebtn: boolean;          //转换按钮的控制 默认false不可点击
    exchangeList: any;             //一条交易数据的缓存
    isCheckingTran: boolean;        //是否交易中
    transmaxlength: number;          //input输入框的限制

    constructor()
    {
        super();
        this.changeSGas = false;
        this.transcount = "";
        this.myGas = 0;
        this.mySGas = 0;
        this.exMaxcount = 0;
        this.exchangebtn = false;
        this.exchangeList = null;
        this.isCheckingTran = false;
        tools.coinTool.initAllAsset();
    }

    mounted()
    {
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.getMyGas();
        this.getMySGas();
        this.isShowTranLog();
        TaskFunction.exchange = this.isTranClose;
    }
    //切换转换模式
    exchangeTranType()
    {
        this.transcount = "";
        this.changeSGas = !this.changeSGas;
        this.changeSGas ? this.exMaxcount = this.mySGas : this.exMaxcount = this.myGas;
        this.exchangeList ? this.exchangebtn = true : this.exchangebtn = false;
    }

    /**
     * 获取当前地址的Gas
     */
    async getMyGas()
    {
        //获得balance列表
        var balances = await tools.wwwtool.api_getBalance(this.currentAddress) as BalanceInfo[];
        this.myGas = 0;
        if (balances) //余额不唯空
        {
            balances.forEach //取GAS
                (balance =>
                {
                    if (balance.asset == tools.coinTool.id_GAS)
                    {
                        this.myGas = balance.balance;
                        this.exMaxcount = this.myGas;
                    }
                });
        }
    }
    /**
     * 获取当前地址的SGas
     */
    async getMySGas()
    {
        let res = await tools.wwwtool.getnep5balanceofaddress('0x' + tools.coinTool.id_SGAS.toString(), this.currentAddress);
        if (res && res.nep5balance)
        {
            this.mySGas = parseFloat(res.nep5balance);
        }
    }
    /**
     * 交易金额的输入确认
     */
    exchangeCount()
    {
        if (this.transcount)
        {
            if (!/^0|^\.\d/.test(this.transcount) || /^[0-9]\.[0-9]/.test(this.transcount))
            {
                if (/\./.test(this.transcount))
                {
                    this.transcount = this.transcount.toString().substr(0, (this.transcount.toString().indexOf(".")) + 9);
                }
                this.exchangeList ? this.exchangebtn = false : this.exchangebtn = true;
            }
            else
            {
                this.exchangebtn = false;
            }

        } else
        {
            this.exchangebtn = false;
        }

    }
    /**
     * exchange提交
     */
    async exChange()
    {
        let height = Store.blockheight.select("height");
        if (this.changeSGas)
        {
            try
            {   //sgas->gas
                this.isCheckingTran = true;
                console.log("筛选utxo --------------------");
                console.log(new Date().getTime());

                let result = await tools.sgastool.makeRefundTransaction(parseFloat(this.transcount));

                console.log(new Date().getTime());
                console.log("筛选结束-------------------");

                // 已经确认
                //tx的第一个utxo就是给自己的
                let utxo: UTXO = new UTXO();
                utxo.addr = LoginInfo.getCurrentAddress();
                utxo.txid = result.txid;
                utxo.asset = tools.coinTool.id_GAS;
                utxo.count = Neo.Fixed8.parse(this.transcount);
                utxo.n = 0;

                //把这个txid里的utxo[0]的value转给自己
                let data = await tools.sgastool.makeRefundTransaction_tranGas(utxo, this.transcount.toString());
                let res = await tools.wwwtool.rechargeandtransfer(result.data, data);
                let txid = res[ "txid" ];
                TaskManager.addTask(
                    new Task(height, ConfirmType.recharge, txid, { count: this.transcount }),
                    TaskType.sgasToGas
                );
                let tranObj = [ { 'trancount': this.transcount, 'txid': txid, 'trantype': 'SGas' } ];
                sessionStorage.setItem('exchangelist', JSON.stringify(tranObj));
                this.exchangebtn = false;
                this.isCheckingTran = true;
                this.isShowTranLog();
            } catch (error)
            {
                console.log(error);
            }
        } else
        {
            try
            {   //gas->sgas
                this.isCheckingTran = true;
                let txid = await tools.sgastool.makeMintTokenTransaction(parseFloat(this.transcount));
                TaskManager.addTask(
                    new Task(height, ConfirmType.tranfer, txid, { count: this.transcount }),
                    TaskType.gasToSgas
                );
                let tranObj = [ { 'trancount': this.transcount, 'txid': txid, 'trantype': 'Gas' } ];
                sessionStorage.setItem('exchangelist', JSON.stringify(tranObj));
                this.isShowTranLog();
            } catch (error)
            {
                console.error(error);
            }
        }
    }

    /**转账记录 */
    isShowTranLog()
    {
        this.exchangeList = sessionStorage.getItem('exchangelist');
        if (this.exchangeList)
        {
            this.exchangeList = JSON.parse(this.exchangeList);
            this.isCheckingTran = true;
        }
    }
    /**交易结束 */
    isTranClose()
    {
        sessionStorage.removeItem("exchangelist");
        this.isCheckingTran = false;
        this.transcount = "";
        this.getMyGas();
        this.getMySGas();
        this.exchangeList = null;
    }

}