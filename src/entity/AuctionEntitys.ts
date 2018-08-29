import { DomainState, LoginInfo, SellDomainInfo } from "../tools/entity";
import { tools } from "../tools/importpack";
import { services } from "../services/index";

/**
 * 区块时间类
 */
export class BlockTime
{
    blockindex: number; //区块高度
    blocktime: number;  //区块时间戳
    txid: string;       //交易id
}

/**
 * 加价地址类
 */
export class AuctionAddress
{
    address: string;            //出价地址
    totalValue: number;         //累计出价金额
    lastTime: BlockTime;        //最后交易的时间
    accountTime: BlockTime;     //退币的时间
    getdomainTime: BlockTime;   //获得域名的时间
    addpricelist: BlockTime;     //加价类列表

    constructor(addres: string, totalValue: number)
    {
        this.address = addres;
        this.totalValue = totalValue;
    }
}

/**
 * 竞拍类
 */
export class Auction
{
    auctionId: string;              //竞拍会id
    domain: string;                 //二级域名 string
    parenthash: string;             //父域名 hash
    fulldomain: string;             //全域名 string
    domainTTL: string;              //域名结束时间 TTL (占时别使用)
    auctionState: AuctionState;     //域名竞拍状态
    startTime: BlockTime;           //竞拍开始时间 BlockTime
    startAddress: string;           //开标地址
    maxPrice: number;               //最大竞标出价
    maxBuyer: string;               //最大出价者
    endTime: BlockTime;             //结束时间 (五天后自动结束则为空)
    endAddress: string;             //结束地址 (五天后自动结束则为空)
    lastTime: BlockTime;            //最后出价时间
    addwholist: AuctionAddress[];   //加价地址类列表
    addWho: AuctionAddress;

    constructor()
    {
    }
    parse(json: any, address)
    {
        if (typeof json == 'string') { }
        if (typeof json == 'object')
        {
            this.auctionId = json[ "auctionId" ];
            this.fulldomain = json[ "fulldomain" ];
            this.domain = json[ "domain" ];
            this.parenthash = json[ "parenthash" ];
            this.domainTTL = json[ "domainTTL" ];
            this.auctionState = json[ "auctionState" ];
            this.startTime = json[ "startTime" ];
            this.startAddress = json[ "startAddress" ];
            this.maxBuyer = json[ "maxBuyer" ];
            this.maxPrice = json[ "maxPrice" ];
            this.endTime = json[ "endTime" ];
            this.endAddress = json[ "endAddress" ];
            this.lastTime = json[ "lastTime" ];
            this.addwholist = json[ "addwholist" ];
            if (this.addwholist)
            {
                this.addWho = this.addwholist.find(addWho =>
                {
                    return addWho.address == address;
                })
            }
        }
    }

    formAuctionInfo(auction: SellDomainInfo)
    {
        this.auctionId = auction.id.toString();
        this.maxBuyer = ThinNeo.Helper.GetAddressFromScriptHash(auction.maxBuyer);
        this.maxPrice = accDiv(auction.maxPrice.toString(), 10000000);
        this.fulldomain = auction.domain;


    }
}

/**
 * 竞拍状态枚举类
 */
export enum AuctionState
{
    watting = '0001', //等待期
    open = '0101',    //开标期
    fixed = '0201',   //确定期
    random = '0301',  //随机期
    end = '0401',     //结束期
    pass = '0501',    //流标期
    expire = '0601',  //过期期
}

/**
 * 竞拍列表显示类
 */
export class AuctionView
{
    id: string;
    domain: string;
    state: AuctionState;
    maxPrice: number;               //最大竞标出价
    maxBuyer: string;               //最大出价者
    startTimeStr: string;
    btnState: auctionBtnState;
    addwho: AuctionAddress;
    startTime: BlockTime;
    lastTime: BlockTime;
    endTime: BlockTime;
    //传入Auction初始化域名显示对象
    constructor(auction: Auction)
    {
        let currentAddress = LoginInfo.getCurrentAddress();
        if (!auction.addwholist)
        {
            this.addwho = new AuctionAddress(currentAddress, 0);
        } else
        {
            for (let index = 0; index < auction.addwholist.length; index++)
            {
                const addrwho = auction.addwholist[ index ];
                if (addrwho.address == currentAddress)
                {
                    this.addwho = addrwho;
                }
            }
        }
        this.id = auction.auctionId;
        this.domain = auction.fulldomain;
        this.maxBuyer = auction.maxBuyer;
        this.maxPrice = auction.maxPrice ? auction.maxPrice : 0;
        this.startTime = auction.startTime;
        this.endTime = auction.endTime;
        this.lastTime = auction.lastTime;
        this.startTimeStr = tools.timetool.getTime(auction.startTime.blocktime);
        this.state = auction.auctionState;
        // if (this.state == AuctionState.open){  this.state = AuctionState.fixed;      }
        if (this.state == AuctionState.expire || this.state == AuctionState.pass)
        {
            this.state = AuctionState.end;
        }
        if (this.state == AuctionState.end)
        {
            if (auction.maxBuyer == this.addwho.address)
            {
                this.btnState = this.addwho.getdomainTime ? auctionBtnState.receivedname : auctionBtnState.getdomain;
            } else
            {
                this.btnState = this.addwho.accountTime ? auctionBtnState.receivedsgas : auctionBtnState.recoversgas;
            }
        } else
        {
            this.btnState = auctionBtnState.bid;
        }
    }
}

/**
 * 加价详情显示类
 */
export class AuctionInfoView extends AuctionView
{
    process: Process;
    constructor(auction: Auction)
    {
        super(auction);
        this.process = services.auctionInfo.getProcess(this);
    }
}
/**
 * 按钮状态 状态 ENUM
 */
export enum auctionBtnState
{
    bid, getdomain, recoversgas, receivedsgas, receivedname
}

/**
 * 时间轴类
 */
export class Process
{

    timearr: Array<{
        msg: string;
        date: string;
        time: string;
    }>;
    state: AuctionState;
    startTime: number;
    width: number;
    date: string;
    time: string;

    constructor(start: number | string)
    {
        this.timearr = [];
        this.startTime = typeof start == "string" ? tools.timetool.currentTime(start) : start as number;
        let startdate = tools.timetool.getDate(this.startTime);
        this.date = tools.timetool.dateFtt("yyyy/MM/dd", startdate);
        this.time = tools.timetool.dateFtt("hh:mm:ss", startdate);
        this.width = 0;
        for (let i = 1; i <= 5; i++)
        {
            let element = { msg: "", date: "", time: "" };
            switch (i)
            {
                case 1:
                    element.msg = "1"
                    break;
                case 3:
                    element.msg = "2"
                    break;
                case 5:
                    element.msg = "3"
                    break;
                default:
                    break;
            }
            let time = this.startTime + 300 * i;

            let date = tools.timetool.dateFtt("yyyy/MM/dd", tools.timetool.getDate(time));
            let times = tools.timetool.dateFtt("hh:mm:ss", tools.timetool.getDate(time));
            element.date = date;
            element.time = times;
            this.timearr.push(element);
        }

    }
}