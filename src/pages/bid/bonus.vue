<template>
    <div class="bonus-wrap">
      <div class="bonus-tips">注意: 为了防止自动分红所造成的网络拥堵，我们在NNS分红上增加了手动申请的步骤，您需要点击申请来获得您的分红，分红会在您申请的一周内发放。</div>
      <div class="title">
            <span>分红</span>
        </div>    
        <div class="form-box">
            <div class="nnc-wrap">
              <strong>累计可领取分红 : <span class="dde">0</span> CGAS</strong>
            </div>
            <div class="btn-right">
                <!-- <button class="btn btn-nel btn-bid" @click="toGetMyNNC">提取</button> -->
                <button class="btn btn-nel btn-bid btn-disable">申请</button>                  
            </div>
        </div>
        <div class="title">
            <span>{{$t('bonus.title')}}</span>
        </div>
        <div class="form-box">
          <div class="mybonus-wrap" v-for="(item,index) in historyList" :key="index">
            <!-- <div class="mybonus">
            {{$t('bonus.mydividend')}}<span class="dde">{{item.addrBonus}}</span> CGAS
            </div> -->
            <div class="linetop-text">{{$t('bonus.distribution')}}{{item.totalValue}} CGas</div>
            <div class="linetop-text">{{$t('bonus.mytotal')}}{{item.balance}} NNC</div>
            <hr>
            <div class="linedown-text">{{$t('bonus.snapshot')}} {{item.blocktime}}</div>
          </div> 
          <div class="page-msg" >第{{pageUtil.currentPage}}页，共{{pageUtil.totalPage}}页</div>
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
        <div class="title">
            <span>{{$t('bonus.title')}}</span>
        </div>
        <div class="form-box">
           <div class="mybonus-wrap" v-for="(item,index) in bonusList" :key="index">
            <!-- <div class="mybonus">
            {{$t('bonus.mydividend')}}<span class="dde">{{item.addrBonus}}</span> CGAS
            </div> -->
            <div class="linetop-text mybonus-text"><span class="dde">+{{item.send}}</span> CGas</div>
            <hr>
            <div class="linedown-text">{{item.blocktime}}</div>
          </div> 
          <div class="page-msg" >第{{myBonusPageUtil.currentPage}}页，共{{myBonusPageUtil.totalPage}}页</div>
          <div class="page" v-if="isBonusPage">
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
  .bonus-tips {
    font-size: 14px;
    color: #c5c5c5;
    margin-top: 50px;
  }
  .btn {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    &.btn-disable {
      background: #77bcf6;
      opacity: 1;
    }
  }
  .form-box {
    background: #454f60;
    border-radius: 5px;
    padding: 30px 50px;
    margin-bottom: 20px;
    color: #ffffff;
    position: relative;
    .nnc-wrap {
      padding: 15px 0;
      strong {
        font-size: 20px;
        font-weight: 500;
        span {
          font-size: 30px;
        }
      }
    }
    .mybonus-wrap {
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      padding: 20px 15px 10px 15px;
      margin-bottom: 20px;
      .linetop-text {
        font-size: 14px;
        color: #ffffff;
        margin-bottom: 15px;
        &.mybonus-text {
          font-size: 20px;
        }
      }
      hr {
        margin-top: 0;
        margin-bottom: 10px;
      }
      .linedown-text {
        font-size: 12px;
        color: #ffffff;
      }
    }
    // div {
    //   margin-bottom: 10px;
    //   font-size: 14px;
    //   &:last-child {
    //     margin-bottom: 0;
    //   }
    // }
    // .mybonus {
    //   font-size: 20px;
    // }
    .btn-right {
      position: absolute;
      top: 50%;
      right: 30px;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      .status-text {
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 30px;
      }
    }
  }
  .page {
    .page-previous,
    .page-next {
      background: #55637b;
      cursor: pointer;
      &.notallow {
        background: #33393d;
        cursor: not-allowed;
      }
    }
  }
}
</style>

