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
    myBidPrice: string;
    updatePrice: string;
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
        this.updatePrice = this.myBidPrice;
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
            let bidPrice = Neo.Fixed8.parse(this.myBidPrice + "");
            let sum = bidPrice.add(Neo.Fixed8.parse(price + ""));
            this.updatePrice = sum.toString();
            //this.myBidPrice = ((parseFloat(this.item.mybidprice) + parseFloat(price)) * 10) / 10;
            console.log(bidPrice + "+" + Neo.Fixed8.parse(price + ""))
            console.log(this.updatePrice)
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