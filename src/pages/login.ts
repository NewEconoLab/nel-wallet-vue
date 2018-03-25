import { Result } from './../tools/entity';
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MainLayout from "../layouts/Main.vue";
import { neotools } from "./../tools/neotools";
import { StorageTool } from '../tools/storagetool';
import { LoginInfo } from './../tools/entity';
/// <reference path="../tools/neo-ts.d.ts"/>

declare const mui;

@Component({
    components: 
    {
      "main-layout": MainLayout,
    }
  })
  export default class login extends Vue 
  {
    // Data property
    Message: string = "hello world";
    file:File;
    wallet:ThinNeo.nep6wallet= new ThinNeo.nep6wallet();
    reader:FileReader;
    filename:string="";
    password:string="";

    constructor(){
      super()
      this.reader = new FileReader();
      this.reader.onload =()=>{
        var walletstr = this.reader.result as string;
        this.wallet.fromJsonStr(walletstr);
      }
    }
  
    // Lifecycle hook
    fileChange($event:any) 
    {
      this.file = $event.target.files[0];
      this.filename = this.file.name;    

      if (this.filename.includes(".json"))
      {
          this.reader.readAsText(this.file);
      }
    }

    login()
    {
      neotools.nep6Load(this.wallet,this.password)
      .then((res:Result)=>
      {
        var loginarray:LoginInfo[] = res.info as LoginInfo[];
        StorageTool.setLoginMessage(res.info);
        StorageTool.setStorage("current-address",loginarray[0].address);
        window.location.hash="#balance";
      })
      .catch((e)=>
      {
        mui.alert(e);
      })
    }

    modual()
    {
      var mask = mui.createMask((call)=>
      {
        mui.alert("modual is close");
      });//callback为用户点击蒙版时自动执行的回调；
      mask.show();//显示遮罩
      // mask.close();//关闭遮罩
    }

    wifImport()
    {
    }
    nep2Import()
    {

    }

  }