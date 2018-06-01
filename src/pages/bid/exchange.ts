import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
@Component({
    components: {}
})
export default class Exchange extends Vue
{
    changeSGas: boolean;
    constructor()
    {
        super();
        this.changeSGas = false;
    }
}