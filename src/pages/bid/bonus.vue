<template>
    <div class="bonus-wrap">
        <div class="title">
            <span>Bouns</span>
        </div>
        <div class="form-box">
            <div class="bonus-msg">
                <span>SGas available to claim : 0.12345678</span>
                <button class="btn btn-nel">Claim</button>
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

