<template>
    <div class="exchange-box">
        <div class="title">
            <span>SGas Exchange</span>
        </div>
        <div class="form-box">
            <div class="exchange-sgas">
                <div class="choose-wrap choose-left" :class="{'active':!changeSGas}" @click="changeSGas=false">
                    <img src="../../../static/img/sgas-nomal.png" alt="sgas-nomal.png" v-if="!changeSGas">
                    <img src="../../../static/img/sgas-gray.png" alt="sgas-gray.png" v-if="changeSGas">
                    <span>Exchange Gas for SGas</span>
                </div>
                <div class="choose-wrap choose-right" :class="{'active':changeSGas}" @click="changeSGas = true">
                    <img src="../../../static/img/gas-nomal.png" alt="gas-nomal.png" v-if="changeSGas">
                    <img src="../../../static/img/gas-gray.png" alt="gas-gray.png" v-if="!changeSGas">
                    <span>Exchange SGas for Gas</span>
                </div>
            </div>
            <div class="trans-box">
                <div class="spent-box">
                    <div class="spent-msg">
                        Amount you will spent : 
                    </div>
                   <div class="spent-input">
                        <input type="number" placeholder="0" v-model="transcount">
                        <span>{{changeSGas?"SGas":"Gas"}}</span>
                    </div>
                    <div class="spent-tip">
                       It will cost you <span>0</span> Gas. ( you currently have <span class="ff6">2900</span>  Gas. )///It will cost you 100 SGas . ( you currently have 2900 SGas. )
                    </div>
                </div>
                <div class="guid-img">
                    <img src="../../../static/img/guiding.png" alt="guiding.png">
                </div>
                <div class="receive-box">
                    <div class="receive-msg">
                        Amount you will receive :  
                    </div>
                    <div class="receive-input">
                        <input type="number" placeholder="Amount" v-model="transcount">
                        <span>{{changeSGas?"Gas":"SGas"}}</span>
                    </div>
                    <div class="receive-tip">
                       You will have <span>200</span> SGas. ( You currently have <span>100</span> SGas. )
                    </div>
                </div>
            </div>
            <div class="btn-right">
                <button class="btn btn-nel btn-big" @click="exChange()">Exchange</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./exchange.ts">
</script>
<style lang="less" scoped>
.exchange-box {
  .ff6 {
    color: #ff6a6a;
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 50px;
    position: relative;
    font-size: 16px;
    .exchange-sgas {
      width: 600px;
      display: flex;
      .choose-wrap {
        flex: 1;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #c5c5c5;
        &.choose-left {
          border-radius: 5px 0 0 5px;
          border-right: none;
        }
        &.choose-right {
          border-radius: 0 5px 5px 0;
          border-left: none;
        }
        &.active {
          background: #198cee;
          border: none;
        }
        img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
        }
      }
    }
    .trans-box {
      margin-top: 50px;
      margin-bottom: 50px;
      display: flex;
      .spent-box {
        //width: 450px;
        flex: 1;
        position: relative;
        .spent-msg {
          margin-bottom: 20px;
        }
        .spent-input {
          width: 100%;
          height: 56px;
          position: relative;
          background: #6d7480;
          border: 1px solid #b2b2b2;
          border-radius: 5px;
          input {
            width: 80%;
            height: 100%;
            background: none;
            border: none;
            &::-webkit-input-placeholder {
              font-size: 16px;
              color: #c5c5c5;
            }
          }
          span {
            font-size: 16px;
            position: absolute;
            top: 16px;
            right: 20px;
          }
        }
        .spent-tip {
          font-size: 12px;
          color: #ffffff;
          line-height: 12px;
          position: relative;
          bottom: -10px;
          left: 0;
        }
      }
      .guid-img {
        margin-left: 25px;
        margin-right: 25px;
        position: relative;
        top: 55px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .receive-box {
        flex: 1;
        //width: 450px;
        position: relative;
        .receive-msg {
          margin-bottom: 20px;
        }
        .receive-input {
          width: 100%;
          height: 56px;
          position: relative;
          background: #6d7480;
          border: 1px solid #b2b2b2;
          border-radius: 5px;
          input {
            width: 80%;
            height: 100%;
            background: none;
            border: none;
            &::-webkit-input-placeholder {
              font-size: 16px;
              color: #c5c5c5;
            }
          }
          span {
            font-size: 16px;
            position: absolute;
            top: 16px;
            right: 20px;
          }
        }
        .receive-tip {
          font-size: 12px;
          color: #ffffff;
          line-height: 12px;
          position: relative;
          bottom: -10px;
          left: 0;
        }
      }
    }
    .btn-right {
      text-align: right;
    }
  }
}
</style>
