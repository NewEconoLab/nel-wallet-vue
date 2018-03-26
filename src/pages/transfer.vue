<template>
    <wallet-layout>
        <div class="container">
            <div class="line-title">
                <div class="title">
                    <span>NEO Balance</span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-2" style="font-family: PingFangSC-Medium;
                                            font-size: 16px;
                                            color: #FFFFFF;
                                            line-height: 16px;">
                    Asset：
                </div>
                <div class="col-sm-10">
                    <select name="" id="" v-model="asset" style="width:150px">
                        <option value="0x3fccdb91c9bb66ef2446010796feb6ca4ed96b05">NNC</option>
                        <option value="c88acaae8a0362cdbdedddf0083c452a3a8bb7b8">CPX Token</option>
                    </select>
                    Neo 2000 Neo available
                </div>
                <div class="col-sm-2" style="font-family: PingFangSC-Medium;
                                            font-size: 16px;
                                            color: #FFFFFF;
                                            line-height: 16px;">
                    Address：
                </div>
                <div class="col-sm-10">
                    <input type="text" name="" id="" v-model="targetaddr" class="input-nel">
                </div>
                <div class="col-sm-2" style="font-family: PingFangSC-Medium;
                                            font-size: 16px;
                                            color: #FFFFFF;
                                            line-height: 16px;">
                    Amount：
                </div>
                <div class="col-sm-10">
                    <input type="number" name="" id="" v-model="amount" class="nel-input">
                </div>
            </div>
            <button class="btn btn-link">Details</button>
            <button class="btn btn-nel" @click="send">Send</button>
        </div>
    </wallet-layout>
</template>

<script lang="ts" src="./transfer.ts">
</script>

<style>

.line-title 
{
    padding-top: 40px;
    padding-bottom: 20px;
}
.balance-type 
{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #ffffff;
    line-height: 20px;
}
.balance-amount 
{
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #ffffff;
    line-height: 30px;
}
.line-title span 
{
    color: #fff;
    font-size: 16px;
    line-height: 16px;
}
.neobalance .claim 
{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 16px;
    border-top:1px solid #B2B2B2;
}
.balance-asset .title
{
    padding-top: 60px;
    padding-bottom: 20px;
}

.balance-asset .row
{
    padding-top: 20px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 16px;
}
.balance-asset .row>div
{
    height: 60px;
    background: #454F60;
    text-align: center;
}
</style>

