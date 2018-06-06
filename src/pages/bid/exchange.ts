import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
@Component({
    components: {}
})
export default class Exchange extends Vue
{
    changeSGas: boolean;
    transcount: string;
    constructor()
    {
        super();
        this.changeSGas = false;
        this.transcount = "";
    }

    exChange()
    {
        if (this.changeSGas)
        {
        } else
        {
            try
            {
                let txid = tools.sgastool.makeMintTokenTransaction(parseFloat(this.transcount));
                console.log(txid);

            } catch (error)
            {
                console.error(error);

            }
        }
    }

}