<template>
  <main-layout>
    <p>Home page</p>
		<p>{{Message}}</p>
    <button v-on:click="login">login</button>
  </main-layout>
</template>

<script lang="ts" src="./home.ts"></script>
<style scoped>
.pd10 {
  padding: 10px;
  margin-bottom: 0;
}
</style>
