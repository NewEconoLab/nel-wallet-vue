<template>
  <div class="">
    <nav class="navbar navbar-nel navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- <a class="navbar-brand" href="#"><img width="40" height="40" src="../assets/favicon.png" alt=""></a> -->
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <div class="logo"></div>
          <ul class="nav navbar-nav navbar-left">
            <li>
              <a href="https://scan.nel.group/#mainnet" target="_blank">Explorer</a>
            </li>
            <li>
              <a class="active-nel" href="#wallet">Wallet</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="text" id="network">MainNet</span>
                <span class=" caret"></span>
              </a>
              <ul class="dropdown-menu dropdown-nel">
                <li id="testnet-btn">
                  <a id="testa">TestNet</a>
                </li>
                <li id="mainnet-btn" class="active">
                  <a id="maina">MainNet</a>
                </li>
              </ul>
            </li>
            <li v-if="loginshow">
              <v-link ref="login" href="#login">logout</v-link>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container -->
    </nav>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import VLink from "../components/VLink.vue";
import Component from "vue-class-component";
import Vue from "vue";
import { StorageTool } from "../tools/storagetool";
@Component({
  components: {
    VLink
  }
})
export default class Main extends Vue {
  loginshow: boolean = false;
  mounted() {
    if (this.$root["currentRoute"] == "") {
      this.$root["currentRoute"] = "#login";
    }
    if (this.$root["currentRoute"] == "#login") {
      document.body.classList.add("login-body");
      this.loginshow = false;
    } else {
      document.body.classList.remove("login-body");
      this.loginshow = true;
    }
  }
}
</script>

<style>
.active-nel {
  border-bottom: 4px solid #ffffff;
}
</style>
