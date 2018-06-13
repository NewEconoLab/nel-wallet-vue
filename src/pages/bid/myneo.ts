import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, BalanceInfo, Result, NeoAsset, Nep5Balance } from '../../tools/entity';
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner
    }
})
export default class MyNeo extends Vue
{
    isShowEdit: boolean;
    currentAddress: string = "";   //获取当前地址
    constructor()
    {
        super();
        this.isShowEdit = false;
        this.currentAddress = LoginInfo.getCurrentAddress();
    }
    mounted()
    {
        this.getAllNeoName(this.currentAddress);
    }
    async getAllNeoName(address)
    {
        let res = await tools.wwwtool.getnnsinfo(address, 'neo');
        console.log(res);
    }

}