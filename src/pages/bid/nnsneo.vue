<template>
    <div class="container ">
        <div class="title-menu">
            <ul class="menu-box">
               <li :class="{active:isActive('auction')}" > <router-link class="router-li" to="/nnsneo/auction"> {{$t('nnsneo.auction')}}</router-link></li>
               <li :class="{active:isActive('myneoname')}"><router-link class="router-li" to="/nnsneo/myneoname" >{{$t('nnsneo.myneoname')}}</router-link></li>                
               <li :class="{active:isActive('bonus')}"><router-link class="router-li" to="/nnsneo/bonus">{{$t('nnsneo.bonus')}}</router-link></li>  
               <li :class="{active:isActive('tutorial')}"><router-link class="router-li" to="/nnsneo/tutorial">{{$t('nnsneo.tutorial')}}</router-link></li>              
            </ul>
        </div>
        <router-view class="content-box">
        </router-view>
    </div>
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
        &.active {
          position: relative;
          .router-li {
            color: #fff;
          }
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
        .router-li {
          list-style: none;
          color: #b2b2b2;
          text-decoration: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>


