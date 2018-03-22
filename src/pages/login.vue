<template>
  <main-layout>
    <div class="title-login">
      <span>
        Login your wallet
      </span>
    </div>
    <div style="height:56px;width:417px;margin:0 auto;">
      <div class="input-group" style="height:56px;">
        <input type="text" class="form-control" style="height:56px; line-height：56px;" disabled="true" v-model="filename">
        <span class="input-group-addon">            
          <button class="btn btn-nel fileinput-button">
              <span>Select</span>
              <input type="file" @change="fileChange">
          </button>
        </span>
      </div>
    </div>	
    <div style="height:56px;width:417px;margin:0 auto; padding-top:40px;">
      <div class="input-group" style="height:56px;">
        <input class="form-control" style="height:56px; line-height：56px;" type="password" v-model="password">
        <span class="input-group-addon">            
          <button class="btn btn-nel fileinput-button" @click="login">
              Login
          </button>
        </span>
      </div>
    </div>	
    <div style="height:36px;padding-top:80px;padding-bottom:30px; text-align:center">or you can</div>
    <div style="width:417px; margin:0 auto; padding-top:30px">
      <button class="btn btn-nel btn-import">Import key from WIF String </button>
    </div>
    
    <div style="width:417px; margin:0 auto; padding-top:20px">
      <button class="btn btn-nel btn-import" @click="modual('nep2')">Import key from nep2 String </button>
    </div>
  </main-layout>
</template>

<script lang="ts" src="./login.ts">
</script>

<style>
.title-login {
  padding-top: 17.1%;
  padding-bottom: 12.2%;
  text-align: center;
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #198cee;
  line-height: 24px;
}        
.input-group-addon{
  padding: 0;
  border: 0;
}
.fileinput-button {
  border: 0;
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 97px;
  height: 56px;
  border-radius: 0px 5px 5px 0px;
}
.fileinput-button input{
    position:absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    /* -ms-filter: 'alpha(opacity=0)'; */
    font-size: 200px;
}
.btn-import{
  width: 417px;
  height: 50px;
  margin: 0 auto;
}
</style>
