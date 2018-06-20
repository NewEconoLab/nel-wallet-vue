import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner
    }
})
export default class Bonus extends Vue
{
    claimNum: string;
    isClaim: boolean;    //控制claim按钮，默认false为显示
    claimState: number;      //claim的状态，默认为1
    historyList: any;

    constructor()
    {
        super();
        this.claimNum = '';
        this.isClaim = false;
        this.claimState = 1;
        this.historyList = null;
    }
    async mounted()
    {
        this.getClaimNum();
    }
    //获取claimNumber
    async getClaimNum()
    {
        let res = await tools.sgastool.canClaimCount();
        this.claimNum = res;
        console.log(res);
    }
    //提取claim
    async getClaim()
    {
        this.isClaim = true;
        this.claimState = 1;
        let txid = await tools.sgastool.claim();
        console.log(txid);
        this.checkClaim(txid);
    }
    //提取claim过程
    async checkClaim(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        console.log(res);
        if (res)
        {
            this.checkClaimAgain(txid);
        } else
        {
            setTimeout(async () =>
            {
                this.claimState = 2;
                this.checkClaim(txid);
            }, 10000);
        }
    }
    async checkClaimAgain(txid)
    {
        let res = await tools.wwwtool.getnep5transferbytxid(txid);
        console.log("nep5 tran----------")
        console.log(res);
        if (res)
        {
            this.isClaim = false;
            this.claimState = 4;
            this.getClaimNum();
        } else
        {
            setTimeout(async () =>
            {
                this.claimState = 3;
                this.checkClaimAgain(txid);
            }, 10000);
        }
    }

    async getHistory()
    {

    }
}