<template>
  <div class="main-content">
    <nav class="navbar navbar-nel navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">{{$t('navbar.toggle')}}</span>
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
              <a href="https://scan.nel.group/#testnet" target="_blank">{{$t('navbar.explorer')}}</a>
            </li>
            <li>
              <a class="active-nel" >{{$t('navbar.wallet')}}</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="text" id="network">{{$t('navbar.testnet')}}</span>
                <span class=" caret"></span>
              </a>
              <ul class="dropdown-menu dropdown-nel">
                <li id="testnet-btn" class="active">
                  <a id="testa">{{$t('navbar.testnet')}}</a>
                </li>
                <li id="mainnet-btn">
                  <a target="_blank" href="https://wallet.nel.group/login" id="maina">{{$t('navbar.mainnet')}}</a>
                </li>
              </ul>
            </li>
            <li v-if="loginshow">
              <router-link to="login" >{{$t('navbar.logout')}}</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <span class="text">{{currentLanguage}}</span>
                <span class=" caret"></span>
              </a>
              <ul class="dropdown-menu dropdown-nel">
                <li id="testnet-btn" :class="currentLanguage=='English'?'active':''">
                  <a  @click="cutLanguage(1)">English</a>
                </li>
                <li id="mainnet-btn" :class="currentLanguage!='English'?'active':''">
                  <a @click="cutLanguage(2)" >中文</a>
                </li>
              </ul>
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
import { tools } from "../tools/importpack";
@Component({
  components: {
    VLink
  }
})
export default class Main extends Vue {
  loginshow: boolean = false;
  currentLanguage: string = sessionStorage.getItem("language") == "cn"
    ? "中文"
    : "English";
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

  cutLanguage(lang: number) {
    switch (lang) {
      case 1:
        this.currentLanguage = "English";
        sessionStorage.setItem("language", "en");
        this.$i18n.locale = "en";
        break;
      case 2:
        this.currentLanguage = "中文";
        sessionStorage.setItem("language", "cn");
        this.$i18n.locale = "cn";
        break;
      default:
        break;
    }
  }
}
</script>

<style>
.active-nel {
  border-bottom: 4px solid #ffffff;
}
.main-content {
  padding-bottom: 80px;
}
</style>
