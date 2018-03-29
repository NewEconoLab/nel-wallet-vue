<template>
  <wallet-layout>
    <div class="container">
      <div class="title">
        <span>Register Neo Name</span>
      </div>
      <div class="form-inline">
        <div class="input-group nns-register" v-bind:class="{ 'input-err': domainerr }">
          <input @input="verifyDomain" type="text" class="form-control nel" v-model="nnsstr" placeholder="type a name">
          <span class="input-group-addon nel ">
            <Span>{{network}}</Span>
          </span>
        </div>
        <button class="btn btn-nel" @click="nnsRegister">Register</button>
        <div>
          <span>{{errmsg}}</span>
        </div>
      </div>
    </div>
  </wallet-layout>
</template>

<script lang="ts" src="./nns.ts">
</script>

<style>
.input-err {
  box-shadow: 0 0 3px 0 rgba(255, 106, 106, 0.5);
}
.container .title {
  padding-bottom: 20px;
}
.container .form-inline {
  background: #454f60;
  padding-top: 50px;
  padding-bottom: 60px;
}
.nns-register {
  background: #454f60;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  width: 400px;
  margin-bottom: 0px;
  height: 56px;
  margin-left: 50px;
}
.nns-register > input,
.nns-register > span {
  background: #454f60;
  border: 0;
  height: 56px;
  line-height: 16px;
  font-size: 16px;
}
.container .form-inline > input {
  background: #454f60;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  width: 400px;
  margin-bottom: 0px;
  height: 56px;
  margin-left: 50px;
}
.container .btn {
  height: 56px;
  width: 138px;
  margin-left: 20px;
}
</style>

