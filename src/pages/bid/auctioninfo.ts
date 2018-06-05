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
export default class AuctionInfo extends Vue
{
    address: string;
    myBidPrice: number;
    bidDetailList: any;
    currentpage: number;
    pagesize: number;
    btnShowmore: boolean;
    @Prop() item: any;
    constructor()
    {
        super();
        // this.address = tools.storagetool.getStorage("current-address");
        this.address = 'AeYiwwjiy2nKXoGLDafoTXc1tGvfkTYQcM';
        this.myBidPrice = this.item.mybidprice;
        console.log(this.item);
        this.bidDetailList = [];
        this.currentpage = 1;
        this.pagesize = 5;
        this.btnShowmore = true;

        this.getBidDetail(this.item.domain, this.currentpage, this.pagesize)
    }
    myBidInput($event)
    {
        let price = $event.target.value;
        console.log(price);
        let res = this.checkInput(price);
        if (res)
        {
            this.myBidPrice = ((parseFloat(this.item.mybidprice) + parseFloat(price)) * 10) / 10;
            console.log(parseFloat(this.item.mybidprice) + "+" + parseFloat(price))
        }
    }
    checkInput(price)
    {
        let reg = /^[0-9]+(.[0-9]{1})?$/;
        if (!reg.test(price))
        {
            return false;
        }

        return true;
    }
    async getBidDetail(domain, currentpage, pagesize)
    {
        let res = await tools.wwwtool.api_getBidDetail(domain, currentpage, pagesize);
        console.log(res);
        if (res)
        {
            if (res[ 0 ].count < pagesize)
            {
                this.btnShowmore = false;
            }
            if (res[ 0 ].list.length < pagesize)
            {
                this.btnShowmore = false;
            }
            for (let i in res[ 0 ].list)
            {
                res[ 0 ].list[ i ].addPriceTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(res[ 0 ].list[ i ].addPriceTime * 1000));
                this.bidDetailList.push(res[ 0 ].list[ i ]);
            }

        }
    }
    getMoreBidDetail()
    {
        this.currentpage += 1;
        this.getBidDetail(this.item.domain, this.currentpage, this.pagesize);
    }
    onBack()
    {
        this.$emit('onBack');
    }
}