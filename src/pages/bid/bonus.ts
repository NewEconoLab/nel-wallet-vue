import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, PageUtil } from '../../tools/entity';
@Component({
    components: {}
})
export default class Bonus extends Vue
{
    currentAddress: string;   //获取当前地址
    historyList: any; // 快照列表
    pageUtil: PageUtil;    //快照列表分页
    myBonusPageUtil: PageUtil;//我的分红历史分页
    isPage: boolean; // 是否显示快照分页
    isBonusPage: boolean; // 是否显示分红分页
    bonusList: any; // 我的分红列表
    constructor()
    {
        super();
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.historyList = null;
        this.bonusList = null;
        this.isPage = false;
        // this.pageMsg = "";
        this.initHistory(this.currentAddress, true);
        this.initBonusHistory(this.currentAddress, true);
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
            }
        }
        let list = res.list;
        if (list.length)
        {
            for (let i in list)
            {
                list[ i ].blocktime = tools.timetool.getTime(list[ i ].blocktime ? list[ i ].blocktime : "0");
            }
            this.historyList = list;
            let count = res.count;
            this.isPage = true
            count > this.pageUtil.pageSize ? this.isPage = true : this.isPage = false;
        }
    }
    //初始化History
    async initBonusHistory(address: string, first: boolean)
    {
        let res = null;
        if (!first) //判断是否为初始加载
        {
            res = await tools.wwwtool.getbonusbyaddress(address, this.pageUtil.currentPage, this.pageUtil.pageSize);
        } else
        {     //初始加载
            res = await tools.wwwtool.getbonusbyaddress(address, 1, 5);
            if (res)
            {
                this.myBonusPageUtil = new PageUtil(res.count, 5);
            }
        }
        let list = res.list;
        if (list.length)
        {
            for (let i in list)
            {
                list[ i ].blocktime = tools.timetool.getTime(list[ i ].blocktime ? list[ i ].blocktime : "0");
            }
            this.bonusList = list;
            let count = res.count;
            this.isBonusPage = true
            count > this.pageUtil.pageSize ? this.isPage = true : this.isPage = false;
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
            this.initHistory(this.currentAddress, false);
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
            this.initHistory(this.currentAddress, false);
        }
    }
    //翻页
    nextBonus()
    {
        if (this.myBonusPageUtil.currentPage == this.myBonusPageUtil.totalPage)
        {
            this.myBonusPageUtil.currentPage = this.myBonusPageUtil.totalPage;
        } else
        {
            this.myBonusPageUtil.currentPage += 1;
            this.initHistory(this.currentAddress, false);
        }
    }
    previousBonus()
    {
        if (this.myBonusPageUtil.currentPage <= 1)
        {
            this.myBonusPageUtil.currentPage = 1;
        } else
        {
            this.myBonusPageUtil.currentPage -= 1;
            this.initHistory(this.currentAddress, false);
        }
    }
}