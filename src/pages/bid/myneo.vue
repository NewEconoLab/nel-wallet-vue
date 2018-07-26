<template>
    <div class="myneo-box">
        <div class="title">
            <span>{{$t('myneoname.title')}}</span>
        </div>
        <div class="form-box" v-if="neonameList" v-for="(item,index) in neonameList" :key="index">
            <div class="neoname">
                {{item.domain}}
            </div>
            <div class="addr-resolver">( {{$t('myneoname.resolver')}}: {{item.resolver ? item.resolver : $t('myneoname.notconfigure')}} )</div>
            <div class="addr-mapping">( {{$t('myneoname.mapping')}}: {{item.resolverAddress ? item.resolverAddress : $t('myneoname.notconfigure')}} )</div>
            <div class="time-msg" v-if="!item.expired">( {{$t('myneoname.time')}}: {{item.ttl}} <span class="ff6" v-if="!item.expiring">{{$t('myneoname.expiring')}}</span> )</div>
            <div class="time-msg" v-if="item.expired">( {{$t('myneoname.time')}}:  <span class="ff6">{{$t('myneoname.expired')}}</span> )</div>
            <div class="btn-right">
                <button class="btn btn-nel btn-bid" @click="onShowEdit(item)">{{$t('btn.edit')}}</button>
            </div>
        </div>
        <div class="edit-wrap" v-if="isShowEdit">
          <div class="edit-box">
            <div class="edit-title">{{$t('myneoname.edittitle')}}</div>
            <div class="edit-tips">{{$t('myneoname.tips')}}</div>
            <div class="edit-content">
                <div class="edit-name">{{$t('myneoname.neoname')}}: {{domainInfo.domain}}</div>
                <div class="edit-input">
                    <div class="input-msg">
                        {{$t('myneoname.resolver')}}:
                        <button v-if="resolverState==1" class="btn btn-nel btn-input-reset" @click="resetresolve">{{$t('btn.reset')}}</button>
                    </div>
                    <div class="input-box">
                        <input type="text" class="readonly-input" readonly="readonly" v-model="set_contract">
                        <button v-if="resolverState==0" class="btn btn-nel btn-big" @click="setresolve">{{$t('btn.confirm')}}</button>
                        <!-- <button v-if="resolverState==1" class="btn btn-nel btn-big " @click="setresolve">{{$t('btn.reset')}}</button> -->
                        <spinner-wrap v-if="resolverState==2"  style="margin-left:20px"></spinner-wrap>
                        <div class="ok-img" v-if="resolverState==1">
                            <img src="../../../static/img/correct.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="edit-input">
                    <div class="input-msg">
                        {{$t('myneoname.mapping')}}:
                        <button v-if="mappingState==1" @click="resetmappingData" class="btn btn-nel btn-input-reset">{{$t('btn.reset')}}</button>
                    </div>
                    <div class="input-box">
                        <input type="text" v-model="resolverAddress" @input="verifyMapping" class="">
                        <button v-if="mappingState==0" class="btn btn-nel btn-big" @click="mappingData" :disabled="resolverState==0 && !mappingistrue" :class="{'btn-disable':resolverState==0 && !mappingistrue}">{{$t('btn.confirm')}}</button>
                        <!-- <button v-if="mappingState==1" class="btn btn-nel btn-big" @click="mappingData">{{$t('btn.reset')}}</button> -->
                        <spinner-wrap v-if="mappingState==2"  style="margin-left:20px"></spinner-wrap>
                        <!-- 地址格式验证 -->
                        <div v-if="mappingState==1" class="ok-img">
                            <img src="../../../static/img/correct.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="edit-input">
                    <div class="input-msg">
                        {{$t('myneoname.time')}}:
                    </div>
                    <div class="input-box">
                        <input type="text" class="readonly-input" readonly="readonly" :value="domainInfo.expired?$t('myneoname.expired'):domainInfo.ttl">
                        <button v-if="!domainInfo.expired&&!domainInfo.expiring &&!renewalWatting" class="btn btn-nel btn-big" @click="renewalDomain">{{$t('btn.renewal')}}</button>
                        <button  v-if="(domainInfo.expired||domainInfo.expiring) &&!renewalWatting"  class="btn btn-nel btn-big btn-disable" disabled>{{$t('btn.renewal')}}</button>
                        <spinner-wrap v-if="renewalWatting"  style="margin-left:20px"></spinner-wrap>
                    </div>
                </div>
            </div>
            <div class="edit-close">
              <span aria-hidden="true" @click="isShowEdit=!isShowEdit">&times;</span>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts" src="./myneo.ts">
</script>

<style lang="less" scoped>
.myneo-box {
  .ff6 {
    color: #ff6a6a;
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 20px 50px 10px 50px;
    font-size: 14px;
    margin-bottom: 20px;
    position: relative;
    .neoname {
      font-size: 16px;
    }
    .neoname,
    .addr-resolver,
    .addr-mapping,
    .time-msg {
      margin-bottom: 10px;
    }
    .btn-right {
      position: absolute;
      top: 50%;
      right: 30px;
      margin-top: -19px;
      .btn-bid {
        padding: 0;
        font-size: 18px;
        width: 110px;
        height: 38px;
        &.btn-disable {
          font-size: 14px;
        }
      }
    }
  }
  .edit-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: 1030;
    .edit-box {
      background: #454f60;
      padding: 30px 50px 50px 50px;
      width: 80%;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border-radius: 5px;
      font-size: 16px;
      .edit-title {
        font-size: 20px;
      }
      .edit-tips {
        font-size: 14px;
        color: #c5c5c5;
        margin-top: 20px;
      }
      .edit-content {
        .edit-name {
          margin-top: 50px;
        }
        .edit-input {
          margin-top: 50px;
          .input-msg {
            .btn-input-reset {
              width: 80px;
              height: 30px;
              font-size: 14px;
              padding: 0;
              line-height: 30px;
              text-align: center;
              margin-left: 15px;
            }
          }
          .input-box {
            margin-top: 20px;
            input {
              width: 68%;
              height: 56px;
              background: none;
              border: 1px solid #b2b2b2;
              border-radius: 5px;
              vertical-align: middle;
              margin-bottom: 0;
              color: #c5c5c5;
              &.readonly-input {
                background: #6d7480;
              }
            }
            button {
              vertical-align: middle;
              &.btn-disable {
                background: #77bcf6;
                opacity: 1;
              }
            }
            .ok-img {
              display: inline-block;
              vertical-align: middle;
              margin-left: 20px;
              img {
                width: 24px;
                height: 24px;
              }
            }
          }
        }
      }
      .edit-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-size: 30px;
      }
    }
  }
}
</style>
