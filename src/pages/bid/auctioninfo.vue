<template>
    <div class="page-two">
        <div class="title">
            <span>{{$t('auction.title3')}}</span>
            <div class="goback" @click="onBack">&lt;&lt;&lt;{{$t('auction.goback')}}</div>
        </div>
        <div class="form-box">
            <div class="filename">{{$t('auction.domain')}} : {{domainAuctionInfo.domain}}</div>
            <div class="status" v-if="domainAuctionInfo.auctionState=='1'">{{$t('auction.status')}} : <span class="status-being">{{$t('auction.fixedperiod')}}</span> </div>
            <div class="status" v-if="domainAuctionInfo.auctionState=='2'">{{$t('auction.status')}} : <span class="status-random">{{$t('auction.randomperiod')}}</span> </div>
            <div class="status" v-if="domainAuctionInfo.auctionState=='0'">{{$t('auction.status')}} : <span class="status-ended">{{$t('auction.ended')}}</span> </div>
            <div class="highest-price">{{$t('auction.highest')}} : {{domainAuctionInfo.maxPrice}} SGas</div>   
            <div class="bidder" v-if="domainAuctionInfo.maxBuyer != address">{{$t('auction.currentbidder')}} : <span>{{$t('auction.other')}}（ {{domainAuctionInfo.maxBuyer}} ）</span> </div>
            <div class="bidder" v-if="domainAuctionInfo.maxBuyer == address">{{$t('auction.currentbidder')}} : <span class="bidder-me">{{$t('auction.me')}}（ {{domainAuctionInfo.maxBuyer}} ）</span> </div>
            <div class="my-bid-sgas">{{$t('auction.mybidmsg')}} : <span class="status-ended">{{myBidPrice}}</span>  SGas</div>     
        </div>
        <div v-if="domainAuctionInfo.auctionState==0&& domainAuctionInfo.maxBuyer == address">
          <div class="title">
              <span>{{$t('auction.title6')}}</span>
          </div>
          <div class="form-box">
              <div class="neoname"> {{domainAuctionInfo.domain}}</div>
              <div class="neoname-tips">{{$t('auction.getdomaintips')}}</div>
              <div class="btn-center">
                <button v-if="state_getDomain==0" class="btn btn-nel btn-bid" @click="getDomain">{{$t('btn.getdomain')}}</button>
                <button v-if="state_getDomain==1" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.gettingdomain')}}</button>
                <button v-if="state_getDomain==2" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.received')}}</button>  
              </div>  
          </div>
        </div>
        <div v-if="domainAuctionInfo.auctionState==0&& domainAuctionInfo.maxBuyer != address">
          <div class="title">
              <span>{{$t('auction.title7')}}</span>
          </div>
          <div class="form-box">
              <div class="cumulative-msg">{{$t('auction.mybidmsg')}} : {{myBidPrice}} SGas</div>
              <div class="fee-msg">{{$t('auction.fee')}} : {{fee}} SGas</div>
              <div class="remain-msg">{{$t('auction.remainingsgas')}} : {{remaining}} SGas</div>
              <div class="btn-center">
                <button v-if="state_recover==0" class="btn btn-nel btn-bid" @click="recoverSgas" >{{$t('btn.recoversgas')}}</button>
                <button v-if="state_recover==1" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.recoveringsgas')}}</button>
                <button v-if="state_recover==2" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.received')}}</button>  
              </div> 
          </div>
        </div>
        <div v-if="domainAuctionInfo.auctionState>0">
        <div class="title">
            <span>{{$t('auction.title4')}}</span>
        </div>
        <div class="form-box">
            <div>
                <div class="input-msg">{{$t('auction.raisebid')}} : </div>
                <div class="input-box" >
                    <input type="number" :placeholder="$t('auction.enterbid')" v-model="bidPrice" @input="myBidInput">
                    <span>SGas</span>
                </div>
                <div v-if="inputErrorCode==1" class="err-msg status-ended">{{$t('auction.errmsg1')}} {{balanceOf}} {{$t('auction.errmsg2')}}</div>
            </div>
            <div class="my-sgas">{{$t('auction.mywillbid')}} : <span class="status-ended">{{updatePrice}}</span> SGas</div>
            <div class="tips-msg">
                {{$t('auction.tips1')}} 
            </div>
            <div class="btn-bid-box">
              <button v-if="bidState==2" class="btn btn-bid btn-disable" disabled="disabled" >{{$t('btn.bid')}}</button>
              <button v-if="bidState==0" class="btn btn-bid " @click="bidDomain" >{{$t('btn.bid')}}</button>
            </div>
        </div>
        </div>
        <div class="title">
            <span>{{$t('auction.title5')}}</span>
        </div>
        <div class="form-box">
          <!-- process-wrapper start -->
          <div class="process-wrapper">
            <label>{{$t('auction.status')}}</label>
            <div class="process-box">
              <div class="process long" :style="'width:'+width+'%'">
                <div class="process-tips">{{process.state}} </div>
                <!-- <div class="process-fff">
                  <img src="../../../static/img/going.png" alt="">
                </div> -->
              </div>
              <div class="starts">{{process.date}}
                <br/>{{process.time}}</div>

              <div v-for="days in process.timearr" :key="days.msg" class="days">
                <em v-if="days.msg!=''&&days.msg=='1'">{{$t('auction.bidstarttimemsg')}}</em>
                <em v-if="days.msg!=''&&days.msg=='2'">{{$t('auction.endtimemsg')}}</em>
                <em v-if="days.msg!=''&&days.msg=='3'">{{$t('auction.maxtimemsg')}}</em>
                <span>{{days.date}}
                  <br/>{{days.time}}</span>
              </div>
            </div>
          </div>
          <!-- process-wrapper end  -->
          <div class="auction-tips">{{$t('auction.timetips2')}}</div>
          <!-- timeling-wrapper start -->
          <div class="timeling-wrapper">
            <div class="first"></div>
            <div class="list" v-for="(item,index) in bidDetailList" :key="index">
              <div class="line"></div>
              <div class="infos">
                <span>{{item.addPriceTime}}</span>
                <p v-if="!item.maxBuyer">{{$t('auction.auctionopen')}}</p>
                <p style="font-size:12px;" v-if="item.maxBuyer != address && item.maxBuyer">{{$t('auction.other')}}（ <span style="font-size:12px;">{{item.maxBuyer}}</span>  ）</p>
                <p class="bidder-me" v-if="item.maxBuyer == address">{{$t('auction.me')}}（ <span>{{item.maxBuyer}}</span> ）</p>
                <em v-if="item.maxBuyer!=''">{{$t('auction.price')}}{{item.maxPrice}} SGas</em>
              </div>
            </div>
          </div>
          <!-- timeling-wrapper end -->
          <div class="viewmore">
            <button class="btn btn-nel" v-if="btnShowmore" @click="getMoreBidDetail">{{$t('btn.viewmore')}}</button>
          </div>
        </div>
        <v-toast ref="toast" ></v-toast>
    </div>
</template>
<script lang="ts" src="./auctioninfo.ts">
</script>

<style lang="less" scoped>
.page-two {
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
    &.btn-bid {
      background: #198cee;
    }
    &.btn-disable {
      background: #77bcf6;
      opacity: 1;
    }
  }
  .title {
    position: relative;
    .goback {
      font-size: 16px;
      color: #4dadff;
      position: absolute;
      top: 42px;
      right: 0;
      cursor: pointer;
    }
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 50px;
    margin-bottom: 20px;
    .filename {
      font-size: 20px;
    }
    .filename,
    .status,
    .highest-price,
    .bidder {
      margin-bottom: 10px;
    }
    .input-msg {
      display: inline-block;
      font-size: 16px;
      margin-right: 15px;
    }
    .err-msg {
      display: inline-block;
      font-size: 12px;
    }
    .input-box {
      display: inline-block;
      background: #454f60;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      width: 560px;
      margin-bottom: 0px;
      height: 56px;
      position: relative;
      vertical-align: middle;
      font-size: 16px;
      margin-right: 10px;
      input {
        display: inline-block;
        background: none;
        border: 0;
        width: 500px;
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
    .my-sgas {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .tips-msg {
      font-size: 14px;
      color: #c5c5c5;
      margin-bottom: 50px;
    }
    .btn-bid-box {
      text-align: center;
      .btn-bid {
        padding: 0;
        font-size: 18px;
        width: 150px;
        height: 38px;
      }
    }
    .neoname {
      text-align: center;
      font-size: 24px;
    }
    .neoname-tips {
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: center;
      font-size: 14px;
      color: #c5c5c5;
    }
    .btn-center {
      text-align: center;
    }
    .cumulative-msg {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .fee-msg,
    .remain-msg {
      margin-top: 20px;
      font-size: 16px;
    }
    .remain-msg {
      margin-bottom: 50px;
    }
    .auction-tips {
      font-size: 14px;
      color: #c5c5c5;
      text-align: left;
      margin-top: 30px;
      margin-left: 34px;
    }
    // process-wrapper
    .process-wrapper {
      padding-top: 26px;
      margin-left: 34px;
      height: 88px;
      display: inline-block;
      position: relative;
      label {
        font-size: 16px;
        color: #ffffff;
        line-height: 16px;
        vertical-align: middle;
        margin-right: 15px;
      }
      .process-box {
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        background: #404754;
        box-shadow: inset 0 3px 3px 0 rgba(0, 0, 0, 0.5);
        border-radius: 3px;
        position: relative;

        .days {
          width: 150px;
          height: 100%;
          border-right: 1px solid rgba(255, 255, 255, 0.5);
          display: inline-block;
          position: relative;

          font-size: 12px;
          color: #ffffff;
          line-height: 14px;

          &:last-child {
            border: none;
          }

          em {
            font-style: normal;
            position: absolute;
            top: -26px;
            white-space: nowrap;
            right: -70px;
          }

          span {
            position: absolute;
            top: 35px;
            right: -34px;
          }
        }

        div:nth-of-type(3) {
          em {
            left: -35px;
          }
        }

        .starts {
          font-size: 12px;
          color: #ffffff;
          line-height: 14px;

          position: absolute;
          top: 35px;
          left: -34px;
        }
      }

      .process {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #2dde4f;
        //background-image: linear-gradient(90deg, #2dde4f 0%, #2dde4f 100%);
        box-shadow: inset 0 3px 3px 0 rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        z-index: 1;

        &.long {
          background-image: linear-gradient(90deg, #2dde4f 0%, #dfa757 100%);
          box-shadow: inset 0 3px 3px 0 rgba(255, 255, 255, 0.3);
        }
        &:hover {
          .process-tips {
            display: block;
          }
        }

        .process-tips {
          display: none;
          padding: 9px 5px;
          height: 30px;
          box-sizing: border-box;
          font-size: 12px;
          color: #fff;
          white-space: nowrap;
          background: #151a1e;
          border-radius: 5px;
          position: absolute;
          top: -40px;
          right: -46px;
          line-height: 12px;
          &:before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-top-color: #151a1e;
            position: absolute;
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
          }
        }
        .process-fff {
          width: 20px;
          height: 20px;
          position: absolute;
          right: -2px;
          top: 1px;
          img {
            width: 100%;
          }
        }
      }
    }
    // timeling-wrapper
    .timeling-wrapper {
      overflow: hidden;
      height: auto;
      margin-top: 100px;
      .first {
        width: 1px;
        height: 100px;
        background: #fff;
        margin: 0 auto;
      }

      .list {
        margin: 0 auto;
        width: 1px;
        position: relative;
        .line {
          height: 100px;
          width: 1px;
          background: #fff;
          position: relative;

          &:after {
            content: "";
            display: block;
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #198cee;
            position: absolute;
            left: -5px;
          }
        }

        .infos {
          width: 385px;
          background: #151a1e;
          color: #fff;
          padding: 15px 20px;
          position: absolute;
          left: -407px;
          top: -50%;
          margin-top: 6px;
          box-sizing: border-box;
          border-radius: 5px;
          &:after {
            width: 0;
            height: 0;
            border: 14px solid transparent;
            border-left-color: #151a1e;
            position: absolute;
            content: "";
            display: block;
            right: -28px;
            top: 50%;
            margin-top: -14px;
          }

          span {
            font-size: 12px;
          }

          p {
            font-size: 14px;
            color: #ffffff;
            margin: 5px 0;
            &.bidder-me {
              color: #198cee;
            }
            span {
              font-size: 12px;
            }
          }

          em {
            font-style: normal;
            font-size: 14px;
          }
        }

        &:nth-of-type(2n-1) {
          .infos {
            right: -407px;
            left: initial;

            &:after {
              border: 14px solid transparent;
              border-right-color: #151a1e;
              left: -28px;
              right: initial;
            }
          }
        }
      }
    }
    .viewmore {
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>
