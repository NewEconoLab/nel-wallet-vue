import Vue from "vue";
import { Component } from "vue-property-decorator";
import MainLayout from "../layouts/Main.vue";
import axios from "axios"

declare const mui;

@Component({
  components: {
    "main-layout": MainLayout
  }
})
export default class home extends Vue {
  // Data property
  Message: string = "hello world";

  async login() {
    let rt = await axios.post("/user/login", this.$data);
    console.log(rt.data);
  }

  // Lifecycle hook
  mounted() {
    mui.toast("mouted");
  }

  // Component method
  updateMyProperty($event: any) {

  }
}