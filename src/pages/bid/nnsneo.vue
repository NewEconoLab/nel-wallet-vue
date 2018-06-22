<template>
  <wallet-layout>
    <div class="container ">
        <div class="title-menu">
            <ul class="menu-box">
                <li :class="{'active' : showType == 1}" @click="showType = 1">{{$t('nnsneo.auction')}}</li>
                <li :class="{'active' : showType == 2}" @click="showType = 2">{{$t('nnsneo.exchange')}}</li>
                <li :class="{'active' : showType == 3}" @click="showType = 3">{{$t('nnsneo.myneoname')}}</li>
                <li :class="{'active' : showType == 4}" @click="showType = 4">{{$t('nnsneo.bonus')}}</li>
            </ul>
        </div>
        <div class="content-box">
            <neo-auction v-if="showType == 1"></neo-auction>
            <exchange v-if="showType == 2"></exchange>
            <my-neo v-if="showType == 3"></my-neo>
            <bonus v-if="showType == 4"></bonus>
        </div>
    </div>
  </wallet-layout>
</template>

<script lang="ts" src="./nnsneo.ts">
</script>

<style lang="less" scoped>
.container {
  color: #fff;
  .title-menu {
    height: auto;
    font-size: 16px;
    color: #b2b2b2;
    margin-top: -10px;
    .menu-box {
      border-bottom: 1px solid #454f60;
      li {
        display: inline-block;
        line-height: 58px;
        list-style: none;
        margin-right: 90px;
        margin-left: -40px;
        &:hover {
          cursor: pointer;
        }
        &.active {
          color: #fff;
          position: relative;
          &::after {
            content: "";
            width: 100%;
            height: 4px;
            background-color: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
}
</style>


