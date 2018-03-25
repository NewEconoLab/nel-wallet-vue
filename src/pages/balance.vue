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
                        GAS available to claim : {{neoasset.claim}} <button class="btn btn-nel" v-if="neoasset.claim>0">Claim</button>
                    </div>
                </div>
            </div>
            <div class="title"><span>Asset</span></div>
                <div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;" v-for="balance in balances" :key="balance.asset">
                        <span class="balance-type">{{balance.names}}</span>
                        <span class="balance-amount"> {{balance.balance}}</span>
                    </div>
                </div>
        </div>
    </wallet-layout>
</template>

<script lang="ts" src="./balance.ts">
</script>
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

.neobalance .claim{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 16px;
    border-top:1px solid #B2B2B2;
}
</style>

