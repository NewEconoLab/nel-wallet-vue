/// <reference path="../../static/js/neo-ts.d.ts"/>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MainLayout from "../layouts/Main.vue";
import { neotools } from "./../tools/neotools";
import { result } from './../tools/neotools';

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
    private loadKeys: { pubkey: Uint8Array, prikey: Uint8Array, address: string }[];

    constructor(){
      super()
      this.reader = new FileReader();
      this.reader.onload =()=>{
        var walletstr = this.reader.result as string;
        this.wallet.fromJsonStr(walletstr);
        for (var i = 0; i < this.wallet.accounts.length; i++)
        {
          mui.alert(this.wallet.accounts[i].address);
        }
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
      .then((res:result)=>
      {
        mui.alert("登陆成功");
        this.loadKeys = res.result
      })
      .catch((e)=>
      {
        mui.alert(e);
      })
    }

    modual(type)
    {
      var mask = mui.createMask((call)=>
      {
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