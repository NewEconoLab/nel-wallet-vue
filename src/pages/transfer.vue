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
            <div class="transfer-panel">
                <div class="form-horizontal">
                    <label for="firstname" class="col-sm-2 control-label">Asset：</label>
                    <div class="col-sm-10">
                        <select @change="choose" v-model="asset" style="width:150px">
                            <option v-for="balance in balances" :key="balance.asset" :value="balance.asset">{{balance.names}}</option>
                        </select>
                        <span> &nbsp;&nbsp;&nbsp;&nbsp; 2000 Neo available</span>
                    </div>
                    <label for="" class="col-sm-2 control-label">
                        <div style="padding-top:30px;">Address:</div>
                    </label>
                    <div class="col-sm-7">
                        <div style="padding-top:30px;">
                            <input type="text" v-model="targetaddr" style="background: #454F60;
border: 1px solid #B2B2B2;
border-radius: 5px;" @change="verify_addr">
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2" style="font-family: PingFangSC-Medium;
                                            font-size: 16px;
                                            color: #FFFFFF;
                                            line-height: 16px;">
                    Address：
                </div>
                <div class="col-sm-10">
                    <input type="text" v-model="targetaddr" :class="{}" class="input-nel" @change="verify_addr">
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
            <button class="btn btn-nel btn-big" @click="send">Send</button>
        </div>
    </wallet-layout>
</template>

<script lang="ts" src="./transfer.ts">
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
.neobalance .claim {
  font-size: 16px;
  color: #ffffff;
  line-height: 16px;
  border-top: 1px solid #b2b2b2;
}
.transfer-panel {
  background: #454f60;
  border-radius: 5px;
  width: 1080px;
  height: 414px;
}
.transfer-panel .form-horizontal {
  padding-top: 2.9%;
}
.transfer-panel span,
.transfer-panel label {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  line-height: 16px;
  font-weight: unset;
}
</style>

