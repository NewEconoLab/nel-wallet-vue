<template>
  <main-layout>
    <div class="title-login">
      <span>
        Login your wallet
      </span>
    </div>
    <div>
      <button @click="alert()"></button>
    </div>
    <a class="input-file input-fileup btn btn-nel">
      Select<input size="100" type="file" name="file" id="file" @change="fileChange">
    </a>
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
.input-file {
  display: inline-block;
  position: relative;
  overflow: hidden;
  text-align: center;
  width: auto;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  text-decoration: none;
}
.input-file input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  transform: translate(-300px, 0px) scale(4);
  height: 40px;
  opacity: 0;
  filter: alpha(opacity=0);
}
</style>
