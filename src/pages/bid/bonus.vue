<template>
    <div class="bonus-wrap">
        <div class="title">
            <span>{{$t('bonus.title1')}}</span>
        </div>
        <div class="form-box">
            <div class="bonus-msg">
                <span>{{$t('bonus.msg')}}: {{claimNum}}</span>
                <!-- <button class="btn btn-nel" :class="{'btn-disabled':(claimNum || claimNum=='0')}" :disabled="(claimNum || claimNum=='0')"  @click="getClaim" v-if="!isClaim">{{$t('btn.claim')}}</button> -->
                <!-- <spinner-wrap :isbig="false" v-if="isClaim"></spinner-wrap> -->
                <!-- <button v-if="isClaim" class="btn btn-nel btn-disabled" disabled>{{$t('btn.claiming')}}</button>
                <span class="wait-msg" v-if="isClaim && claimState==1">{{$t('bonus.wait1')}}</span>
                <span class="wait-msg" v-if="isClaim && claimState==2">{{$t('bonus.wait2')}}</span>
                <span class="wait-msg" v-if="isClaim && claimState==3">{{$t('bonus.wait3')}}</span>
                <span class="wait-msg" v-if="claimState==4">{{$t('bonus.wait4')}}</span> -->
            </div>
        </div>
        <div class="title" v-if="historyList">
            <span>{{$t('bonus.title2')}}</span>
        </div>
        <div class="form-box" v-if="historyList">
            <div class="history-box" v-if="isClaim">{{$t('bonus.wait2')}}</div>
            <div class="history-wrap" v-for="(item,index) in historyList" :key="index">
                <div class="history-box">
                    <div class="history-number dde">+ {{item.value}} CGAS</div>
                    <hr>
                    <div class="history-time">{{item.blocktime}}</div>
                </div>
            </div>
            <div class="page-msg" v-if="isPage">{{pageMsg}}</div>
            <div class="page" v-if="isPage">
                <div class="page-previous" @click="previous">
                    <img src="../../../static/img/lefttrangle.svg" alt="">
                </div>
                <div style="width:1px;"></div>
                <div class="page-next" @click="next">
                    <img src="../../../static/img/righttrangle.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./bonus.ts">
</script>

<style lang="less" scoped>
.bonus-wrap {
  .dde {
    color: #2dde4f;
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 30px;
    margin-bottom: 30px;
    .bonus-msg {
      padding: 20px 0;
      font-size: 16px;
      color: #ffffff;
      span {
        display: inline-block;
        margin-right: 30px;
      }
      .wait-msg {
        margin-left: 10px;
        margin-right: 0;
        font-size: 12px;
        color: #7b7b7b;
      }
    }
    .btn-disabled {
      background: #77bcf6;
      opacity: 1;
      cursor: not-allowed;
    }
    .history-box {
      background: #454f60;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 20px;
      .history-number {
        margin-bottom: 15px;
        font-size: 20px;
      }
      .history-time {
        margin-top: 10px;
        font-size: 12px;
      }
    }

    .page {
      .page-previous,
      .page-next {
        background: #55637b;
      }
    }
  }
}
</style>

