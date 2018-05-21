<template>
  <div class="bubble-box">
    <div class="bubble-png">
      <img src="../../static/img/gift-disable.png"  alt="">
      <!-- <img src='../../static/img/gift.png' v-else alt=""> -->
    </div>
    <div class="bubble-msg disable">
      {{isdisable?$t('nns.msg3'):$t('nns.msg1')}}</div>
    <div class="help-icon">
      <img src="../../static/img/wenhao.png" alt="">
      <div class="help-msg">
        {{$t('nns.msg2')}}
        <div class="triangle-box"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { LoginInfo } from "../tools/entity";

@Component({
  components: {}
})
export default class Bubble extends Vue {
  @Prop({ default: true })
  isdisable: boolean;

  constructor() {
    super();
  }
  mounted() {}

  eventCut() {

    // if (!this.isdisable) {
    //   window.open(
    //     "../../static/event/index.html?walletAddress=" +
    //       LoginInfo.getCurrentAddress()
    //   );
    // }
  }
}
</script>


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
    &.disable {
      background: #b2b2b2;
      color: #ffffff;
      border: 2px solid #7d7d7d;
      border-radius: 5px;
    }
    display: inline-block;
    width: auto;
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
 