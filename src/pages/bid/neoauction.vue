<template>
    <div class="box-warp">
        <div class="page-one" v-if="!auctionPage">
            <div class="tips-box">
              {{$t('auction.tipsmsg1')}}<br/>
              <ol>
                <li>{{$t('auction.tipsmsg2')}}</li>
                <li>{{$t('auction.tipsmsg3')}}</li>
              </ol>
            </div>
            <div class="title">
              <span>{{$t('auction.titleaccount')}}</span>
            </div>
            <div class="form-box pall">
              <div class="msg-list">
                <div class="sgas-count">
                  <span>SGas</span><span class="num"> {{regBalance}}</span>
                </div>
              </div>
              <div class="btn-right">
                    <button class="btn btn-nel btn-big" @click="openWithdraw">{{$t('btn.withdraw')}}</button>
                    <button class="btn btn-nel btn-big" @click="openTopUp">{{$t('btn.topup')}}</button>
                </div> 
            </div>
            <div class="title">
                <span>{{$t('auction.title1')}}</span>
            </div>
            <div class="form-box ptop">
                <div class="input-box" >
                    <input type="text" :placeholder="$t('auction.entername')" v-model="domain" @input="queryDomainState">
                    <span>.neo</span>
                </div>
                <spinner-wrap v-if="btn_start==0" style="margin-left:20px"></spinner-wrap>
                <button v-if="btn_start==1" class="btn btn-nel btn-big" @click="openAuction">{{$t('btn.openauction')}}</button>
                <button v-if="btn_start==2" class="btn btn-nel btn-big" @click="addBid">{{$t('btn.newbid')}}</button>
                <button v-if="btn_start==3" class="btn btn-nel btn-big btn-disable" disabled="disabled">{{$t('btn.newbid')}}</button>
                <!-- <span class="waiting-msg">{{$t('auction.sendingmsg')}}</span> -->
                <div v-if="checkState==1" class="msg-box status-being">
                    <img src="../../../static/img/correct.svg" alt="">
                    <span>{{$t('auction.checkavailable')}}</span>
                </div>
                <div v-if="checkState==2" class="msg-box status-being">
                    <img src="../../../static/img/correct.svg" alt="">
                    <span>{{$t('auction.checkbeing')}}</span>
                </div>
                <div v-if="checkState==3" class="msg-box status-ended">
                    <span>{{$t('auction.checkbuyer')}}</span>
                </div>
                <div v-if="checkState==4" class="msg-box status-ended">
                    <span>{{$t('auction.checkformat')}}</span>
                </div>
            </div>
            <div class="title">
                <span>{{$t('auction.title2')}}</span>
                <div class="seach-box">
                    <input type="search" name="" id="" :placeholder="$t('auction.searchmsg')">
                    <img src="../../../static/img/seach.png" alt="">
                </div>
            </div>
            <div class="form-box mbottom" v-if="myAuctionList" v-for="(item,index) in myAuctionList" :key="index">
                <div class="msg-list">
                    <div class="msg-neoname">
                        {{item.domain}}
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='1'">
                        {{$t('auction.status')}} : <span class="status-being">{{$t('auction.fixedperiod')}}</span>
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='2'">
                        {{$t('auction.status')}} : <span class="status-random">{{$t('auction.randomperiod')}}</span>
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='3'">
                        {{$t('auction.status')}} : <span class="status-random">{{$t('auction.waiting')}}</span>
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='0'">
                        {{$t('auction.status')}} : <span class="status-ended">{{$t('auction.ended')}}</span>
                    </div>
                    <div class="msg-price">
                        {{$t('auction.lastauctionprice')}} : <span>{{item.maxPrice}}</span> SGas
                    </div>
                    <div class="msg-bidder" v-if="item.maxBuyer != address">
                        {{item.auctionState>0?$t('auction.currentbidder'):$t('auction.buyer') }} : <span>{{$t('auction.other')}} （ {{item.maxBuyer}} ）</span>
                    </div>
                    <div class="msg-bidder" v-if="item.maxBuyer == address">
                        {{item.auctionState>0?$t('auction.currentbidder'):$t('auction.buyer') }}  : <span class="bidder-me">{{$t('auction.me')}} （ {{address}} ）</span>
                    </div>
                    <div class="msg-time">
                        {{$t('auction.bidstarttimemsg')}} : <span>{{item.startAuctionTime}}</span>
                    </div>
                    <div v-if="item.bidListSession" v-for="(value,key) in item.bidListSession" :key="key">
                      {{value}}
                    </div>
                </div>
                <div class="btn-right">
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='1'||item.auctionState=='2'" @click="onGoBidInfo(item)">{{$t('btn.bid')}}</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='0' && item.maxBuyer==address && item.receivedState==0" @click="onGoBidInfo(item)">{{$t('btn.getdomain')}}</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='0' && item.maxBuyer!=address && item.receivedState==0" @click="onGoBidInfo(item)">{{$t('btn.recoversgas')}}</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='0' && item.maxBuyer!=address && item.receivedState>0" @click="onGoBidInfo(item)">{{$t('btn.receivedsgas')}}</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='0' && item.maxBuyer==address && item.receivedState>0" @click="onGoBidInfo(item)">{{$t('btn.receivednns')}}</button>
                </div>
            </div>
        </div>
        <auction-info v-if="auctionPage" @onBack="onBack" :item="domainInfo"></auction-info>
        <div class="auction-wrap" v-if="auctionShow">
          <div class="auction-box">
            <div class="auction-title">{{$t('auction.acutiontitle')}}</div>
            <div class="wrap-msg">
              <div class="domain-name">{{$t('auction.domain')}} : {{auctionMsg_alert.domain}}</div>
              <div class="auction-status">{{$t('auction.status')}} : <span class="status-being">Fixed period （ 47:56:30 ）</span> </div>
              <div class="auction-price">{{$t('auction.highest')}} : {{auctionMsg_alert.maxPrice}} SGas</div>
            </div>
            <div class="wrap-msg">
              <div class="my-bid">
                <span>{{$t('auction.raisebid')}} : </span>
                <input class="bid-input" type="number" :placeholder="$t('auction.enterbid')" v-model="alert_myBid" @input="verifBidAmount">
              </div>
              <div class="my-bid">
                {{$t('auction.yourbidmsg')}} : <span class="status-ended">{{myBalanceOfSelling}}</span> SGas
              </div>
            </div>
            <div class="tips-msg">
              {{$t('auction.tips1')}}
            </div>
            <div class="btn-bid-box">
              <button v-if="canAdded" class="btn btn-nel btn-big" @click="bidDomain()" >{{$t('btn.bid')}}</button>
              <button v-else class="btn btn-nel btn-big btn-disable" disabled="disabled" >{{$t('btn.bid')}}</button>
            </div>
            <div class="auction-close">
              <span aria-hidden="true" @click="auctionShow = !auctionShow">&times;</span>
            </div>
          </div>
        </div>
        <div class="top-up-wrap" v-if="alert_TopUp.isShow">
          <div class="top-up-box">
            <div class="topup-title">
              <span>{{$t('auction.topup')}}</span>
            </div>
            <div class="asset-wrap">
              <div class="asset-name">{{$t('auction.asset')}} :</div>
              <v-selected :list="selectList" @selected="onSelect"></v-selected>
              <div class="asset-available">
                  <span>{{alert_available}} {{$t('auction.errmsg3')}}</span>
              </div>
            </div>
            <div class="amount-wrap">
              <div class="amount-msg">{{$t('auction.amount')}}:</div>
              <div class="input-box">
                <input type="number" :placeholder="$t('auction.amount')" v-model="alert_TopUp.input" @input="verifToupAmount">
                <button v-if="!alert_TopUp.watting" class="btn btn-nel btn-big" @click="gasToRecharge">{{$t('btn.confirm')}}</button>
                <spinner-wrap v-else ></spinner-wrap>
              </div>
              <div v-if="alert_TopUp.error" class="status-ended err-msg">
                {{$t('auction.errmsg1')}} {{alert_available}} {{$t('auction.errmsg3')}}.
              </div>
            </div>
            <div class="topup-tips">
              {{$t('auction.tipsmsg4')}}
            </div>
            <div class="topup-close" @click="alert_TopUp.isShow=!alert_TopUp.isShow">
              <span aria-hidden="true" >&times;</span>
            </div>
          </div>
        </div>
        <div class="withdraw-wrap" v-if="alert_withdraw.isShow">
          <div class="withdraw-box">
            <div class="withdraw-title">
              <span>{{$t('auction.withdraw')}}</span>
            </div>
            <div class="line-wrap">
              <div class="line-msg">{{$t('auction.to')}} :</div>
              <div class="line-box">
                <input type="text" :value="$t('auction.yourbalance')" class="readonly-input" disabled>
              </div>
            </div>
            <div class="line-wrap">
              <div class="line-msg">{{$t('auction.amount')}}:</div>
              <div class="line-box">
                <input type="number" :placeholder="$t('auction.amount')" v-model="alert_withdraw.input" @input="verifWithdraw">
                <spinner-wrap v-if="alert_withdraw.watting"></spinner-wrap>
                <button v-else class="btn btn-nel btn-big" @click="withdraw">{{$t('btn.confirm')}}</button>
              </div>
              <div v-if="alert_withdraw.error" class="status-ended err-msg">
                {{regBalance}} SGas {{$t('auction.errmsg3')}}.
              </div>
            </div>
            <div class="withdraw-close" @click="alert_withdraw.isShow=!alert_withdraw.isShow">
              <span aria-hidden="true" >&times;</span>
            </div>
          </div>
        </div>
        <!-- <v-toast type="error" msg="Top up failed ! And your 100 GAS has been exchanged into 100 SGAS !"></v-toast> -->
        <v-toast ref="toast" ></v-toast>
        <!-- <v-toast type="error" msg="Operation failed !"></v-toast> -->
    </div>
</template>
<script lang="ts" src="./neoauction.ts">
</script>
<style lang="less" scoped>
.box-warp {
  width: 100%;
  .status-being {
    color: #2dde4f;
  }
  .status-random {
    color: #f5a158;
  }
  .status-ended {
    color: #ff6a6a;
  }
  .bidder-me {
    color: #198cee;
  }
  button {
    &.btn-disable {
      background: #77bcf6;
      opacity: 1;
    }
  }
  .page-one {
    .tips-box {
      margin-top: 50px;
      font-size: 14px;
      color: #c5c5c5;
    }
    .title {
      .seach-box {
        background: #151a1e;
        border: 1px solid #454f60;
        border-radius: 5px;
        display: inline-block;
        width: 230px;
        height: 38px;
        margin-left: 20px;
        position: relative;
        input {
          text-align: left;
          width: 210px;
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #c5c5c5;
            line-height: 14px;
          }
        }
        img {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 6px;
          right: 6px;
        }
      }
    }
    .form-box {
      background: #454f60;
      border-radius: 5px;
      padding: 20px 50px;
      position: relative;
      .input-box {
        display: inline-block;
        background: #454f60;
        border: 1px solid #b2b2b2;
        border-radius: 5px;
        width: 400px;
        margin-bottom: 0px;
        height: 56px;
        position: relative;
        vertical-align: middle;
        input {
          display: inline-block;
          background: none;
          border: 0;
          width: 350px;
          height: 56px;
          line-height: 16px;
          font-size: 16px;
          margin: 0 auto;
          &::-webkit-input-placeholder {
            font-size: 14px;
            color: #c5c5c5;
            line-height: 14px;
          }
        }
      }
      .waiting-msg {
        margin-left: 10px;
        display: inline-block;
      }
      .msg-box {
        margin-top: 10px;
        height: 24px;
        font-size: 12px;
        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
      .msg-list {
        font-size: 14px;
        color: #ffffff;
        .msg-neoname,
        .msg-status,
        .msg-price,
        .msg-bidder {
          margin-bottom: 3px;
        }
        .msg-neoname {
          font-size: 16px;
        }
        .sgas-count {
          font-size: 20px;
          color: #ffffff;
          line-height: 56px;
          .num {
            margin-left: 10px;
            font-size: 30px;
          }
        }
      }
      .btn-right {
        position: absolute;
        top: 50%;
        right: 30px;
        -webkit-transform: translateY(-50%); /* Safari 和 Chrome */
        -moz-transform: translateY(-50%); /* Firefox */
        -ms-transform: translateY(-50%); /* IE 9 */
        -o-transform: translateY(-50%); /* Opera */
        transform: translateY(-50%);
        .btn-bid {
          padding: 0;
          font-size: 18px;
          width: 150px;
          height: 38px;
          &.btn-smallsize {
            font-size: 14px;
          }
        }
      }
    }
    .pall {
      padding: 50px;
    }
    .ptop {
      padding: 50px 50px 25px 50px;
    }
    .mbottom {
      margin-bottom: 20px;
    }
  }

  .auction-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 1030;
    .auction-box {
      background: #454f60;
      padding: 30px 50px 50px 50px;
      width: 80%;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border-radius: 5px;
      font-size: 16px;
      .auction-title {
        font-size: 20px;
        margin-bottom: 30px;
      }
      .wrap-msg {
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #b2b2b2;
        div {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          .bid-input {
            width: 70%;
            height: 56px;
            background: none;
            border: 1px solid #b2b2b2;
            border-radius: 5px;
            &::-webkit-input-placeholder {
              font-size: 16px;
              color: #c5c5c5;
            }
          }
        }
      }
      .tips-msg {
        font-size: 14px;
        color: #c5c5c5;
        margin-bottom: 30px;
      }
      .btn-bid-box {
        text-align: center;
      }
      .auction-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 30px;
      }
    }
  }
  .top-up-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 1030;
    .top-up-box {
      background: #454f60;
      padding: 30px 50px 50px 50px;
      width: 80%;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border-radius: 5px;
      font-size: 16px;
      .topup-title {
        font-size: 20px;
        color: #ffffff;
      }
      .asset-wrap {
        margin-top: 20px;
        .asset-name,
        .asset-available {
          display: inline-block;
        }
      }
      .amount-wrap {
        margin-top: 50px;
        margin-bottom: 50px;
        .amount-msg {
          margin-bottom: 20px;
        }
        .input-box {
          input {
            width: 70%;
            height: 56px;
            background: none;
            border: 1px solid #b2b2b2;
            border-radius: 5px;
            vertical-align: middle;
            margin-bottom: 0;
            margin-right: 10px;
            color: #c5c5c5;
            &.readonly-input {
              background: #6d7480;
            }
          }
          button {
            vertical-align: middle;
            margin-left: 0;
            &.btn-disable {
              background: #77bcf6;
              opacity: 1;
            }
          }
        }
        .err-msg {
          font-size: 12px;
          margin-top: 10px;
        }
      }
      .topup-tips {
        font-size: 14px;
        color: #c5c5c5;
        width: 87%;
      }
      .topup-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 30px;
      }
    }
  }
  .withdraw-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 1030;
    .withdraw-box {
      background: #454f60;
      padding: 30px 50px 50px 50px;
      width: 80%;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border-radius: 5px;
      font-size: 16px;
      .withdraw-title {
        font-size: 20px;
        color: #ffffff;
      }
      .line-wrap {
        margin-top: 50px;
        margin-bottom: 50px;
        .line-msg {
          margin-bottom: 20px;
        }
        .line-box {
          input {
            width: 70%;
            height: 56px;
            background: none;
            border: 1px solid #b2b2b2;
            border-radius: 5px;
            vertical-align: middle;
            margin-bottom: 0;
            margin-right: 10px;
            color: #c5c5c5;
            &.readonly-input {
              background: #6d7480;
            }
          }
          button {
            vertical-align: middle;
            margin-left: 0;
            &.btn-disable {
              background: #77bcf6;
              opacity: 1;
            }
          }
        }
        .err-msg {
          font-size: 12px;
          margin-top: 10px;
        }
      }
      .withdraw-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 30px;
      }
    }
  }
}
</style>

