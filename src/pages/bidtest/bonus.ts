import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, PageUtil } from '../../tools/entity';
@Component({
    components: {}
})
export default class BonusTest extends Vue
{
    currentAddress: string;   //获取当前地址
    historyList: any;
    pageUtil: PageUtil;    //分页
    isPage: boolean;
    pageMsg: string;        //页码提示
    firstLoad: boolean = true;  //是否初始加载
    constructor()
    {
        super();
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.historyList = null;
        this.isPage = false;
        this.pageMsg = "";
        this.initHistory(this.currentAddress, this.firstLoad);
    }
    //初始化History
    async initHistory(address: string, first: boolean)
    {
        let res = null;
        if (!first) //判断是否为初始加载
        {
            res = await tools.wwwtool.getbonushistbyaddress(address, this.pageUtil.currentPage, this.pageUtil.pageSize);
        } else
        {     //初始加载
            res = await tools.wwwtool.getbonushistbyaddress(address, 1, 5);
            if (res)
            {
                this.pageUtil = new PageUtil(res.count, 5);
                this.firstLoad = false;
            }
        }
        let list = res.list;
        if (list.length)
        {
            for (let i in list)
            {
                console.log(list[ i ].blocktime)
                list[ i ].blocktime = tools.timetool.getTime(list[ i ].blocktime ? list[ i ].blocktime : "0");
            }
            this.historyList = list;
            let count = res.count;
            this.isPage = true
            count > 5 ? this.isPage = true : this.isPage = false;
            let minNum = this.pageUtil.currentPage * this.pageUtil.pageSize - this.pageUtil.pageSize;
            let maxNum = this.pageUtil.totalCount;
            let diffNum = maxNum - minNum;
            if (diffNum > 5)
            {
                maxNum = this.pageUtil.currentPage * this.pageUtil.pageSize;
            }
            this.pageMsg = "History " + (minNum + 1) + " to " + maxNum + " of " + this.pageUtil.totalCount;
        }
    }

    //翻页
    next()
    {
        if (this.pageUtil.currentPage == this.pageUtil.totalPage)
        {
            this.pageUtil.currentPage = this.pageUtil.totalPage;
        } else
        {
            this.pageUtil.currentPage += 1;
            this.initHistory(this.currentAddress, this.firstLoad);
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
            this.initHistory(this.currentAddress, this.firstLoad);
        }
    }
}