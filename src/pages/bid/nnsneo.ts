import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../../layouts/wallet.vue";
import NeoAuction from "./neoauction.vue";
import { LoginInfo } from "../../tools/entity";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "neo-auction": NeoAuction
    }
})
export default class NNSNeo extends Vue
{
    showType: number;

    constructor()
    {
        super();
        this.showType = 1;
    }

    mounted() { }
}