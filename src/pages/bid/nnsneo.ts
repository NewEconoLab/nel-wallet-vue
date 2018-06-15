import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../../layouts/wallet.vue";
import NeoAuction from "./neoauction.vue";
import Exchange from "./exchange.vue";
import MyNeo from "./myneo.vue";
import Bonus from "./bonus.vue";
import { LoginInfo } from "../../tools/entity";
import { tools } from "../../tools/importpack";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "neo-auction": NeoAuction,
        "exchange": Exchange,
        "my-neo": MyNeo,
        "bonus": Bonus
    }
})
export default class NNSNeo extends Vue
{
    showType: number;

    constructor()
    {
        super();
        this.showType = 4;
    }

    mounted() { }
}