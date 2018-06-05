<template>
    <div class="box-warp">
        <div class="page-one" v-if="!auctionPage">
            <div class="title">
                <span>Neo Name Auction</span>
            </div>
            <div class="form-box ptop">
                <div class="input-box" >
                    <input type="text" placeholder="type a name">
                    <span>.neo</span>
                </div>
                <button class="btn btn-nel btn-big" @click="auctionShow = !auctionShow">Open Auction</button>
                <spinner-wrap  style="margin-left:20px"></spinner-wrap>
                <button class="btn btn-nel btn-big btn-disable" disabled="disabled">New Bid</button>
                <span class="waiting-msg">We're sending a transacton,please wait patiently...</span>
                <div class="msg-box">
                    <img src="../../../static/img/correct.svg" alt="">
                    <span>bunnyrepublic is available.</span>
                    <span>///bunnyrepublic is being auctioned.</span>
                </div>
                <div class="msg-box status-ended">
                    <span>Please enter the domain according to the format.</span>
                    <span>///This domain name has already been auctioned off by others.</span>
                </div>
            </div>
            <div class="title">
                <span>My Auction</span>
                <div class="seach-box">
                    <input type="search" name="" id="" placeholder="Search by domain">
                    <img src="../../../static/img/seach.png" alt="">
                </div>
            </div>
            <div class="form-box mbottom" v-if="myAuctionList" v-for="(item,index) in myAuctionList" :key="index">
                <div class="msg-list">
                    <div class="msg-neoname">
                        {{item.domain}}.neo
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='Fixed period'">
                        Status : <span class="status-being">Fixed period</span>
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='Random period'">
                        Status : <span class="status-random">Random period</span>
                    </div>
                    <div class="msg-status" v-if="item.auctionState=='Ended'">
                        Status : <span class="status-ended">Ended</span>
                    </div>
                    <div class="msg-price">
                        Last auction price : <span>{{item.maxPrice}}</span> SGas
                    </div>
                    <div class="msg-bidder" v-if="item.maxBuyer != address">
                        Current bidder : <span>Other people （ {{item.maxBuyer}} ）</span>
                    </div>
                    <div class="msg-bidder" v-if="item.maxBuyer == address">
                        Current bidder : <span class="bidder-me">Me （{{address}}} ）</span>
                    </div>
                    <div class="msg-time">
                        Bid start time : <span>{{item.startAuctionTime}}</span>
                    </div>
                </div>
                <div class="btn-right">
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='Fixed period' || item.auctionState=='Random period'" @click="onGoBidInfo(item)">Bid</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='Ended'" @click="onGoBidInfo(item)">Get domain</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='Ended'" @click="onGoBidInfo(item)">Recover SGas</button>
                    <button class="btn btn-nel btn-bid btn-smallsize" v-if="item.auctionState=='Ended'"  @click="onGoBidInfo(item)">Getting domain...</button>
                    <button class="btn btn-nel btn-bid btn-smallsize" v-if="item.auctionState=='Ended'"  @click="onGoBidInfo(item)">Recoverring SGas...</button>
                    <button class="btn btn-nel btn-bid" v-if="item.auctionState=='Ended'" @click="auctionPage = !auctionPage">Received</button>
                </div>
            </div>
        </div>
        <auction-info v-if="auctionPage" @onBack="onBack" :item="domainInfo"></auction-info>
        <div class="auction-wrap" v-if="auctionShow">
          <div class="auction-box">
            <div class="auction-title">Auction</div>
            <div class="wrap-msg">
              <div class="domain-name">Domain : Bennyrepublic1234.neo</div>
              <div class="auction-status">Status : <span class="status-being">Fixed period （ 47:56:30 ）</span> </div>
              <div class="auction-price">Highest bid price : 9 SGas</div>
            </div>
            <div class="wrap-msg">
              <div class="my-bid">
                <span>Raise my bid : </span>
                <input class="bid-input" type="text" placeholder="Enter a raise">
              </div>
              <div class="my-bid">
                Your cumulative bid : <span class="status-ended">0</span> SGas
              </div>
            </div>
            <div class="tips-msg">
              Tips : The minimum value for each increase is 0.1 SGas. When your cumulative bid is less than the  highest bid price, The raise will be unsuccessful.
            </div>
            <div class="btn-bid-box">
              <button class="btn btn-nel btn-big btn-disable" disabled="disabled" >Bid</button>
            </div>
            <div class="auction-close">
              <span aria-hidden="true" @click="auctionShow = !auctionShow">&times;</span>
            </div>
          </div>
        </div>
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
        color: #2dde4f;
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
      }
      .btn-right {
        position: absolute;
        top: 50%;
        right: 30px;
        margin-top: -19px;
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
      width: 1000px;
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
            width: 680px;
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
}
</style>

