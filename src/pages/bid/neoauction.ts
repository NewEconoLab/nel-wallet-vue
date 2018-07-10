import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import Selected from "../../components/Selected.vue";
import AuctionInfo from "./auctioninfo.vue";
import Toast from "../../components/toast.vue";
import { tools } from "../../tools/importpack";
import { MyAuction, SellDomainInfo, LoginInfo, ResultItem, DataType, NeoAuction_Withdraw, NeoAuction_TopUp } from "../../tools/entity";
import { NeoaucionData } from "../../tools/datamodel/neoauctionDataModel";
import { LocalStoreTool } from "../../tools/storagetool";
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner,
        "auction-info": AuctionInfo,
        "v-toast": Toast,
        "v-selected": Selected
    }
})
export default class NeoAuction extends Vue
{
    auctionShow: boolean; //竞拍弹框
    auctionPage: boolean;//竞拍查看详情，默认
    auctionMsg_alert: MyAuction;
    alert_myBid: string;
    address: string;
    myAuctionList: MyAuction[] = [];
    domainInfo: MyAuction[] = [];
    domain: string;
    btn_start: number;
    isWithdraw: boolean;//退款
    isTopUp: boolean;//充值
    isshowToast: boolean;//是否显示toast
    regBalance: string;
    selectList: Object;
    alert_available: string;
    assetlist: object;
    alert_input: string;
    alert_selection: string;
    alert_toup_wait: number;
    alert_withdraw_input: string;
    alert_withdraw: NeoAuction_Withdraw;
    alert_TopUp: NeoAuction_TopUp;
    sessionWatting: LocalStoreTool
    myBalanceOfSelling: string;
    canAdded: boolean;
    openToast: Function;

    constructor()
    {
        super();
        this.btn_start = 1;
        this.auctionShow = false;
        this.auctionPage = false;
        this.auctionMsg_alert = new MyAuction();
        this.myAuctionList = [];
        this.domainInfo = [];
        this.domain = "";
        this.alert_myBid = "";
        this.address = LoginInfo.getCurrentAddress();
        this.isWithdraw = false;
        this.isTopUp = false;
        this.regBalance = '0';
        let SGas = tools.coinTool.id_SGAS.toString();
        let Gas = tools.coinTool.id_GAS;
        this.selectList = {}
        this.selectList[ Gas ] = "Gas"
        this.selectList[ SGas ] = "SGas";
        this.alert_available = "";
        this.assetlist = {};
        this.alert_input = "";
        this.alert_toup_wait = 0;
        this.alert_withdraw = new NeoAuction_Withdraw();
        this.alert_TopUp = new NeoAuction_TopUp();
        this.sessionWatting = new LocalStoreTool("session_watting");
        this.canAdded = false;
        this.myBalanceOfSelling = "";
        tools.nnstool.initRootDomain("neo");
    }

    async mounted()
    {
        await tools.nnstool.initRootDomain("neo");
        this.regBalance = await tools.nnssell.getBalanceOf();
        this.assetlist = await NeoaucionData.getAssetBalance();
        this.openToast = this.$refs.toast[ "isShow" ];
        this.getBidList(this.address);
    }

    /**
     * 获得参与过竞拍的域名列表
     * @param address 地址
     */
    async getBidList(address)
    {
        this.myAuctionList = await NeoaucionData.getBidList(address);
    }

    /**
     * 显示竞拍详情
     * @param item 域名的竞拍信息
     */
    onGoBidInfo(item)
    {
        this.auctionPage = !this.auctionPage
        this.domainInfo = item;
    }

    onBack()
    {
        this.auctionPage = false;
    }

    /**
     * 充值注册器时的资产选择
     * @param key 资产id
     */
    async onSelect(key)
    {
        let str = (key == tools.coinTool.id_GAS ? this.assetlist[ key ] + " Gas" : this.assetlist[ key ] + " SGas");
        this.alert_available = str;
        this.alert_selection = key
    }

    /**
     * 退回sgas
     */
    async withdraw()
    {
        let amount = parseFloat(this.alert_withdraw.input);
        this.alert_withdraw.watting = true;
        let res = await tools.nnssell.getMoneyBack(amount);
        if (!res.err)
        {
            this.sessionWatting.put("withdraw", res.info);
            this.withdrawConfirm(res.info);
        }
    }

    /**
     * 充值到注册器
     */
    async openTopUp()
    {
        this.alert_TopUp.isShow = true;
        let gasRecharge = this.sessionWatting.select("recharge-gas");
        let sgasRecharge = this.sessionWatting.select("recharge-sgas");
        if (gasRecharge)
        {
            let txid = gasRecharge[ "txid" ];
            this.confirmRecharge(txid);
        }
        if (sgasRecharge)
        {
            let amount = sgasRecharge[ "amount" ];
            let txid = sgasRecharge[ "txid" ];
            let res = await tools.wwwtool.getrawtransaction(txid);
            if (!res)
            {
                this.assetlist[ tools.coinTool.id_SGAS.toString() ] = -amount;
            } else
            {
                this.sessionWatting.delete("rescharge-sgas");
            }
        }
    }

    /**
     * 从注册器退币
     */
    async openWithdraw()
    {
        let wat = this.sessionWatting.select("withdraw");
        this.alert_withdraw.isShow = true;
        if (wat)
        {
            let res = await tools.wwwtool.getrawtransaction(wat);
            if (!!res)
            {
                this.alert_withdraw.watting = false;
                this.sessionWatting.delete("withdraw");
            } else
            {
                this.alert_withdraw.watting = true;
                this.withdrawConfirm(wat);
            }
        }

    }

    /**
     * 注册器退币确认
     * @param txid 交易id
     */
    async withdrawConfirm(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            this.openToast("success", "退款成功", 3000);
            this.alert_withdraw.watting = false;
            this.sessionWatting.delete("withdraw");
            return;
        }
        else
        {
            setTimeout(() =>
            {
                this.withdrawConfirm(txid);
            }, 5000)
        }
    }

    /**
     * 验证充值金额
     */
    verifToupAmount()
    {
        let amount = Neo.Fixed8.parse(this.alert_TopUp.input);
        let balance = Neo.Fixed8.parse(this.assetlist[ this.alert_selection ] + "");
        if (balance.compareTo(amount) < 0)
        {
            this.alert_TopUp.input = balance.toString();
        }
    }

    /**
     * 验证退款金额是否合法
     */
    verifWithdraw()
    {
        let amount = Neo.Fixed8.parse(this.alert_withdraw.input);
        let balance = Neo.Fixed8.parse(this.regBalance);
        if (balance.compareTo(amount) < 0)
        {
            this.alert_withdraw.input = balance.toString();
        }
    }

    /**
     * 显示加价弹框
     */
    async addBid()
    {
        let msg = await tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        let auction = new MyAuction();
        let time = await tools.wwwtool.api_getBlockInfo(msg.startBlockSelling.toInt32());
        auction.startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time * 1000));
        auction.maxBuyer = msg.maxBuyer ? msg.maxBuyer.toString() : "";
        auction.maxPrice = msg.maxPrice.divide(100000000).toString();
        auction.domain = this.domain + ".neo";
        auction.balanceOfSelling = msg.balanceOfSelling.divide(100000000).toString();
        this.myBalanceOfSelling = auction.balanceOfSelling;
        this.auctionMsg_alert = auction;
        this.auctionShow = !this.auctionShow;
    }

    verifBidAmount()
    {
        let myBid = !!this.alert_myBid ? parseFloat(this.alert_myBid) : 0;
        let amount = (parseFloat(this.auctionMsg_alert.balanceOfSelling) + myBid);
        this.myBalanceOfSelling = amount.toString();
        if (amount > parseFloat(this.auctionMsg_alert.maxPrice))
        {
            this.canAdded = true;
        } else { this.canAdded = false; }
    }

    /**
     * 加价
     */
    async bidDomain()
    {
        // let data1 = tools.nnssell.rechargeReg(this.alert_myBid);
        let res = await tools.nnssell.addprice(this.auctionMsg_alert.domain, Neo.Fixed8.parse(this.alert_myBid).getData().toNumber());
        // let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
        if (!res.err)
        {
            this.openToast("success", "Successesfully BidDomain " + this.alert_myBid + "sgas ! ", 3000);
            NeoaucionData.setBidSession(this.auctionMsg_alert, this.alert_myBid, res.info);
            this.bidConfirm(res.info, this.auctionMsg_alert.domain);
        } else
        {
            console.log(res.info);

        }
    }

    /**
     * 加价信息确认
     * @param txid 交易id
     * @param domain 域名
     */
    async bidConfirm(txid: string, domain: string)
    {
        let session_bid = new tools.localstoretool("bidSession");
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            session_bid.delete(domain, txid);
            let names = await tools.contract.getNotifyNames(txid);
            let have = names.includes("addprice");
            if (have)
            {
                this.openToast("success", "域名：" + domain + " 加价成功", 3000);
                return;
            }
            if (names.length == 0)
            {
                this.openToast("error", "域名：" + domain + " 加价失败", 3000);
                return;
            }
            if (names.includes("domainstate"))
            {
                this.openToast("error", "您结束了" + domain + " 的加价，本次加价未执行", 3000);
            }
        } else
        {
            setTimeout(() =>
            {
                this.bidConfirm(txid, domain)
            }, 5000);
        }
    }

    /**
     * 开标
     */
    async openAuction()
    {
        this.btn_start = 0;
        let res = await tools.nnssell.wantbuy(this.domain);
        let auction = new MyAuction();
        auction.domain = this.domain + ".neo";
        auction.startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        auction.auctionState = '3';
        auction.maxPrice = "0";
        this.myAuctionList.unshift(auction);
        NeoaucionData.setOpenSession(auction);
        await this.openAuction_confirm(res[ "info" ]);
        this.openToast("success", "开标成功请等待", 3000);
        this.btn_start = 1;
        // this.auctionShow = !this.auctionShow;
    }

    /**
     * 开标
     * @param txid 交易id
     */
    async openAuction_confirm(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            this.btn_start = 2;
            this.addBid();
            return;
        }
        else
        {
            setTimeout(() =>
            {
                this.openAuction_confirm(txid);
            }, 5000)
        }
    }

    /**
     * 查询域名状态
     */
    async queryDomainState()
    {
        let info: SellDomainInfo = await tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        //是否开始域名竞拍 0:未开始竞拍
        let sellstate = (info.startBlockSelling.compareTo(Neo.BigInteger.Zero));
        if (sellstate > 0)
        {
            if (info.endBlock.compareTo(Neo.BigInteger.Zero) > 0)
            {
                this.btn_start = info.maxPrice.compareTo(Neo.BigInteger.Zero) > 0 ? 3 : 1;
                return;
            }
            //根据开标的区块高度获得开标的时间
            let startTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.startBlockSelling.toString()));
            let state = tools.nnssell.compareTime(startTime * 1000);   //对比时间获得状态 0:竞拍结束，1：正在竞拍，2:随机时间
            switch (state)
            {
                case 0:
                    this.btn_start = info.maxPrice.compareTo(Neo.BigInteger.Zero) > 0 ? 3 : 1;
                    break;
                case 1:
                    this.btn_start = 2;
                    break;
                case 2:
                    this.btn_start = 2;
                    break;
                default:
                    break;
            }
        } else
        {
            this.btn_start = 1;
        }

    }

    /**
     * gas->sgas->充值注册器
     */
    async gasToRecharge()
    {
        let amount = this.alert_TopUp.input;
        this.alert_TopUp.watting = true;
        if (this.alert_selection == tools.coinTool.id_GAS)
        {
            let txid = await tools.nnssell.gasToRecharge(parseFloat(this.alert_TopUp.input));
            this.sessionWatting.put("recharge-gas", { txid, amount });
            this.confirmRecharge(txid);
            if (txid)
            {
            }
            this.openToast("success", "Successesfully toped up ! 100 SGas will be in your auction account after 2 blocks are confirmed !", 4000);
            this.isTopUp = false;
        } else
        {
            try
            {
                let data = await tools.nnssell.rechargeReg(parseFloat(this.alert_TopUp.input).toFixed(8));
                let res = await tools.wwwtool.api_postRawTransaction(data);
                let txid = res[ "txid" ];
                this.sessionWatting.put("recharge-sgas", { txid, amount });
                this.confirmRecharge_sgas(txid)
                this.openToast("success", "Successesfully toped up ! 100 SGas will be in your auction account after a block is confirmed !", 4000);
                this.isTopUp = false;
            } catch (error)
            {
                this.openToast("error", "Successesfully toped up ! 100 SGas will be in your auction account after a block is confirmed !", 4000);
            }
        }
    }

    /**
     * 等待交易确认
     * @param txid 交易id
     */
    async confirmRecharge(txid: string)
    {
        let res = await tools.wwwtool.getrechargeandtransfer(txid);
        if (res[ 'errCode' ] == '3003')
        {
            this.alert_TopUp.watting = true
            let amount = this.sessionWatting.select("recharge-gas")[ "amount" ];
            // this.assetlist[ tools.coinTool.id_GAS ] -= parseFloat(amount);
            setTimeout(() =>
            {
                this.confirmRecharge(txid);
            }, 5000)
        } else
        {
            this.alert_TopUp.watting = false;
            this.sessionWatting.delete("recharge-gas");
        }
        console.log(res);
    }

    /**
     * 等待sgas退币确认
     * @param txid 交易id
     */
    async confirmRecharge_sgas(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (res)
        {
            console.log(res);

        } else
        {
            setTimeout(() =>
            {
                this.confirmRecharge(txid);
            }, 5000)
        }
        console.log(res);
    }

}