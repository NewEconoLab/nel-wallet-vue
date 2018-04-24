<template>
  <wallet-layout>
    <div class="container">
      <div class="title" style="padding-bottom:28px;">
        <span>NEO Balance</span>
        <div style="float:right">
          <span class="user-select-ok" style="margin-right: 11px;color:#fff;">Key Address ：{{currentAddress}}</span>
          <button class="btn" data-toggle="modal" data-target="#selectAddr" v-if="chooseAddressarr &&chooseAddressarr>1">Switch</button>
        </div>
      </div>
      <div class="neobalance" style=" background: #454F60;border-radius: 5px;">
        <div>
          <div style="padding: 30px; padding-bottom: 40px;">
            <span class="balance-type">NEO&nbsp;</span>
            <span class="balance-amount">{{neoasset.neo}}</span>
          </div>
          <div style="padding-left: 30px; padding-bottom: 30px;">
            <span class="balance-type">GAS&nbsp;</span>
            <span class="balance-amount">{{neoasset.gas}}</span>
          </div>
          <div class="claim" style="padding: 30px; padding-left: 2.3%;">
            <span style="margin-right: 17px;">GAS available to claim : {{neoasset.claim}}</span>
            <button class="btn btn-nel" v-if="neoasset.claim!='0'&&claimbtn" @click="toClaimGas">Claim</button>
            <div class="spinner-wrap" v-if="!claimbtn">
              <div class="spinner">
                <div class="spinner-container container1">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                  <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                  <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                  <div class="circle4"></div>
                </div>
              </div>
            </div>
            <span class="loadmsg">&nbsp;{{loadmsg}}</span>
          </div>
        </div>
      </div>
      <div class="balance-asset" v-if="balances.length">
        <div class="title">
          <span>Asset</span>
        </div>
        <div v-for="balance in balances" :key="balance.asset" class="assetrow">
          <div class="row">
            <div class="col-sm-2 info">
              <span>{{balance.names}}</span>
            </div>
            <div class="col-sm-8 info">
              <span> {{balance.balance}}</span>
            </div>
            <div class="col-sm-2 transfer-btn">
              <span class="btn btn-transfer" @click="toTransfer(balance.asset)">Transfer</span>
            </div>
          </div>
        </div>
      </div>
      <div style="height:30px"></div>
    </div>

    <!-- 地址选框 -->
    <div class="modal fade" id="selectAddr" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="exampleModalLabel">Choose address</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputFile">Select Nep6 File:</label>
                <div class="radio" id="selectAddress">
                  <label v-for="item in chooseAddressarr" :key="item.address">
                    <input type="radio" v-model="chooseAddress" :value="item.address">{{item.address}}
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addressSwitch()">confirm</button>
          </div>
        </div>
      </div>
    </div>
  </wallet-layout>
</template>

<script lang="ts" src="./balance.ts">
</script>
<style>
.btn-transfer {
  border: 1px solid #ffffff;
  border-radius: 5px;
}

.balance-type {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #ffffff;
  line-height: 20px;
}
.balance-amount {
  font-family: PingFangSC-Medium;
  font-size: 30px;
  color: #ffffff;
  line-height: 30px;
}
.neobalance .claim {
  font-size: 16px;
  color: #ffffff;
  line-height: 16px;
  border-top: 1px solid #b2b2b2;
}
.balance-asset .title {
  padding-top: 60px;
  padding-bottom: 20px;
}

.assetrow .row {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 16px;
  border-radius: 5px;
  background: #454f60;
  height: 60px;
  margin: 0 auto;
}
.assetrow .row .info {
  padding-top: 20px;
}
.assetrow .transfer-btn {
  padding-top: 12px;
}
.balance-asset .assetrow {
  padding-top: 20px;
  text-align: center;
}
.loadmsg {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #b2b2b2;
  line-height: 12px;
}
/* 加载动画 */
.spinner-wrap {
  display: inline-block;
  background-color: #198cee;
  padding: 12px 23px;
  border-radius: 5px;
  vertical-align: middle;
  width: 46px;
  height: 18px;
  box-sizing: content-box;
  text-align: center;
}
.spinner {
  width: 20px;
  height: 20px;
  position: relative;
  margin-left: 13px;
}

.container1 > div,
.container2 > div,
.container3 > div {
  width: 6px;
  height: 6px;
  background-color: #fff;

  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.circle1 {
  top: 0;
  left: 0;
}
.circle2 {
  top: 0;
  right: 0;
}
.circle3 {
  right: 0;
  bottom: 0;
}
.circle4 {
  left: 0;
  bottom: 0;
}

.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.container3 .circle1 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>

