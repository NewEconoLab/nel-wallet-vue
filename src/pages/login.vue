<template>
  <main-layout>
    <div style="height:180px"></div>
    <div class="container">
      <div class="row login-container">
        <div class="col-xs-2">
          <div style="height:116px;text-align:center;margin:0 auto; line-height:116px;"><img src="../../static/img/NeoLogo.svg" alt=""></div>
          <div style="text-align:center;height:70px;background: #198CEE;border-radius: 10px 0 0 10px;">
            <v-link ref="login" href="#login">login</v-link>
          </div>
        </div>
        <div class="col-xs-10 login-right">
          <div v-if="moudle_nep6" class="nep6-imp">

            <div class="title-login">
              <span>
                Login your wallet
              </span>
            </div>
            <div style="height:56px;width:417px;margin:0 auto;">
              <div class="input-group" style="height:56px;">
                <input type="text" class="form-control" placeholder="Select keystore file. " style="height:56px; line-height：56px;" disabled="true" v-model="filename">
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
                <input class="form-control" placeholder="Enter password. " style="height:56px; line-height：56px;" type="password" v-model="password">
                <span class="input-group-addon">
                  <button class="btn btn-nel fileinput-button" @click="login('nep6')">
                    Login
                  </button>
                </span>
              </div>
            </div>
            <div style="height:36px;padding-top:80px;padding-bottom:30px; text-align:center">
              <hr width="80%" color="#987cb9">
              <div class="hr-more">or you can</div>
            </div>
            <div style="width:417px; margin:0 auto; padding-top:30px">
              <button class="btn btn-nel btn-import" @click="cutModual('wif')">Import key from WIF String </button>
            </div>

            <div style="width:417px; margin:0 auto; padding-top:20px;padding-bottom: 5.9%;">
              <button class="btn btn-nel btn-import" @click="cutModual('nep2')">Import key from nep2 String </button>
            </div>

          </div>
          <div v-if="moudle_wif" class="wif_imp">
            <div class="title-login">
              <span>WIF Private Key</span>
            </div>
            <div class="nel-input-blg"><input type="text" placeholder="Enter your private key. " v-model="wif"></div>
            <div class="login-btn">
              <button class="btn btn-nel btn-import" @click="login('wif')">Login</button>
            </div>
            <div class="back">
              <a @click="cutModual('nep6')">&lt; Back</a>
            </div>
          </div>
          <div v-if="moudle_nep2" class="nep2_imp">
            <div class="title-login">
              <span>Nep2</span>
            </div>
            <div class="nel-input-blg"><input type="text" placeholder="Enter your Nep2. " v-model="nep2"></div>
            <div class="nel-input-blg"><input type="password" placeholder="Enter password. " v-model="nep2pwd"></div>
            <div class="login-btn">
              <button class="btn btn-nel btn-import" @click="login('nep2')">Login</button>
            </div>
            <div class="back">
              <a @click="cutModual('nep6')">&lt; Back</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script lang="ts" src="./login.ts">
</script>

<style>
.login-btn {
  width: 417px;
  margin: 0 auto;
}
.nep2_imp .login-btn {
  padding-bottom: 7.1%;
}
.wif_imp .login-btn {
  padding-bottom: 11.1%;
  padding-top: 4.9%;
}
.wif_imp input {
  font-size: 16px;
  line-height: 16px;
}
.back {
  padding-bottom: 8.4%;
  width: 417px;
  margin: 0 auto;
}
.back > a {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #b2b2b2;
  line-height: 18px;
}
.wif_imp .title-login {
  padding-top: 13.3%;
  padding-bottom: 13.4%;
}
.nep2_imp .title-login {
  padding-top: 13.3%;
  padding-bottom: 7.8%;
}
.nep2_imp .nel-input-blg {
  margin-bottom: 4.3%;
}
.nep6-imp .title-login {
  padding-bottom: 13.4%;
  padding-top: 5.9%;
}
.title-login {
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #198cee;
  line-height: 30px;
  text-align: center;
}
.nel-input-blg {
  border-radius: 5px;
  width: 417px;
  height: 56px;
  margin: 0 auto;
}
.nel-input-blg > input {
  height: 100%;
}
.hr-more {
  height: 20px;
  width: 129px;
  position: relative;
  left: 50%;
  top: -30px;

  font: normal 1.2em/20px;
  vertical-align: middle;
  text-align: center;
  border-radius: 4px;
  background-color: #ffffff;
}
.login-container {
  background: #ffffff;
  box-shadow: 0 2px 10px 0 #2c80c8;
  border-radius: 10px;
}
.login-container .login-right {
  background: #ffffff;
  box-shadow: -3px 0 4px 0 #d1e8fc;
  border-radius: 0 10px 10px 0;
}
.input-group-addon {
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
.fileinput-button input {
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
  /* -ms-filter: 'alpha(opacity=0)'; */
  font-size: 200px;
}
.btn-import {
  width: 417px;
  height: 50px;
  margin: 0 auto;
}
</style>
