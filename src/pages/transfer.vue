<template>
    <wallet-layout>
        <div class="container">
            <div class="title">
                <span>Transfer</span>
            </div>
        </div>
        <div class="container">
            <div class="transfer-panel">
                <div class="form-horizontal">
                    <div class="col-sm-12">
                        <label for="firstname" class="col-sm-2 control-label" style="padding-top:20px;">Asset：</label>
                        <div class="col-sm-3">
                            <div class="dropdown">
                                <div type="button" class="btn dropdown-toggle select-nel" id="assets" data-toggle="dropdown" :class="balances.length>0 ? '' : 'select-disabled' ">
                                    <div class="select-title">{{balance.names}}</div>
                                    <div class="select-caret">
                                        <span class="caret"></span>
                                    </div>
                                </div>
                                <ul class="dropdown-menu dropdown-nel" role="menu" aria-labelledby="assets">
                                    <li role="presentation" v-for="balance in balances" :class="asset==balance.asset?'active':''" :key="balance.asset" :value="balance.asset">
                                        <a role="menuitem" tabindex="-1" @click="choose(balance.asset)">{{balance.names}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-4" style="padding-top:20px;">
                            <span> &nbsp;&nbsp;&nbsp;&nbsp; {{balance.balance}} {{balance.names ? balance.names + " available" : ""}} </span>
                        </div>
                    </div>
                    <div class="col-sm-12" :class="addrerr!=''?(addrerr == 'true' ?'err':'success') :''">
                        <label for="" class="col-sm-2 control-label">
                            <div style="padding-top:40px;">Address:</div>
                        </label>
                        <div class="col-sm-7">
                            <div style="padding-top:30px;">
                                <input type="text" v-model="target" class="nel-input big" placeholder="Please enter an address or domain name " @input="verify_addr">
                            </div>
                            <p v-if="isDomain">{{toaddress}}</p>
                        </div>
                        <div class="col-sm-3 mess">
                            <p v-if="addrerr=='true'"><img src="../../static/img/wrong.svg" alt="">&nbsp;&nbsp; Your adress is incorrect.</p>
                            <p v-if="addrerr=='false'"><img src="../../static/img/correct.svg" alt=""></p>
                        </div>
                    </div>
                    <div class="col-sm-12" :class="amounterr!=''?(amounterr == 'true' ?'err':'success') :''">
                        <label for="" class="col-sm-2 control-label">
                            <div style="padding-top:40px;">Amount:</div>
                        </label>
                        <div class="col-sm-7">
                            <div style="padding-top:30px;">
                                <input type="number" v-model="amount" class="nel-input big" @change="verify_Amount" @input="verify_Amount">
                            </div>
                        </div>
                        <div class="col-sm-3 mess">
                            <!-- <p v-if="addrerr=='true'"><img src="../../static/img/wrong.svg" alt="">&nbsp;&nbsp; Your adress is incorrect.</p>
                            <p v-if="addrerr=='false'"><img src="../../static/img/correct.svg" alt=""></p> -->
                        </div>
                    </div>
                    <div class="col-sm-12" style="padding-top:30px;">
                        <div class="col-sm-6"></div>
                        <div class="col-sm-3">
                            <button class="btn btn-link">Details</button>
                            <button class="btn btn-nel btn-big" @click="send">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="title">
                <span>History</span>
            </div>
        </div>
        <div class="container">
            <div class="history-panel">
                <div>
                    <div class="title"></div>
                    <div v-for="tx in txs" class="history" :key="tx.index">
                        <div class="number" :class="tx.txtype">
                            {{tx.txtype == 'out'?'+ ':'- '}}{{tx.value}}&nbsp;{{tx.assetname}}</div>
                        <div class="address"> Send {{tx.txtype == 'out'?'form':'to'}} : {{tx.address}}</div>
                        <div class="time">
                            <a :href="'https://scan.nel.group/#testnet/transaction/'+tx.txid" target="_blank">
                                {{tx.txid.substring(0, 4) + '...' + tx.txid.substring(tx.txid.length - 4)}}
                            </a> &nbsp;{{tx.time}}
                            <div v-if="tx.waiting">(Waiting)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page" v-if="cutshow">
                <div class="page-previous" :class="txpage<=1?'disabled':''" @click="cutPage('pre')">
                    <img src="../../static/img/lefttrangle.svg" alt="">
                </div>
                <div style="width:1px;"></div>
                <div class="page-next" :class="nextpage?'':'disabled'" @click="cutPage('next')">
                    <img src="../../static/img/righttrangle.svg" alt="">
                </div>
            </div>
        </div>
    </wallet-layout>
</template>

<script lang="ts" src="./transfer.ts">
</script>

<style scoped>
.select-nel {
  background: #198cee;
  border-radius: 5px;
  height: 56px;
  margin: 0 auto;
  padding: 0;
}
.select-disabled {
  background: #77bcf6;
  cursor: not-allowed;
}
.select-title {
  padding-top: 15px;
  float: left;
  width: 110px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #ffffff;
  line-height: 16px;
}
.select-caret {
  padding-top: 15px;
  margin-top: 0;
  width: 36px;
  float: right;
  background: #ffffff;
  border-radius: 0 5px 5px 0;
  height: 54px;
}
.mess {
  padding-top: 45px;
}
.balance-type {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 20px;
}
.balance-amount {
  font-family: PingFangSC-Medium;
  font-size: 30px;
  line-height: 30px;
}
.transfer-panel {
  background: #454f60;
  color: #ffffff;
  border-radius: 5px;
  height: 414px;
}
.transfer-panel .form-horizontal {
  padding-top: 2.9%;
}
.form-horizontal input {
  background: #454f60;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  height: 56px;
}
.transfer-panel span,
.transfer-panel label {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 16px;
  font-weight: unset;
}
.transfer-panel span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #198cee;
  line-height: 16px;
}
.history-panel {
  background: #454f60;
  color: #ffffff;
  border-radius: 5px;
  padding-bottom: 30px;
  margin-bottom: 15px;
}
.history {
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  margin-bottom: 30px;
  margin-left: 30px;
  width: 872px;
}
.history .number {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 20px;
}
.number.out {
  color: #2dde4f;
}
.number.in {
  color: #ff6a6a;
}
.history .address {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  line-height: 16px;
}
.history > div {
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 8px;
  padding-top: 8px;
}
.history .time {
  border-top: 1px solid #b2b2b2;
}
</style>

