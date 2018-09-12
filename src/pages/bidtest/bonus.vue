<template>
    <div class="bonus-wrap">
        <div class="title">
            <span>{{$t('bonus.title')}}</span>
        </div>
        <div class="form-box" v-for="(item,index) in historyList" :key="index">
           <div class="mybonus">
            {{$t('bonus.mydividend')}}<span class="dde">{{item.addrBonus}}</span> CGAS
           </div>
           <div>{{$t('bonus.distribution')}}{{item.totalBonus}} CGas</div>
           <div>{{$t('bonus.mytotal')}}{{item.balance}} NNC</div>
           <div>{{$t('bonus.snapshot')}} {{item.blocktime}}</div>
        </div>
        <div class="page-msg" >{{pageMsg}}</div>
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
    padding: 20px 50px;
    margin-bottom: 20px;
    color: #ffffff;
    div {
      margin-bottom: 10px;
      font-size: 14px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .mybonus {
      font-size: 20px;
    }
  }
  .page {
    .page-previous,
    .page-next {
      background: #55637b;
    }
  }
}
</style>

