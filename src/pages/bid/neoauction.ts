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
import { LocalStoreTool, sessionStoreTool } from "../../tools/storagetool";
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
    isshowToast: boolean;//是否显示toast
    regBalance: string;
    selectList: Object;
    alert_available: string;
    assetlist: object;
    alert_selection: string;
    alert_withdraw: NeoAuction_Withdraw;
    alert_TopUp: NeoAuction_TopUp;
    sessionWatting: LocalStoreTool;
    auctionPageSession: sessionStoreTool;
    myBalanceOfSelling: string;
    canAdded: boolean;
    checkState: number;
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
        this.regBalance = '0';
        let SGas = tools.coinTool.id_SGAS.toString();
        let Gas = tools.coinTool.id_GAS;
        this.selectList = {}
        this.selectList[ Gas ] = "Gas"
        this.selectList[ SGas ] = "SGas";
        this.alert_available = "";
        this.assetlist = {};
        this.checkState = 0;
        this.alert_withdraw = new NeoAuction_Withdraw();
        this.alert_TopUp = new NeoAuction_TopUp();
        this.sessionWatting = new LocalStoreTool("session_watting");
        this.auctionPageSession = new tools.sessionstoretool("auctionPage");
        if (this.auctionPageSession.select("show"))
        {
            this.auctionPage = true;
        } else
        {
            this.auctionPage = false;
        }
        this.canAdded = false;
        this.myBalanceOfSelling = "";
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
        this.domainInfo = item;
        this.auctionPageSession.put("domain", item.domain)
        this.auctionPageSession.put('show', true);
        this.auctionPage = !this.auctionPage
    }

    onBack(domain: string)
    {
        this.auctionPageSession.put('show', false);
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
     * 退回sgas
     */
    async withdraw()
    {
        let amount = parseFloat(this.alert_withdraw.input);
        this.alert_withdraw.watting = true;
        let res = await tools.nnssell.getMoneyBack(amount);
        if (!res.err)
        {
            this.openToast("success", amount + "" + this.$t("auction.successwithdraw2"), 4000);
            this.sessionWatting.put("withdraw", res.info);
            this.alert_withdraw.isShow = false;
            this.withdrawConfirm(res.info);
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
            if (txid)
            {
                this.sessionWatting.put("recharge-gas", { txid, amount });
                this.confirmRecharge(txid);
                this.openToast("success", "" + this.$t("auction.successtopup") + amount + "" + this.$t("auction.successtopup2"), 4000);
                this.alert_TopUp.isShow = false;
            } else
            {
                this.openToast("error", "" + this.$t("auction.fail"), 4000);
            }
        } else
        {
            try
            {
                let data = await tools.nnssell.rechargeReg(parseFloat(this.alert_TopUp.input).toFixed(8));
                let res = await tools.wwwtool.api_postRawTransaction(data);
                let txid = res[ "txid" ];
                this.sessionWatting.put("recharge-sgas", { txid, amount });
                this.confirmRecharge_sgas(txid)
                this.openToast("success", "" + this.$t("auction.successtopup") + amount + "" + this.$t("auction.successtopup2"), 4000);
                this.alert_TopUp.isShow = false;
            } catch (error)
            {
                this.openToast("error", "" + this.$t("auction.fail"), 4000);
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
            this.openToast("success", "" + this.$t("auction.successwithdraw"), 3000);
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
        if (/\./.test(this.alert_TopUp.input))
        {
            this.alert_TopUp.input = parseFloat((parseFloat(this.alert_TopUp.input)).toFixed(8)).toString();
        }
        let amount = Neo.Fixed8.parse(this.alert_TopUp.input);
        let balance = Neo.Fixed8.parse(this.assetlist[ this.alert_selection ] + "");

        if (balance.compareTo(amount) <= 0)
        {
            this.alert_TopUp.input = balance.toString();
            this.alert_TopUp.error = true;
        } else
        {
            this.alert_TopUp.error = false;
        }
    }

    /**
     * 验证退款金额是否合法
     */
    verifWithdraw()
    {
        if (/\./.test(this.alert_withdraw.input))
        {
            this.alert_withdraw.input = parseFloat((parseFloat(this.alert_withdraw.input)).toFixed(8)).toString();
        }
        let amount = Neo.Fixed8.parse(this.alert_withdraw.input);
        let balance = Neo.Fixed8.parse(this.regBalance);

        if (balance.compareTo(amount) <= 0)
        {
            this.alert_withdraw.input = balance.toString();
            this.alert_withdraw.error = true;
        } else
        {
            this.alert_withdraw.error = false;
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
        if (!!this.alert_myBid)
        {
            if (/\./.test(this.alert_myBid))
            {
                this.alert_myBid = parseFloat((parseFloat(this.alert_myBid)).toFixed(1)).toString();
            }
        }
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
        let res = await tools.nnssell.addprice(this.auctionMsg_alert.domain, Neo.Fixed8.parse(this.alert_myBid).getData().toNumber());
        if (!res.err)
        {
            this.openToast("success", "" + this.$t("auction.successbid2") + this.alert_myBid + "sgas ! ", 3000);
            this.auctionShow = !this.auctionShow;
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
                this.openToast("success", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.successbid"), 3000);
                this.getBidList(this.address);
                return;
            }
            if (names.length == 0)
            {
                this.openToast("error", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.failbid"), 3000);
                return;
            }
            if (names.includes("domainstate"))
            {
                this.openToast("error", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.failbid2"), 3000);
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
        this.openToast("success", "" + this.$t("auction.sendingmsg"), 3000);
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
            this.getBidList(this.address);
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
        this.domain = this.domain.toLowerCase();
        this.domain = this.domain.trim();
        let verify = /^[a-zA-Z0-9]{1,32}$/;
        if (!verify.test(this.domain))
        {
            this.checkState = 4;
            this.btn_start = 3;
            return;
        }
        let info: SellDomainInfo = await tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        //是否开始域名竞拍 0:未开始竞拍
        let sellstate = (info.startBlockSelling.compareTo(Neo.BigInteger.Zero));
        if (sellstate == 0)
        {
            this.btn_start = 1;
            this.checkState = this.btn_start;
            return;
        }
        //根据开标的区块高度获得开标的时间
        let startTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.startBlockSelling.toString()));
        let currentTime = new Date().getTime();
        let dtime = currentTime - startTime * 1000; //时间差值;
        // let state: number = res > 1500000 ? (res < 109500000 ? 0 : 3) : res < 900000 ? 1 : 2;
        //如果超过随机期
        if (dtime > 900000)
        {   //最大金额为0，无人加价，流拍数据，或者域名到期，都可以重新开标
            if (info.maxPrice.compareTo(Neo.BigInteger.Zero) == 0 || dtime > 109500000)  
            {
                this.checkState = this.btn_start = 1;
                return;
            }

            //判断是否已有结束竞拍的区块高度。如果结束区块大于零则状态为结束
            if (info.endBlock.compareTo(Neo.BigInteger.Zero) > 0)
            {
                this.checkState = this.btn_start = 3;
                return;
            }

            if (dtime > 1500000)    //如果大于结束时间则按钮不可点
            {
                this.checkState = this.btn_start = 3;
            } else
            {
                let lastTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.lastBlock.toString()));
                let dlast = lastTime - startTime;
                if (dlast < 900000)
                {
                    this.checkState = this.btn_start = 3;
                } else
                {
                    this.checkState = this.btn_start = 2
                }
            }
        } else
        {
            this.checkState = this.btn_start = 2
        }

    }

    /**
     * 等待交易确认
     * @param txid 交易id
     */
    async confirmRecharge(txid: string)
    {
        let res = await tools.wwwtool.getrechargeandtransfer(txid);
        let code = res[ "errCode" ];
        switch (code)
        {
            case '0000':    //成功
                this.openToast("success", "" + this.$t("auction.successtop"), 3000);
                this.alert_TopUp.watting = false;
                this.sessionWatting.delete("recharge-gas");
                return;
            case '3001':    //直接失败
                this.openToast("error", "" + this.$t("auction.fail"), 3000);
                this.alert_TopUp.watting = false;
                this.sessionWatting.delete("recharge-gas");
                return;
            case '3002':    //gas->sgas成功 注册器充值失败
                this.openToast("error", "" + this.$t("auction.failtopup"), 3000);
                this.alert_TopUp.watting = false;
                this.sessionWatting.delete("recharge-gas");
                return;
        }

        this.alert_TopUp.watting = true
        let amount = this.sessionWatting.select("recharge-gas")[ "amount" ];
        setTimeout(() =>
        {
            this.confirmRecharge(txid);
        }, 5000);
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