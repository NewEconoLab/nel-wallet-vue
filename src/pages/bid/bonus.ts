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

    constructor()
    {
        super();
        this.claimNum = '';
    }
    async mounted()
    {
        let res = await tools.sgastool.canClaimCount();
        this.claimNum = res;
        console.log(res);
    }
    async getres()
    {
    }
}