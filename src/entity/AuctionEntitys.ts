import { DomainState } from "../tools/entity";
import { tools } from "../tools/importpack";

/**
 * 区块时间类
 */
export interface BlockTime
{
    blockindex: number; //区块高度
    blocktime: number;  //区块时间戳
    txid: string;       //交易id
}

/**
 * 加价地址类
 */
export interface AuctionAddress
{
    address: string;            //出价地址
    totalValue: number;         //累计出价金额
    lastTime: BlockTime;        //最后交易的时间
    accountTime: BlockTime,     //退币的时间
    getdomainTime: BlockTime,   //获得域名的时间
    addpricelist: BlockTime     //加价类列表
}

/**
 * 竞拍类
 */
export interface Auction
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
    startTime: string;
    btnState: auctionBtnState;
    //传入Auction初始化域名显示对象
    constructor(auction: Auction)
    {
        let addwho = auction.addwholist[ 0 ];
        this.id = auction.auctionId;
        this.domain = auction.fulldomain;
        this.maxBuyer = auction.maxBuyer;
        this.maxPrice = auction.maxPrice;
        this.startTime = tools.timetool.getTime(auction.startTime.blocktime);
        this.state = auction.auctionState;
        if (this.state == AuctionState.open)
        {
            this.state = AuctionState.fixed;
        }
        if (this.state == AuctionState.expire || this.state == AuctionState.pass)
        {
            this.state = AuctionState.end;
        }
        if (this.state == AuctionState.end)
        {
            if (auction.maxBuyer == addwho.address)
            {
                this.btnState = addwho.getdomainTime ? auctionBtnState.receivedname : auctionBtnState.getdomain;
            } else
            {
                this.btnState = addwho.accountTime ? auctionBtnState.receivedsgas : auctionBtnState.recoversgas;
            }
        } else
        {
            this.btnState = auctionBtnState.bid;
        }
    }
}

export class AuctionInfoView extends AuctionView
{
    totalValue: number;
    auction: Auction;
    constructor(auction: Auction)
    {
        super(auction);
        let addwho = auction.addwholist[ 0 ];
        this.totalValue = addwho.totalValue;
        this.auction = auction;
    }
}
export enum auctionBtnState
{
    bid, getdomain, recoversgas, receivedsgas, receivedname
}