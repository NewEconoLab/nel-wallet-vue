<template>
  <div class="alert-box" v-if="show">
    <div class="alert-warp">
      <div class="alert-title">Edit information</div>
      <div class="alert-content">
        <slot></slot>
      </div>
      <div class="alert-close" @click="closemudloe()">
        <!-- <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> -->
        <span aria-hidden="true">&times;</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Spinner from "./Spinner.vue";
import { NNSTool } from "../tools/nnstool";
import { Consts, LoginInfo } from "../tools/entity";

@Component({
  components: {
    "spinner-wrap": Spinner
  }
})
export default class Valert extends Vue {
  show: boolean = false;
  constructor() {
    super();
  }

  closemudloe() {
    this.show = false;
  }
  mounted() {}
}
</script>

<style lang="less" scoped >
.alert-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  z-index: 1030;
  .alert-warp {
    background: #fff;
    padding: 30px 50px 0 50px;
    width: 1000px;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .alert-title {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      margin-bottom: 50px;
    }
    .alert-content {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      line-height: 16px;
      .content {
        margin-bottom: 50px;
        .warning-msg {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ff6a6a;
          line-height: 16px;
        }
        .input-warp {
          margin-top: 20px;
          .input-ico {
            padding: 20px;
            height: 56px;
            width: 700px;
            margin-bottom: 0;
            vertical-align: middle;
          }
          .input-disabled {
            cursor: not-allowed;
            background: #ddd;
          }
          .icon-verify {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #2dde4f;
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
          }
          .btn-verify-warp {
            margin-left: 20px;
            display: inline-block;
            vertical-align: middle;
            .btn-verify {
              padding: 19px 25px;
            }
            .btn-disabled {
              background: #77bcf6;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .alert-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 30px;
      font-size: 30px;
    }
  }
}
</style>
