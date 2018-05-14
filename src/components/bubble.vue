<template>
  <div class="bubble-box">
    <div class="bubble-png">
      <img src="../../static/img/gift.png" alt="">
    </div>
    <div class="bubble-msg">You get a reward of 50 NNCs ！</div>
    <div class="help-icon">
      <img src="../../static/img/wenhao.png" alt="">
      <div class="help-msg">
        You will be rewarded with 50 NNCs on Mainnet for the first time you map your wallet address to an ending in ".test " name successfully.
        <div class="triangle-box"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bubble-box {
  display: inline-block;
  margin-left: 45px;
  position: relative;
  .bubble-png {
    position: absolute;
    top: -13px;
    left: -28px;
    width: 48px;
    height: 52px;
    img {
      width: 100%;
    }
  }
  .bubble-msg {
    display: inline-block;
    width: 240px;
    padding: 11px 11px 11px 25px;
    font-size: 12px;
    color: #ffffff;
    line-height: 12px;
    background: #56c3f3;
    border: 2px solid #fff480;
    border-radius: 5px;
  }
  .help-icon {
    display: inline-block;
    margin-left: 10px;
    position: relative;
    img {
      width: 20px;
      height: 20px;
    }
    .help-msg {
      display: none;
      position: absolute;
      top: -73px;
      right: -194px;
      width: 395px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #b2b2b2;
      font-size: 12px;
      color: #333333;
      line-height: 14px;
      text-align: left;
      padding: 10px 25px;
      .triangle-box {
        position: absolute;
        bottom: -20px;
        left: 180px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top: 10px solid #fff;
      }
    }
    &:hover {
      .help-msg {
        display: block;
      }
    }
  }
}
</style>
