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
    neonameList: any;
    domainInfo: any;
    constructor()
    {
        super();
        this.isShowEdit = false;
        // this.currentAddress = LoginInfo.getCurrentAddress();
        this.currentAddress = 'AHDV7M54NHukq8f76QQtBTbrCqKJrBH9UF';
        this.neonameList = null;
    }
    mounted()
    {
        this.getAllNeoName(this.currentAddress);
    }
    async getAllNeoName(address)
    {
        let res = await tools.wwwtool.getnnsinfo(address, '.neo');
        let list = res;
        if (list.length)
        {
            for (let i in list)
            {
                list[ i ][ "ttl" ] = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(list[ i ][ "ttl" ] * 1000));
            }
            console.log(list);
            this.neonameList = list;
        }
    }
    onShowEdit(item)
    {
        this.isShowEdit = !this.isShowEdit;
        this.domainInfo = item;
    }
}