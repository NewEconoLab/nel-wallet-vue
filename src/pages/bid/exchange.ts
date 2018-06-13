import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, BalanceInfo, Result, NeoAsset, Nep5Balance } from '../../tools/entity';
@Component({
    components: {
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
        this.exchangeList ? this.exchangebtn = false : this.exchangebtn = true;
    }

    /**
     * 获取当前地址的Gas
     */
    async getMyGas()
    {
        //获得balance列表
        var balances = await tools.wwwtool.api_getBalance(this.currentAddress) as BalanceInfo[];
        let height = await tools.wwwtool.api_getHeight();
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
        console.log(res);
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
            if (!/^0|^\.\d/.test(this.transcount) || /^0\.[0-9]/.test(this.transcount))
            {
                this.exchangeList ? this.exchangebtn = false : this.exchangebtn = true;
            } else
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
            let txid = await tools.sgastool.makeRefundTransaction(parseFloat(this.transcount));
            console.log(txid);
            let tranObj = { 'trancount': this.transcount, 'txid': txid };
            tools.storagetool.setStorage('exchangelist', JSON.stringify(tranObj));
            this.isShowTranLog();
        } else
        {
            try
            {
                let txid = await tools.sgastool.makeMintTokenTransaction(parseFloat(this.transcount));
                console.log(txid);
                let tranObj = { 'trancount': this.transcount, 'txid': txid, 'trantype': 'Gas' };
                tools.storagetool.setStorage('exchangelist', JSON.stringify(tranObj));
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
    async checkTranisOK(txid: string)
    {
        this.exchangebtn = false;
        this.isCheckingTran = true;
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (res)
        {
            console.log(res);
            tools.storagetool.delStorage('exchangelist');
            this.isCheckingTran = false;
            this.transcount = "";
            this.getMyGas();
            this.getMySGas();
            this.exchangeList = null;
        } else
        {
            setTimeout(async () =>
            {
                this.checkTranisOK(txid);
                console.log(res);
            }, 10000);
        }
    }
    /**转账记录 */
    isShowTranLog()
    {
        this.exchangeList = tools.storagetool.getStorage('exchangelist');
        if (this.exchangeList)
        {
            this.exchangeList = JSON.parse(this.exchangeList);
            this.checkTranisOK(this.exchangeList.txid);
        }
    }

}