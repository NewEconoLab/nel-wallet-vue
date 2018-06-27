<template>    
    <div class="asset-select-box">
    <div type="button" class="btn dropdown-toggle select-nel" id="assets" data-toggle="dropdown">
        <div class="select-title">{{title}}</div>
        <div class="select-caret">
            <span class="caret"></span>
        </div>
    </div>
    <ul class="dropdown-menu dropdown-nel" role="menu" aria-labelledby="assets">
        <li v-for="(val, key) in list" :key="key"  role="presentation" :class="selection==key?'active':''" @click="switchVal(key)">
            <a role="menuitem" tabindex="-1" >{{val}}</a>
        </li>
    </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Selected extends Vue {
  @Prop() list: Object;
  title: string = "";
  selection: string = "";
  mounted() {
    this.selection = Object.keys(this.list)[0];
    this.switchVal(this.selection);
  }
  switchVal(key) {
    this.selection = key;
    this.title = this.list[key];
    this.$emit("selected", this.selection);
  }
}
</script>

<style lang="less" scoped>
.asset-select-box {
  margin-left: 25px;
  margin-right: 25px;
  display: inline-block;
  position: relative;
  .select-nel {
    background: #198cee;
    border-radius: 5px;
    height: 56px;
    margin: 0 auto;
    padding: 0;
  }
  .select-disabled {
    background: #77bcf6;
    cursor: not-allowed;
  }
  .select-title {
    padding-top: 15px;
    float: left;
    width: 110px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #ffffff;
    line-height: 16px;
  }
  .select-caret {
    width: 36px;
    float: right;
    background: #ffffff;
    border-radius: 0 5px 5px 0;
    height: 54px;
    position: relative;
    .caret {
      // background: #198cee;
      position: absolute;
      top: 50%;
      left: 50%;
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #198cee;
    }
  }
}
</style>