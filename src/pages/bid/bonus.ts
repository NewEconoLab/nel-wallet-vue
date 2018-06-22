import Vue from "vue";
import { Component } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, PageUtil } from '../../tools/entity';
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner
    }
})
export default class Bonus extends Vue
{
    currentAddress: string;   //获取当前地址
    claimNum: string;
    isClaim: boolean;    //控制claim按钮，默认false为显示
    claimState: number;      //claim的状态，默认为1
    historyList: any;
    pageUtil: PageUtil;    //分页
    isPage: boolean;
    pageMsg: string;        //页码提示

    constructor()
    {
        super();
        //this.currentAddress = LoginInfo.getCurrentAddress();
        this.currentAddress = 'AeYiwwjiy2nKXoGLDafoTXc1tGvfgUuKdY';
        this.claimNum = '0';
        this.isClaim = false;
        this.claimState = 1;
        this.historyList = null;
        this.isPage = false;
        this.pageMsg = "";
        this.initHistory(this.currentAddress);
    }
    async mounted()
    {
        this.getClaimNum();
    }
    //初始化History
    async initHistory(address: string)
    {
        let res = await tools.wwwtool.api_getbonushistbyaddress(address, 1, 5);
        let list = res.list;
        if (list.length)
        {
            for (let i in list)
            {
                list[ i ].blocktime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(list[ i ].blocktime * 1000));
            }
            this.historyList = list;
            let count = res.count;
            this.isPage = true
            count > 5 ? this.isPage = true : this.isPage = false;
            this.pageUtil = new PageUtil(count, 5);
            // this.pageUtil = new PageUtil(20, 5);
            this.pageMsg = "History " + this.pageUtil.currentPage + " to 5 of " + this.pageUtil.totalCount;
        }

    }
    //获取claimNumber
    async getClaimNum()
    {
        let res = await tools.sgastool.canClaimCount();
        this.claimNum = res;
        console.log(res);
    }
    //提取claim
    async getClaim()
    {
        this.isClaim = true;
        this.claimState = 1;
        let txid = await tools.sgastool.claim();
        console.log(txid);
        this.checkClaim(txid);
    }
    //提取claim过程
    async checkClaim(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        console.log(res);
        if (res)
        {
            this.checkClaimAgain(txid);
        } else
        {
            setTimeout(async () =>
            {
                this.claimState = 2;
                this.checkClaim(txid);
            }, 10000);
        }
    }
    async checkClaimAgain(txid)
    {
        let res = await tools.wwwtool.getnep5transferbytxid(txid);
        console.log("nep5 tran----------")
        console.log(res);
        if (res)
        {
            this.isClaim = false;
            this.claimState = 4;
            this.getClaimNum();
        } else
        {
            setTimeout(async () =>
            {
                this.claimState = 3;
                this.checkClaimAgain(txid);
            }, 10000);
        }
    }

    async getHistory(address: string, pageUtil: PageUtil)
    {
        let res = await tools.wwwtool.api_getbonushistbyaddress(address, pageUtil.currentPage, pageUtil.pageSize);
        let list = res.list;
        for (let i in list)
        {
            list[ i ].blocktime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(list[ i ].blocktime * 1000));
        }
        this.historyList = list;
        let minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
        let maxNum = pageUtil.totalCount;
        let diffNum = maxNum - minNum;
        if (diffNum > 5)
        {
            maxNum = pageUtil.currentPage * pageUtil.pageSize;
        }
        this.pageMsg = "History " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
    }

    //排行翻页
    next()
    {
        if (this.pageUtil.currentPage == this.pageUtil.totalPage)
        {
            this.pageUtil.currentPage = this.pageUtil.totalPage;
        } else
        {
            this.pageUtil.currentPage += 1;
            this.getHistory(this.currentAddress, this.pageUtil);
        }
    }
    previous()
    {
        if (this.pageUtil.currentPage <= 1)
        {
            this.pageUtil.currentPage = 1;
        } else
        {
            this.pageUtil.currentPage -= 1;
            this.getHistory(this.currentAddress, this.pageUtil);
        }
    }
}