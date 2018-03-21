/// <reference path="../../static/js/neo-ts.d.ts"/>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MainLayout from "../layouts/Main.vue";
declare const mui;

@Component({
    components: 
    {
      "main-layout": MainLayout,
    }
  })
  export default class login extends Vue {
    // Data property
    Message: string = "hello world";
    file:File;
    filename:string="";
  
    // Lifecycle hook
    fileChange($event:any) {      
      var wallet: ThinNeo.nep6wallet;
      var reader = new FileReader();
      this.file = $event.target.files[0];
      this.filename = this.file.name;
    }

    alert(){
      mui.alert(this.filename);
    }
  
  }