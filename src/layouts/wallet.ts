import Vue from "vue";
import Component from "vue-class-component";
import MainLayout from "./Main.vue";
import VLink from "../components/VLink.vue";
import { tools } from "../tools/importpack";
import { sessionStoreTool } from "../tools/storagetool";
@Component({
    components: {
        VLink,
        MainLayout
    }
})
export default class FeatureComponent extends Vue
{
    balance: string;
    transfer: string;
    exchange: string;
    nnsneo: string;
    nns: string;
    setting: string;
    blockheight: number;
    constructor()
    {
        super();
        this.balance = "";
        this.exchange = "";
        this.nnsneo = "";
        this.nns = "";
        this.transfer = "";
        this.setting = "";
        this.blockheight = 0;
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
    }

    mounted()
    {
        this.balance = this.$refs[ "balance" ][ "isActive" ]
            ? "icon-balance-select"
            : "icon-balance-unselect";
        this.transfer = this.$refs[ "transfer" ][ "isActive" ]
            ? "icon-transfer-select"
            : "icon-transfer-unselect";
        this.exchange = this.$refs[ "exchange" ][ "isActive" ]
            ? "icon-exchange-select"
            : "icon-exchange-unselect";
        this.nnsneo = this.$refs[ "nnsneo" ][ "isActive" ]
            ? "icon-nnsneo-select"
            : "icon-nnsneo-unselect";
        this.nns = this.$refs[ "nns" ][ "isActive" ]
            ? "icon-nns-select"
            : "icon-nns-unselect";
        this.setting = this.$refs[ "setting" ][ "isActive" ]
            ? "icon-setting-select"
            : "icon-setting-unselect";

        this.getHeight()
        let arr = tools.storagetool.getLoginArr();
        if (arr.length == 0)
        {
            window.location.hash = "#login";
        }
    }

    async getHeight()
    {
        this.blockheight = await tools.wwwtool.api_getHeight();
        let oldBlock = new sessionStoreTool("block");
        setInterval(() =>
        {
            let height = oldBlock.select("height");
            this.blockheight = height;
        }, 5000);
    }

}