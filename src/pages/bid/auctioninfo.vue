<template>
    <div class="page-two">
      <!-- 域名详情 -->
        <div class="title">
            <span>{{$t('auction.title3')}}</span>
            <div class="goback" @click="onBack">&lt;&lt;&lt;{{$t('auction.goback')}}</div>
        </div>
        <div class="form-box">
            <div class="filename">{{$t('auction.domain')}}: {{auctionInfo.domain}}</div>
            <div class="status" v-if="auctionInfo.state=='0201'">{{$t('auction.status')}}: <span class="status-being">{{$t('auction.fixedperiod')}}</span> </div>
            <div class="status" v-if="auctionInfo.state=='0301'">{{$t('auction.status')}}: <span class="status-random">{{$t('auction.randomperiod')}}</span></div>
            <div class="status" v-if="auctionInfo.state=='0401'">{{$t('auction.status')}}: <span class="status-ended">{{$t('auction.ended')}}</span> </div>
            <div class="highest-price">{{$t('auction.highest')}}: {{auctionInfo.maxPrice}} CGAS</div>   
            <div class="bidder" v-if="auctionInfo.maxBuyer != address">{{$t('auction.currentbidder')}}: <span>{{$t('auction.other')}}（ {{auctionInfo.maxBuyer}} ）</span> </div>
            <div class="bidder" v-if="auctionInfo.maxBuyer == address">{{$t('auction.currentbidder')}}: <span class="bidder-me">{{$t('auction.me')}}（ {{auctionInfo.maxBuyer}} ）</span> </div>
            <div class="my-bid-sgas">{{$t('auction.mybidmsg')}}: <span :class="auctionInfo.maxBuyer == address?'status-being':'status-ended'">{{auctionInfo.addwho.totalValue}}</span>  CGAS</div>     
        </div>
        <!-- 域名领取 -->
        <div v-if="auctionInfo.btnState==1||auctionInfo.btnState==4">
          <div class="title">
              <span>{{$t('auction.title6')}}</span>
          </div>
          <div class="form-box">
              <div class="neoname"> {{auctionInfo.domain}}</div>
              <div class="neoname-tips">{{$t('auction.getdomaintips')}}</div>
              <div class="btn-center">
                <button v-if="auctionInfo.btnState==1 && !isGetDomainWait" class="btn btn-nel btn-bid" @click="getDomain">{{$t('btn.getdomain')}}</button>
                <button v-if="auctionInfo.btnState==1 && isGetDomainWait" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.gettingdomain')}}</button>
                <button v-if="auctionInfo.btnState==4" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.receivednns')}}</button>  
              </div>  
          </div>
        </div>
        <!-- 退回竞拍金额 -->
        <div v-if="auctionInfo.btnState==2||auctionInfo.btnState==3">
          <div class="title">
              <span>{{$t('auction.title7')}}</span>
          </div>
          <div class="form-box">
              <div class="cumulative-msg">{{$t('auction.mybidmsg')}}: {{myBidPrice}} CGAS</div>
              <div class="fee-msg">{{$t('auction.fee')}}: {{fee}} CGAS</div>
              <div class="remain-msg">{{$t('auction.remainingsgas')}}: {{remaining}} CGAS</div>
              <div class="btn-center">
                <button v-if="auctionInfo.btnState==2&&!isRecoverWait" class="btn btn-nel btn-bid" @click="recoverSgas" >{{$t('btn.recoversgas')}}</button>
                <button v-if="auctionInfo.btnState==2&&isRecoverWait" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.recoveringsgas')}}</button>
                <button v-if="auctionInfo.btnState==3" class="btn btn-nel btn-bid btn-disable" disabled>{{$t('btn.receivedsgas')}}</button> 
              </div> 
          </div>
        </div>
        <!-- 域名加价 -->
        <div v-if="auctionInfo.btnState==0">
        <div class="title">
            <span>{{$t('auction.title4')}}</span>
        </div>
        <div class="form-box">
            <div>
                <div class="input-msg">{{$t('auction.raisebid')}}: </div>
                <div class="input-box" >
                    <input type="number" :placeholder="$t('auction.enterbid')" v-model="bidPrice" @input="myBidInput" autocomplete="off">
                    <span>CGAS</span>
                </div>
                <div v-if="inputErrorCode==1" class="err-msg status-ended">{{$t('auction.errmsg1')}} {{balanceOf}} {{$t('auction.errmsg2')}}</div>
                <div v-if="inputErrorCode==2" class="err-msg status-ended">{{$t('auction.errmsg4')}}</div>
                <div v-if="inputErrorCode==3" class="err-msg status-ended">{{$t('auction.errmsg6')}}</div>
            </div>
            <div class="my-sgas">{{$t('auction.mywillbid')}}: <span :class="updatePrice<=auctionInfo.maxPrice||inputErrorCode==1?'status-ended':'status-being'">{{updatePrice}}</span> CGAS</div>
            <div class="tips-msg">
                {{$t('auction.tips1')}} 
            </div>
            <div class="btn-bid-box">
              <button v-if="bidState==2" class="btn btn-bid btn-disable" disabled="disabled">{{$t('btn.bid')}}</button>
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
              <div :class="auctionInfo.process.timearr.length==3?'process':'process long'" :style="'width:'+auctionInfo.process.width+'%'">
                <div v-if="auctionInfo.process.state=='0201'" class="process-tips">{{ $t('auction.fixedperiod')}} </div>
                <div v-if="auctionInfo.process.state=='0301'" class="process-tips">{{ $t('auction.randomperiod')}} </div>
                <div v-if="auctionInfo.process.state=='0401'" class="process-tips">{{ $t('auction.ended')}} </div>
              </div>
              <div class="starts">{{auctionInfo.process.date}}
                <br/>{{auctionInfo.process.time}}</div>

              <div v-for="days in auctionInfo.process.timearr" :key="days.msg" class="days">
                <em v-if="days.msg!=''&&days.msg=='1'">{{$t('auction.bidstarttimemsg')}}</em>
                <em v-if="days.msg!=''&&days.msg=='2'">{{$t('auction.endtimemsg')}}</em>
                <em v-if="days.msg!=''&&days.msg=='3'">{{$t('auction.maxtimemsg')}}</em>
                <span>{{days.date}}
                  <br/>{{days.time}}</span>
              </div>
            </div>
          </div>
          <!-- process-wrapper end  -->
          <div class="auction-tips">{{$t('auction.tips')}} <p> {{$t('auction.statustips')}}</p><p style="">{{$t('auction.statustips2')}}</p></div>

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
      &.btn-disable {
        background: #77bcf6;
        opacity: 1;
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
      p {
        text-indent: 2em;
        color: #c5c5c5;
      }
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
          right: -24px;
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
