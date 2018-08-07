<template>
  <wallet-layout>
    <div class="container exchange-box">
        <div class="title">
            <span>{{$t('exchange.title')}}</span>
        </div>
        <div class="form-box">
            <div class="exchange-sgas">
              <div class="gas-sgas" v-if="!changeSGas">
                <div class="choose-wrap wrap-left">
                    <img src="../../../static/img/gas-nomal.png" alt="gas-nomal.png">
                    <div class="change-type">
                      <span>Gas</span>
                      <p>{{$t('exchange.balance')}}: <span>{{myGas}}</span></p>
                    </div>
                </div>
                <div class="guid-img">
                    <img src="../../../static/img/guiding.png" alt="guiding.png">
                </div>
                <div class="choose-wrap wrap-right">
                    <img src="../../../static/img/sgas-nomal.png" alt="sgas-nomal.png">
                    <div class="change-type">
                      <span>SGas</span>
                      <p>{{$t('exchange.balance')}}: <span>{{mySGas}}</span></p>
                    </div>
                </div>
              </div>
              <div class="gas-sgas" v-if="changeSGas">
                <div class="choose-wrap wrap-left">
                    <img src="../../../static/img/sgas-nomal.png" alt="sgas-nomal.png" >
                    <div class="change-type">
                      <span>SGas</span>
                      <p>{{$t('exchange.balance')}}: <span>{{mySGas}}</span></p>
                    </div>
                </div>
                <div class="guid-img">
                    <img src="../../../static/img/guiding.png" alt="guiding.png">
                </div>
                <div class="choose-wrap wrap-right">
                    <img src="../../../static/img/gas-nomal.png" alt="gas-nomal.png">
                    <div class="change-type">
                      <span>Gas</span>
                      <p>{{$t('exchange.balance')}}: <span>{{myGas}}</span></p>
                    </div>
                </div>
              </div>
              <div class="exchange-img" @click="exchangeTranType">
                  <img src="../../../static/img/exchange.png" alt="exchange.png">
              </div>
            </div>
            <div class="sgas-tip">
              {{$t('exchange.tips')}}
            </div>
            <div class="trans-box">
                <div class="spent-box">
                  <div class="spent-msg">
                    {{$t('exchange.spend')}} 
                  </div>
                  <div class="spent-input">
                    <div class="img-icon">
                      <img src="../../../static/img/plus.png" alt="plus.png">
                    </div>
                    <div class="input-icon">
                      <input type="number" placeholder="0" v-model="transcount" @input="exchangeCount" autocomplete="off">
                    </div>
                    <div class="msg-icon">
                      {{changeSGas?"SGas":"Gas"}}
                    </div>
                  </div>
                </div>
                <div class="spent-box">
                  <div class="spent-msg">
                    {{$t('exchange.receive')}}  
                  </div>
                  <div class="spent-input disable-input">
                    <div class="img-icon">
                      <img src="../../../static/img/minus.png" alt="minus.png">
                    </div>
                    <div class="input-icon">
                      <input type="number" :placeholder="$t('exchange.amount')" v-model="transcount" disabled>
                    </div>
                    <div class="msg-icon">
                      {{changeSGas?"Gas":"SGas"}}
                    </div>
                  </div>
                </div>
                
            </div>  
            <div class="spent-tip ff6" v-if="transcount > exMaxcount">
              {{$t('exchange.warnmsg')}} 
            </div>          
            <div class="btn-right">
                <button v-if="!isCheckingTran" class="btn btn-nel btn-big" @click="exChange()" :class="{'btn-disable':(transcount > exMaxcount || !exchangebtn)}" :disabled="transcount > exMaxcount || !exchangebtn">{{$t('btn.exchange')}}</button>
                <!-- <spinner-wrap v-if="isCheckingTran" style="margin-left:20px"></spinner-wrap> -->
                <span v-if="isCheckingTran">
                  <button class="btn btn-nel btn-big btn-disable" disabled>{{$t('btn.exchanging')}}</button>
                </span>
            </div>
        </div>
        <div class="form-box tran-list" v-if="exchangeList">
          <h3 class="tran-title">{{$t('exchange.waittitle')}}</h3>
          <div class="tran-history" v-for="(item,index) in exchangeList" :key="index">            
            <p v-if="item.trantype == 'Gas'">{{$t('exchange.tosgas')}}：{{item.trancount}} {{item.trantype}}, TXID: {{item.txid}}</p>
            <p v-if="item.trantype == 'SGas'">{{$t('exchange.togas')}}：{{item.trancount}} {{item.trantype}}, TXID: {{item.txid}}</p>
          </div>
        </div>
    </div>
  </wallet-layout>
</template>
<script lang="ts" src="./exchange.ts">
</script>
<style lang="less" scoped>
.exchange-box {
  .ff6 {
    color: #ff6a6a;
  }
  button {
    &.btn-disable {
      background: #77bcf6;
      opacity: 1;
      cursor: not-allowed;
    }
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 50px;
    position: relative;
    font-size: 16px;
    margin-bottom: 20px;
    color: #fff;
    .exchange-sgas {
      display: flex;
      align-items: center;
      .gas-sgas {
        border: 1px solid #c5c5c5;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 85%;
        height: 75px;
        margin-right: 20px;
        .choose-wrap {
          width: 35%;
          display: flex;
          align-items: center;
          .change-type {
            margin-left: 10px;
            font-size: 16px;
            color: #fff;
            line-height: 16px;
            p {
              font-size: 12px;
              color: #fff;
              line-height: 12px;
              margin-bottom: 0;
              margin-top: 7px;
            }
          }
          &.wrap-left {
            margin-left: 80px;
          }
          &.wrap-right {
            margin-right: 80px;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }
        .guid-img {
          display: inline-block;
          width: 30%;
          text-align: center;
        }
      }
      .guid-img,
      .exchange-img {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .sgas-tip {
      font-size: 12px;
      margin-top: 10px;
    }
    .trans-box {
      margin-top: 50px;
      width: 85%;
      display: flex;
      .spent-box {
        flex: 1;
        width: 48%;
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
        .spent-msg {
          margin-bottom: 20px;
        }
        .spent-input {
          width: 100%;
          height: 56px;
          background: #454f60;
          border: 1px solid #b2b2b2;
          border-radius: 5px;
          position: relative;
          &.disable-input {
            background: #6d7480;
          }
          .img-icon {
            display: inline-block;
            vertical-align: middle;
            font-size: 24px;
            color: #ff6966;
            width: 15px;
            margin-left: 20px;
            margin-top: -5px;
            img {
              width: 100%;
            }
          }
          .input-icon {
            display: inline-block;
            vertical-align: middle;
            width: 65%;
            height: 100%;
            input {
              width: 100%;
              height: 100%;
              background: none;
              border: none;
              &::-webkit-input-placeholder {
                font-size: 16px;
                color: #c5c5c5;
              }
            }
          }
          .msg-icon {
            font-size: 16px;
            vertical-align: middle;
            position: absolute;
            top: 15px;
            right: 20px;
          }
        }
      }
    }
    .spent-tip {
      font-size: 12px;
      color: #ff6a6a;
      line-height: 12px;
      margin-top: 10px;
    }
    .btn-right {
      margin-top: 50px;
      text-align: right;
      width: 85%;
    }
    .tran-title {
      text-align: center;
      margin-bottom: 20px;
    }
    .tran-history {
      p {
        color: #fff;
        -moz-user-select: text;
        -webkit-user-select: text;
        -ms-user-select: text;
        -khtml-user-select: text;
        user-select: text;
      }
    }
  }
  .tran-list {
    padding: 15px 60px;
  }
}
</style>
