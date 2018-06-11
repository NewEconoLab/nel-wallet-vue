import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, BalanceInfo, Result, NeoAsset, Nep5Balance } from '../../tools/entity';
@Component({
    components: {}
})
export default class Exchange extends Vue
{
    currentAddress: string = "";
    changeSGas: boolean;
    transcount: string;
    myGas: number;
    mySGas: number;
    excount: string;
    exMaxcount: number;
    exchangebtn: boolean;
    exchangeList: any;

    constructor()
    {
        super();

        this.changeSGas = false;
        this.transcount = "";
        this.myGas = 0;
        this.mySGas = 0;
        this.excount = "0";
        this.exMaxcount = 0;
        this.exchangebtn = false;
        this.exchangeList = [];
        tools.coinTool.initAllAsset();
        this.getExchangeCount(0, 0);
    }

    mounted()
    {
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.getMyGas();
        this.getMySGas();
    }
    exchangeTranType(flag: boolean)
    {
        this.changeSGas = flag;
        if (flag)
        {
            this.exMaxcount = this.mySGas;
        } else
        {
            this.exMaxcount = this.myGas;
        }
    }

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

    async getMySGas()
    {
        let res = await tools.wwwtool.getnep5balanceofaddress('0x' + tools.coinTool.id_SGAS.toString(), this.currentAddress);
        console.log(res);
        if (res && res.nep5balance)
        {
            this.mySGas = res.nep5balance;
        }
    }

    getExchangeCount(myGas, mySGas)
    {
        if (this.transcount)
        {
            if (this.changeSGas)
            {
                //this.excount = myGas + this.transcount != '' ? parseFloat(this.transcount) : 0;
                let price = Neo.Fixed8.parse(myGas + "");
                let sum = price.add(Neo.Fixed8.parse(this.transcount));
                this.excount = sum.toString();
            } else
            {
                //this.excount = parseFloat(mySGas) + this.transcount != '' ? parseFloat(this.transcount) : 0;
                let price = Neo.Fixed8.parse(mySGas + "");
                let sum = price.add(Neo.Fixed8.parse(this.transcount));
                this.excount = sum.toString();
            }
        } else
        {
            this.excount = '0';
        }
    }

    exchangeCount()
    {
        if (this.transcount)
        {
            this.getExchangeCount(this.myGas, this.mySGas);
        } else
        {
            this.getExchangeCount(0, 0);
        }
    }

    async exChange()
    {
        if (this.changeSGas)
        {
            let txid = await tools.sgastool.makeRefundTransaction(parseFloat(this.transcount));
            console.log(txid);

        } else
        {
            try
            {
                let txid = await tools.sgastool.makeMintTokenTransaction(parseFloat(this.transcount));
                console.log(txid);
                let tranObj = { 'trancount': this.transcount, 'txid': txid };
                this.exchangeList.push(tranObj);
                console.log(this.exchangeList);
                tools.storagetool.setStorage('exchangelist', JSON.stringify(this.exchangeList));
                let checkTran = this.checkTranisOK(txid);
                console.log(checkTran);

            } catch (error)
            {
                console.error(error);
            }
        }
    }

    async checkTranisOK(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (res)
        {
            console.log(res);
            return res;
        } else
        {
            setTimeout(async () =>
            {
                this.checkTranisOK(txid);
                console.log(res);
            }, 10000);
        }
    }

}