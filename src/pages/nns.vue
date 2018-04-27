<template>
  <wallet-layout>
    <div class="container ">
      <div class="title">
        <span>Register Neo Name</span>
      </div>
      <div class="form-inline">
        <div class="input-group nns-register" v-bind:class="domainerr?'input-err':'input-success'">
          <input @input="verifyDomain" type="text" class="nel" v-model="nnsstr" placeholder="type a name">
          <span class="input-group-addon nel ">
            <span>{{network}}</span>
          </span>
        </div>
        <button class="btn btn-nel btn-big" @click="nnsRegister">Register</button>
        <div style="padding-left:50px">
          <span>{{errmsg}}</span>
        </div>
      </div>

      <div class="title">
        <span>My Neo Name</span>
      </div>
      <div class="form-inline" v-for="domain in domainarr" :key="domain.domainname">
        <span class="domainname">
          {{domain.domainname}}
        </span>
        <br>
        <span class="msg-null" v-if="!domain.reslove">
          ( not configured )
        </span>
        <span class="domainname"></span>
        <button class="btn btn-nel" style="float:right;margin-right:50px" @click="resolve(domain.domainname)">Edit</button>
      </div>
    </div>
    <v-alert ref="alert"></v-alert>
  </wallet-layout>
</template>

<script lang="ts" src="./nns.ts">
</script>

<style scoped>
.input-err {
  box-shadow: 0 0 3px 0 rgba(255, 106, 106, 0.5);
}
.input-success {
  box-shadow: 0 0 3px 0 rgba(45, 222, 79, 0.5);
}
.container .form-inline {
  background: #454f60;
  padding-top: 50px;
  padding-bottom: 60px;
  border-radius: 5px;
  margin-bottom: 20px;
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
  margin: 0 auto;
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
.domainname {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  line-height: 16px;
  padding-left: 50px;
}
.msg-null {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #c5c5c5;
  line-height: 14px;
  padding-left: 50px;
}

h4 {
  margin-left: 20px;
}
p {
  text-align: center;
}
</style>

