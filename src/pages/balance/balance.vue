<template>
  <wallet-layout>
    <div class="container">
      <div class="title" style="padding-bottom:28px;">
        <span>{{$t('balance.title1')}}</span>
        <div style="float:right">
          <span class="user-select-ok" style="margin-right: 11px;color:#fff;">{{$t('balance.title2')}}：{{currentAddress}}</span>
          <button class="btn" data-toggle="modal" data-target="#selectAddr" v-if="chooseAddressarr &&chooseAddressarr.length>1">{{$t('btn.switch')}}</button>
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
            <span style="vertical-align: super;margin-left: 10px;">
              <button class="btn btn-nel" v-if="gettingGas" @click="getTestGas" :disabled="isgetGas" :class="{'btn-disabled':isgetGas}">{{$t('btn.getGas')}}</button>
              <span v-if="!gettingGas">
                <spinner-wrap :isbig="false" ></spinner-wrap>
              </span>
              <v-hint>
                <div class="hint-img">
                  <img src="../../../static/img/notice.png" alt="" style="width:20px;height:20px;">                         
                </div>
                <div class="hint-content hint-otherwidth">
                    {{$t('balance.tips')}}
                </div>
              </v-hint>
            </span>
            <v-toast ref="toast" ></v-toast>
          </div>
          <div class="claim" style="padding: 30px; padding-left: 2.3%;">
            <span style="margin-right: 17px;">{{$t('balance.title3')}} : {{neoasset.claim}}</span>
            <button class="btn btn-nel" v-if="neoasset.claim!='0'&&claimbtn" @click="toClaimGas">{{$t('btn.claim')}}</button>
            <span v-if="!claimbtn">
              <spinner-wrap :isbig="false"></spinner-wrap>
            </span>
            <span class="loadmsg">&nbsp;{{loadmsg}}</span>
          </div>
        </div>
      </div>
      <div class="balance-asset" v-if="balances.length">
        <div class="title">
          <span>{{$t('balance.title4')}}</span>
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
              <span class="btn btn-transfer" @click="toTransfer(balance.asset)">{{$t('btn.transfer')}}</span>
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
            <h4 class="modal-title" id="exampleModalLabel">{{$t('balance.title5')}}</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputFile">{{$t('balance.title6')}}:</label>
                <div class="radio" id="selectAddress">
                  <label v-for="item in chooseAddressarr" :key="item.address">
                    <input type="radio" v-model="chooseAddress" :value="item.address" autocomplete="off">{{item.address}}
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('btn.close')}}</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addressSwitch()">{{$t('btn.confirm')}}</button>
          </div>
        </div>
      </div>
    </div>
  </wallet-layout>
</template>

<script lang="ts" src="./balance.ts">
</script>
<style scoped>
.btn-transfer {
  border: 1px solid #ffffff;
  border-radius: 5px;
}
.btn-disabled,
.btn-disabled:hover {
  background: #77bcf6;
  opacity: 1;
  cursor: not-allowed;
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
</style>

