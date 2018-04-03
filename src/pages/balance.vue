<template>
    <wallet-layout>
        <div class="container">
            <div class="line-title">
                <div class="title">
                    <span>NEO Balance</span>
                    <div style="float:right">
                        <span>Key Address ：{{currentAddress}}</span>
                        <button class="btn btn-nel">Switch</button>
                    </div>
                </div>
            </div>
            <div class="neobalance" style=" background: #454F60;border-radius: 5px;">
                <div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        <span class="balance-type">NEO</span>
                        <span class="balance-amount">{{neoasset.neo}}</span>
                    </div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        <span class="balance-type">GAS</span>
                        <span class="balance-amount">{{neoasset.gas}}</span>
                    </div>
                    <div class="claim" style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        GAS available to claim : {{neoasset.claim}}
                        <button class="btn btn-nel" v-if="neoasset.claim>0">Claim</button>
                    </div>
                </div>
            </div>
            <div class="balance-asset">
                <div class="title">
                    <span>Asset</span>
                </div>
                <div v-for="balance in balances" :key="balance.asset" class="assetrow">
                    <div class="row">
                        <div class="col-lg-2 info">
                            <span>{{balance.names}}</span>
                        </div>
                        <div class="col-lg-8 info">
                            <span> {{balance.balance}}</span>
                        </div>
                        <div class="col-lg-2 transfer-btn">
                            <span class="btn btn-transfer" @click="toTransfer(balance.asset)">Transfer</span>
                        </div>
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
.line-title {
  padding-top: 40px;
  padding-bottom: 20px;
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
.line-title span {
  color: #fff;
  font-size: 16px;
  line-height: 16px;
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
</style>

