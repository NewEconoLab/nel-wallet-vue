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
    exGas: number;
    exSGas: number;

    constructor()
    {
        super();

        this.changeSGas = false;
        this.transcount = "";
        this.myGas = 0;
        this.mySGas = 0;
        this.exGas = 0;
        this.exSGas = 0;
        tools.coinTool.initAllAsset();
    }

    mounted()
    {
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.getMyGas();
        this.getMySGas();
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
                    }
                });
        }
    }
    async getMySGas()
    {
        let res = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), this.currentAddress);
        console.log(res);
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

            } catch (error)
            {
                console.error(error);

            }
        }
    }

}