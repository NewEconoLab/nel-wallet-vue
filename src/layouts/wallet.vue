<template>
  <main-layout>
    <nav class="navbar navbar-wallet" >
      <div class="container">
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <v-link href="#explorer">Balance</v-link>
            </li>
            <li>
              <v-link href="#wallet">Transfer</v-link>
            </li>
            <li>
              <v-link href="#login">NNS</v-link>
            </li>
            <li>
              <v-link href="#generate">Settings</v-link>
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
  import MainLayout from './Main.vue'
import VLink from "../components/VLink.vue";

  export default {    
    components: {
        VLink,
        MainLayout
    }
  }
</script>
<style>
.navbar-wallet{
    padding-top: 51px;
    background-color: #454F60;
    height: 132px;
}
.navbar-wallet .navbar-collapse{
    padding-top: 30px;
}
.navbar-wallet a{
    font-size: 16px;
    color: #B2B2B2;
    line-height: 16px;
}
.navbar-wallet .active{
    background: #151A1E;
    border-radius: 5px 5px 0px 0px;
}
</style>

