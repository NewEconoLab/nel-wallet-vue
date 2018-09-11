import Vue from "vue";
import Component from "vue-class-component";
import { services } from "../../services/index";
import { tools } from "../../tools/importpack";
@Component({
    components: {
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
            case "myneoname":
                this.showType = 3;
                break;
            case "bonus":
                this.showType = 4;
                break;
            case "tutorial":
                this.showType = 5;
                break;
        }
    }

    async mounted()
    {
        services.auction_neo.root = await tools.nnstool.getRootInfo("neo");
    }
    isActive(model: string)
    {
        return model == this.$router.currentRoute.name;
    }
}