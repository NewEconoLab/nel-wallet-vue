<template>
  <div class="comp-toast" v-if="isshow">
      <div class="img-box">
          <img src="../../static/img/error.png" alt="" v-if="type == 'error'">
          <img src="../../static/img/correct.svg" alt="" v-if="type == 'success'">
      </div>
      <span class="text">{{msg}}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Toast extends Vue {
  @Prop() msg: string;
  @Prop() type: string;
  @Prop() isshow: boolean;
}
</script>

<style lang="less">
.comp-toast {
  padding: 20px 50px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 4px;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%); /* Safari 和 Chrome */
  -moz-transform: translate(-50%, -50%); /* Firefox */
  -ms-transform: translate(-50%, -50%); /* IE 9 */
  -o-transform: translate(-50%, -50%); /* Opera */
  transform: translate(-50%, -50%);
  z-index: 1031;
  .img-box {
    display: inline-block;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
  .text {
    font-size: 16px;
    color: #ffffff;
    line-height: 16px;
    vertical-align: middle;
    margin-left: 10px;
  }
}
</style>
