import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, PageUtil, MyBonus } from '../../tools/entity';
@Component({
    components: {}
})
export default class Bonus extends Vue
{
    currentAddress: string;   //获取当前地址
    // historyList: any; // 快照列表
    // pageUtil: PageUtil;    //快照列表分页
    myBonusPageUtil: PageUtil;//我的分红历史分页
    isPage: boolean; // 是否显示快照分页
    isBonusPage: boolean; // 是否显示分红分页
    bonusList: any; // 我的分红列表
    myBonus: string; // 我的分红
    isApplyBonus: number; // 是否可申请分红,0为不可申请，1为可申请，2为正在申请，3为已发放
    applyStatus: number;// 申请状态 0为可申请，1为申请中，2为不可申请
    totalSend: string = '0';//快照总量
    blocktime: string = '';//快照时间
    mybalance: string = '0';//我的持有金额
    constructor()
    {
        super();
        this.currentAddress = LoginInfo.getCurrentAddress();
        // this.historyList = null;
        this.bonusList = null;
        this.isPage = false;
        // this.pageUtil = new PageUtil(0, 5);
        this.myBonusPageUtil = new PageUtil(0, 5);
        this.isBonusPage = false;
        this.myBonus = '0';
        this.isApplyBonus = 0;
        this.initMyBonus(this.currentAddress);
        // this.initHistory(this.currentAddress, true);
        this.initBonusHistory(this.currentAddress, true);
    }
    // 我的分红
    async initMyBonus(address: string)
    {
        let res: MyBonus = await tools.wwwtool.getcurrentbonus(address);
        if (res)
        {
            this.myBonus = res.send;
            this.totalSend = res.totalSend;
            this.mybalance = res.balance;
            const time = parseInt(res.blocktime);
            this.blocktime = tools.timetool.getTime(time ? time : 0);
            if (res.txid != '')
            {
                this.myBonus = '0';
                this.isApplyBonus = 3;
            } else
            {
                if (res.applied)
                {
                    this.isApplyBonus = 2;
                } else
                {
                    this.isApplyBonus = 1;
                }

            }
        }
    }
    // 申请领取分红
    async toApplyBonus()
    {
        let res = await tools.wwwtool.applybonus(this.currentAddress);
        if (res.result)
        {
            this.applyStatus = 2;
        } else
        {
            this.applyStatus = 1;
        }
    }
    // //初始化History
    // async initHistory(address: string, first: boolean)
    // {
    //     let res = null;
    //     if (!first) //判断是否为初始加载
    //     {
    //         res = await tools.wwwtool.getbonushistbyaddress(address, this.pageUtil.currentPage, this.pageUtil.pageSize);
    //     } else
    //     {     //初始加载
    //         res = await tools.wwwtool.getbonushistbyaddress(address, 1, 5);
    //         if (res)
    //         {
    //             this.pageUtil = new PageUtil(res.count, 5);
    //         }
    //     }
    //     let list = res.list;
    //     if (list.length)
    //     {
    //         for (let i in list)
    //         {
    //             list[ i ].blocktime = tools.timetool.getTime(list[ i ].blocktime ? list[ i ].blocktime : "0");
    //         }
    //         this.historyList = list;
    //         let count = res.count;
    //         this.isPage = true
    //         count > this.pageUtil.pageSize ? this.isPage = true : this.isPage = false;
    //     }
    // }
    //初始化History
    async initBonusHistory(address: string, first: boolean)
    {
        let res = null;
        if (!first) //判断是否为初始加载
        {
            res = await tools.wwwtool.getbonusbyaddress(address, this.myBonusPageUtil.currentPage, this.myBonusPageUtil.pageSize);
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
            count > this.myBonusPageUtil.pageSize ? this.isPage = true : this.isPage = false;
        }
    }

    //翻页
    // next()
    // {
    //     if (this.pageUtil.currentPage == this.pageUtil.totalPage)
    //     {
    //         this.pageUtil.currentPage = this.pageUtil.totalPage;
    //     } else
    //     {
    //         this.pageUtil.currentPage += 1;
    //         this.initHistory(this.currentAddress, false);
    //     }
    // }
    // previous()
    // {
    //     if (this.pageUtil.currentPage <= 1)
    //     {
    //         this.pageUtil.currentPage = 1;
    //     } else
    //     {
    //         this.pageUtil.currentPage -= 1;
    //         this.initHistory(this.currentAddress, false);
    //     }
    // }
    //翻页
    nextBonus()
    {
        if (this.myBonusPageUtil.currentPage == this.myBonusPageUtil.totalPage)
        {
            this.myBonusPageUtil.currentPage = this.myBonusPageUtil.totalPage;
        } else
        {
            this.myBonusPageUtil.currentPage += 1;
            this.initBonusHistory(this.currentAddress, false);
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
            this.initBonusHistory(this.currentAddress, false);
        }
    }
}