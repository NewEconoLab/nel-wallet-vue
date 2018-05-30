<template>
    <div class="box-warp">
        <div class="page-one">
            <div class="title">
                <span>Neo Name Auction</span>
            </div>
            <div class="form-box ptop">
                <div class="input-box" >
                    <input type="text" placeholder="type a name">
                    <span>.neo</span>
                </div>
                <button class="btn btn-nel btn-big" >Open Auction</button>
                <spinner-wrap  style="margin-left:20px"></spinner-wrap>
                <button class="btn btn-nel btn-big btn-disable" disabled="disabled">New Bid</button>
                <span class="waiting-msg">We're sending a transacton,please wait patiently...</span>
                <div class="msg-box">
                    <img src="../../static/img/correct.svg" alt="">
                    <span>bunnyrepublic is available.</span>
                    <span>///bunnyrepublic is being auctioned.</span>
                </div>
                <div class="msg-box err-msg">
                    <span>Please enter the domain according to the format.</span>
                    <span>///This domain name has already been auctioned off by others.</span>
                </div>
            </div>
            <div class="title">
                <span>My Auction</span>
                <div class="seach-box">
                    <input type="search" name="" id="" placeholder="Search by domain">
                    <img src="../../static/img/seach.png" alt="">
                </div>
            </div>
            <div class="form-box mbottom">
                <div class="msg-list">
                    <div class="msg-neoname">
                        BunnyRepublic.neo
                    </div>
                    <div class="msg-status">
                        Status : <span class="status-being">Fixed period （ 47:56:30 ）</span>
                    </div>
                    <div class="msg-status">
                        Status : <span class="status-random">Random period</span>
                    </div>
                    <div class="msg-status">
                        Status : <span class="status-ended">Ended</span>
                    </div>
                    <div class="msg-price">
                        Last auction price : <span>10 SGas</span> 
                    </div>
                    <div class="msg-bidder">
                        Current bidder : <span>Other people （ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）</span>
                    </div>
                    <div class="msg-bidder">
                        Current bidder : <span class="bidder-me">Me （ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）</span>
                    </div>
                    <div class="msg-time">
                        Bid opening time : <span>2018/05/24 16:00:00</span>
                    </div>
                </div>
                <div class="btn-right">
                    <button class="btn btn-nel btn-bid" >Bid</button>
                    <button class="btn btn-nel btn-bid" >Get domain</button>
                    <button class="btn btn-nel btn-bid" >Recover SGas</button>
                    <button class="btn btn-nel btn-bid btn-disable" disabled>Getting domain...</button>
                    <button class="btn btn-nel btn-bid btn-disable" disabled>Recoverring SGas...</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../components/Valert.vue";
import Spinner from "../components/Spinner.vue";
@Component({
  components: {
    "v-alert": Valert,
    "spinner-wrap": Spinner
  }
})
export default class NeoNameAuction extends Vue {
  constructor() {
    super();
  }
}
</script>
<style lang="less" scoped>
.box-warp {
  width: 100%;
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
        }
      }
      button {
        &.btn-disable {
          background: #77bcf6;
          opacity: 1;
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
        &.err-msg {
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
          &.btn-disable {
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
}
</style>

