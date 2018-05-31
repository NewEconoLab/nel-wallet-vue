import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner
    }
})
export default class Auction extends Vue
{

    constructor()
    {
        super();
    }
    onBack()
    {
        console.log("dddd")
        this.$emit('onBack');
    }
}