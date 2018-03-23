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
          <a class="navbar-brand" href="#">NEL</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li>
              <v-link href="#explorer">Explorer</v-link>
            </li>
            <li>
              <v-link href="#wallet">Wallet</v-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <v-link href="#login">login</v-link>
            </li>
            <li>
              <v-link href="#generate">Generate</v-link>
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

<script>
import VLink from "../components/VLink.vue";

export default {
  components: {
    VLink
  }
};
</script>

<style scoped>

</style>
