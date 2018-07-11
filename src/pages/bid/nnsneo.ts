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
        this.showType = 1;
        let routeArray = location.hash.replace("#", "").split("/")
        let route = routeArray[ 0 ];
        let subroute = routeArray.length > 1 ? routeArray[ 1 ] : undefined;
        switch (subroute)
        {
            case "auction":
                this.showType = 1;
                break;
            case "exchange":
                this.showType = 2;
                break;
            case "myneoname":
                this.showType = 3;
                break;
            case "bonus":
                this.showType = 4;
                break;
        }
    }

    mounted() { }

    switchRoute(subroute)
    {
        switch (subroute)
        {
            case "auction":
                this.showType = 1;
                location.hash = "#nnsneo/auction";
                break;
            case "exchange":
                this.showType = 2;
                location.hash = "#nnsneo/exchange";
                break;
            case "myneoname":
                this.showType = 3;
                location.hash = "#nnsneo/myneoname";
                break;
            case "bonus":
                this.showType = 4;
                location.hash = "#nnsneo/bonus";
                break;
        }
    }
}