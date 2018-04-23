<template>
    <wallet-layout>
        <div class="container">
            <div class="title" style="padding-bottom:28px;">
                <span>NEO Balance</span>
                <div style="float:right">
                    <span class="user-select-ok" style="margin-right: 11px;color:#fff;">Key Address ：{{currentAddress}}</span>
                    <button class="btn" data-toggle="modal" data-target="#selectAddr" :class="chooseAddressarr && chooseAddressarr.length>1 ? 'btn-nel' : 'btn-disabled' ">Switch</button>
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
                        <button class="btn btn-nel" v-if="neoasset.claim>0" @click="toClaimGas">Claim</button>
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
</style>

