<template>
        <div class="container">
            <div class="title">
                <span>{{$t('setting.settings')}}</span>
            </div>
            <div class="panel panel-default settings">
                <div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        <span>{{$t('setting.title1')}} : &nbsp;<span class="user-select-ok">{{address}}</span></span>
                    </div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        <span>{{$t('setting.title2')}} : &nbsp;&nbsp;</span>
                        <button class="btn btn-nel" @click="visibleWif">{{$t('setting.btn1')}}</button>
                        <span class="user-select-ok">&nbsp;&nbsp;{{wif}}</span>
                    </div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        <span>{{$t('setting.title3')}} : &nbsp;&nbsp;</span>
                        <button class="btn btn-nel" @click="download">{{$t('setting.btn2')}}</button> &nbsp;&nbsp;
                        <a v-if="href!=''" :download="walletname" :href="href">{{$t('setting.btn3')}}</a>
                    </div>
                    <div style="padding-top: 2.8%; padding-bottom: 0.9%; padding-left: 2.3%;">
                        <p>{{$t('setting.msg1')}} <br> {{$t('setting.msg2')}} 
                        </p>
                    </div>
                </div>
            </div>
        </div>
</template>

<script lang="ts" src="./settings.ts">
</script>

<style>
.settings span {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #198cee;
  line-height: 16px;
}
</style>
