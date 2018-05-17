import Vue from "vue";
import Component from "vue-class-component";
import MainLayout from "./Main.vue";
import VLink from "../components/VLink.vue";
import { WWW } from "../tools/wwwtool";
import { StorageTool } from "../tools/storagetool";
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
    nns: string;
    setting: string;
    blockheight: number;
    constructor()
    {
        super();
        this.balance = "";
        this.nns = "";
        this.transfer = "";
        this.setting = "";
        this.blockheight = 0;
    }

    mounted()
    {
        this.balance = this.$refs[ "balance" ][ "isActive" ]
            ? "icon-balance-select"
            : "icon-balance-unselect";
        this.transfer = this.$refs[ "transfer" ][ "isActive" ]
            ? "icon-transfer-select"
            : "icon-transfer-unselect";
        this.nns = this.$refs[ "nns" ][ "isActive" ]
            ? "icon-nns-select"
            : "icon-nns-unselect";
        this.setting = this.$refs[ "setting" ][ "isActive" ]
            ? "icon-setting-select"
            : "icon-setting-unselect";

        this.getHeight()
        let arr = StorageTool.getLoginArr();
        if (arr.length == 0)
        {
            window.location.hash = "#login";
        }
    }

    async getHeight()
    {
        WWW.api_getHeight()
            .then((res) =>
            {
                this.blockheight = res;
            });
        setTimeout(() => { this.getHeight() }, 30000);
    }

}