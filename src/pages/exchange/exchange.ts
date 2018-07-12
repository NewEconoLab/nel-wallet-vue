import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../../layouts/wallet.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, BalanceInfo, UTXO } from '../../tools/entity';
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "spinner-wrap": Spinner,
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
            console.log(this.transcount);
            if (!/^0|^\.\d/.test(this.transcount) || /^0\.[0-9]/.test(this.transcount))
            {
                if (/\./.test(this.transcount))
                {
                    this.transcount = parseFloat((parseFloat(this.transcount)).toFixed(8)).toString();
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
        if (this.changeSGas)
        {
            this.isCheckingTran = true;
            let txid = await tools.sgastool.makeRefundTransaction(parseFloat(this.transcount));
            console.log(txid);
            let tranObj = [ { 'trancount': this.transcount, 'txid': txid, 'trantype': 'SGas' } ];
            localStorage.setItem('exchangelist', JSON.stringify(tranObj));
            this.isShowTranLog();
        } else
        {
            try
            {
                this.isCheckingTran = true;
                let txid = await tools.sgastool.makeMintTokenTransaction(parseFloat(this.transcount));
                console.log(txid);
                let tranObj = [ { 'trancount': this.transcount, 'txid': txid, 'trantype': 'Gas' } ];
                localStorage.setItem('exchangelist', JSON.stringify(tranObj));
                this.isShowTranLog();
            } catch (error)
            {
                console.error(error);
            }
        }
    }

    /**
     * 等待转账确认
     * @param txid 交易id
     */
    async checkTranisOK(txid: string, trancount: string, trantype: string)
    {
        this.exchangebtn = false;
        this.isCheckingTran = true;
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (res)
        {
            if (trantype == "SGas")
            {
                // 已经确认
                //tx的第一个utxo就是给自己的
                let utxo: UTXO = new UTXO();
                utxo.addr = LoginInfo.getCurrentAddress();
                utxo.txid = txid;
                utxo.asset = tools.coinTool.id_GAS;
                utxo.count = Neo.Fixed8.parse(trancount.toString());
                utxo.n = 0;

                //把这个txid里的utxo[0]的value转给自己
                await tools.sgastool.makeRefundTransaction_tranGas(utxo, trancount.toString());
                // console.log("restxid: " + restxid);
                this.exchangeList = localStorage.getItem('exchangelist');
                this.exchangeList = JSON.parse(this.exchangeList);
                this.checkAgainTranisOK(this.exchangeList[ 1 ].txid);
            } else
            {
                this.isTranClose();
            }
        } else
        {
            setTimeout(async () =>
            {
                this.checkTranisOK(txid, trancount, trantype);
            }, 10000);
        }
    }
    async checkAgainTranisOK(txid: string)
    {
        this.exchangebtn = false;
        this.isCheckingTran = true;
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (res)
        {
            this.isTranClose();
        } else
        {
            setTimeout(async () =>
            {
                this.checkAgainTranisOK(txid);
            }, 10000);
        }
    }

    /**转账记录 */
    isShowTranLog()
    {
        this.exchangeList = localStorage.getItem('exchangelist');
        if (this.exchangeList)
        {
            this.exchangeList = JSON.parse(this.exchangeList);
            this.checkTranisOK(this.exchangeList[ 0 ].txid, this.exchangeList[ 0 ].trancount, this.exchangeList[ 0 ].trantype);
        }
    }
    /**交易结束 */
    isTranClose()
    {
        localStorage.removeItem("exchangelist");
        this.isCheckingTran = false;
        this.transcount = "";
        this.getMyGas();
        this.getMySGas();
        this.exchangeList = null;
    }

}