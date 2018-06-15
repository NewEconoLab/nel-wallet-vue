<template>
    <div class="bonus-wrap">
        <div class="title">
            <span>Bouns</span>
        </div>
        <div class="form-box">
            <div class="bonus-msg">
                <span>SGas available to claim : {{claimNum}}</span>
                <button class="btn btn-nel">Claim</button>
                <spinner-wrap :isbig="false"></spinner-wrap>
                <span class="wait-msg">Sending a transaction...</span>
                <span class="wait-msg">Waiting for confirmation of transfer...</span>
                <span class="wait-msg">SGas claiming...</span>
                <span class="wait-msg">Your SGas claim is successful!</span>
            </div>
        </div>
        <div class="title">
            <span>History</span>
        </div>
        <div class="form-box">
            <div class="history-box">
                <div class="history-number dde">+ 20 SGas</div>
                <hr>
                <div class="history-time">12:38:10 2018-02-24</div>
            </div>
            <div class="page-msg">History 1 to 5 of 8</div>
            <div class="page">
                <div class="page-previous">
                    <img src="../../../static/img/lefttrangle.svg" alt="">
                </div>
                <div style="width:1px;"></div>
                <div class="page-next">
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
    .bonus-msg {
      padding: 20px 0;
      font-size: 16px;
      color: #ffffff;
      span {
        display: inline-block;
        margin-right: 30px;
      }
      .wait-msg{
          margin-left:10px;
          margin-right:0;
          font-size:12px;
          color:#7B7B7B;
      }
    }
    .history-box {
      background: #454f60;
      border: 1px solid #b2b2b2;
      border-radius: 5px;
      padding: 15px;
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

