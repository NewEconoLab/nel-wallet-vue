<template>
    <wallet-layout>
        <div class="container">
            <div class="line-title">
                <div class="title">
                    <span>NEO Balance</span>
                    <div style="float:right">
                        <span>Key Address ：</span>
                        <button class="btn btn-nel">Switch</button>
                    </div>
                </div>
            </div>
            <div style=" background: #454F60;border-radius: 5px;">
                <div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;" v-for="balance in balances" :key="balance.name">
                        <span class="balance-type">{{balance.name}}</span>
                        <span class="balance-amount"> {{balance.amount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </wallet-layout>
</template>

<script lang="ts" src="./balance.ts"></script>
<style>
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
</style>

