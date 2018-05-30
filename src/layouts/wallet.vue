<template>
  <main-layout>
    <nav class="navbar navbar-wallet">
      <div class="container">
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <v-link ref="balance" href="#balance">
                <span :class="[balance]"></span> {{$t('balance.balance')}}
              </v-link>
            </li>
            <li>
              <v-link ref="transfer" href="#transfer">
                <span :class="[transfer]"></span> {{$t('transfer.transfer')}}
              </v-link>
            </li>
            <li>
              <v-link ref="nnsneo" href="#nnsneo">
                <span :class="[nnsneo]"></span> NNS(.neo)
              </v-link>
            </li>
            <li>
              <v-link ref="nns" href="#nns">
                <span :class="[nns]"></span> {{$t('nns.nns')}}
              </v-link>
            </li>
            <li>
              <v-link ref="setting" href="#settings">
                <span :class="[setting]"></span> {{$t('setting.settings')}}
              </v-link>
            </li>
          </ul>
          <div class="blockheight">{{$t('navbar.blockheight')}}：{{blockheight}}</div>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container -->
    </nav>

    <slot></slot>
  </main-layout>
</template>

<script lang="ts" src="./wallet.ts">
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

