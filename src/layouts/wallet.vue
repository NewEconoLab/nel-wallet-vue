<template>
  <main-layout>
    <nav class="navbar navbar-wallet">
      <div class="container">
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <v-link href="#balance">
                <span class="icon-balance-select"></span> Balance
              </v-link>
            </li>
            <li>
              <v-link href="#transfer">
                <span class="icon-transfer-unselect"></span> Transfer
              </v-link>
            </li>
            <li>
              <v-link href="#nns">
                <span class="icon-nns-unselect"></span> NNS
              </v-link>
            </li>
            <li>
              <v-link href="#settings">
                <span class="icon-setting-unselect"></span> Settings
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

<script>
import MainLayout from "./Main.vue";
import VLink from "../components/VLink.vue";

export default {
  components: {
    VLink,
    MainLayout
  }
};
</script>
<style>
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
</style>

