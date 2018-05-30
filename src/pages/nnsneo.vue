<template>
  <wallet-layout>
    <div class="container ">
        <div class="title-menu">
            <ul class="menu-box">
                <li class="active">Neo Name Auction</li>
                <li>SGas Exchange</li>
                <li class="active">My Neo Name</li>
                <li>Bonus</li>
            </ul>
        </div>
        <div class="content-box">
            <neoname-auction></neoname-auction>
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


