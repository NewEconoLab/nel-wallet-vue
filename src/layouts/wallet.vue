<template>
  <main-layout>
    <nav class="navbar navbar-wallet">
      <div class="container">
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <v-link ref="balance" href="#balance">
                <span :class="[balance]"></span> Balance
              </v-link>
            </li>
            <li>
              <v-link ref="transfer" href="#transfer">
                <span :class="[transfer]"></span> Transfer
              </v-link>
            </li>
            <li>
              <v-link ref="nns" href="#nns">
                <span :class="[nns]"></span> NNS
              </v-link>
            </li>
            <li>
              <v-link ref="setting" href="#settings">
                <span :class="[setting]"></span> Settings
              </v-link>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container -->
    </nav>

    <slot></slot>
  </main-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MainLayout from "./Main.vue";
import VLink from "../components/VLink.vue";
@Component({
  components: {
    VLink,
    MainLayout
  }
})
export default class FeatureComponent extends Vue {
  balance: string;
  transfer: string;
  nns: string;
  setting: string;
  constructor() {
    super();
    this.balance = "";
    this.nns = "";
    this.transfer = "";
    this.setting = "";
  }

  mounted() {
    this.balance = this.$refs["balance"]["isActive"]
      ? "icon-balance-select"
      : "icon-balance-unselect";
    this.transfer = this.$refs["transfer"]["isActive"]
      ? "icon-transfer-select"
      : "icon-transfer-unselect";
    this.nns = this.$refs["nns"]["isActive"]
      ? "icon-nns-select"
      : "icon-nns-unselect";
    this.setting = this.$refs["setting"]["isActive"]
      ? "icon-setting-select"
      : "icon-setting-unselect";
  }
}
</script>
<style>
.container {
  padding-left: 0px;
  padding-right: 0px;
}
.container #navbar {
  padding-left: 0px;
  padding-right: 0px;
}
.navbar-wallet {
  padding-top: 51px;
  background-color: #454f60;
  height: 132px;
}
.navbar-wallet .navbar-collapse {
  padding-top: 30px;
}
.navbar-wallet a {
  font-size: 16px;
  color: #b2b2b2;
  line-height: 16px;
}
.navbar-wallet .active {
  background: #151a1e;
  border-radius: 5px 5px 0px 0px;
}
.navbar-wallet li {
  width: 182px;
  text-align: center;
}
</style>

