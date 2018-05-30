import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../layouts/wallet.vue";
import NeoNameAuction from "./neoauction.vue";
import { LoginInfo } from "../tools/entity";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "neoname-auction": NeoNameAuction
    }
})
export default class NNSNeo extends Vue
{
    constructor()
    {
        super();
    }

    mounted() { }
}