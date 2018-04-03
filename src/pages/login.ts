import { Result } from './../tools/entity';
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MainLayout from "../layouts/Main.vue";
import { neotools } from "./../tools/neotools";
import { StorageTool } from '../tools/storagetool';
import { LoginInfo } from './../tools/entity';
import VLink from "../components/VLink.vue";
/// <reference path="../tools/neo-ts.d.ts"/>

declare const mui;

@Component({
  components:
    {
      "main-layout": MainLayout,
      "v-link": VLink
    }
})
export default class login extends Vue 
{
  // Data property
  Message: string = "hello world";
  file: File;
  wallet: ThinNeo.nep6wallet = new ThinNeo.nep6wallet();
  reader: FileReader;
  filename: string = "";
  password: string = "";
  nep2:string="";
  nep2pwd:string="";
  wif: string = "";
  moudle_nep6: boolean = true;
  moudle_wif: boolean = false;
  moudle_nep2: boolean = false;

  constructor()
  {
    super();
    this.reader = new FileReader();
    this.reader.onload = () =>
    {
      var walletstr = this.reader.result as string;
      this.wallet.fromJsonStr(walletstr);
    }
  }

  mounted()
  {
  }

  // Lifecycle hook
  fileChange($event: any) 
  {
    this.file = $event.target.files[ 0 ];
    this.filename = this.file.name;

    if (this.filename.includes(".json"))
    {
      this.reader.readAsText(this.file);
    }
  }

  async login(type: string)
  {
    mui.toast("Be patient and wait for patience ...");
    if (type == "nep6")
    {
      neotools.nep6Load(this.wallet, this.password)
        .then((res: Result) =>
        {
          var loginarray: LoginInfo[] = res.info as LoginInfo[];
          StorageTool.setLoginArr(loginarray);
          LoginInfo.setCurrentAddress(loginarray[ 0 ].address)
          mui.toast('Authentication passed, entering your account ^_^ ...', { duration: 'long', type: 'div' })
          window.location.hash = "#balance";
        })
        .catch((e) =>
        {
          mui.alert(">_< !!! The login failure error message is as follows:" + e);
        })
    }
    if (type == "wif")
    {
      var res = neotools.wifDecode(this.wif);
      if (res.err)
      {
        mui.toast(">_< !!! Please enter the correct string ")
      } else
      {
        var loginarray: LoginInfo[] = new Array<LoginInfo>();
        var login: LoginInfo = res.info;
        loginarray.push(login);
        StorageTool.setLoginArr(loginarray);
        LoginInfo.setCurrentAddress(login.address);
        mui.toast('Authentication passed, entering your account ^_^ ...', { duration: 'long', type: 'div' })
        window.location.hash = "#balance";
      }
    }
    if(type=="nep2"){
      var res = await neotools.nep2ToWif(this.nep2,this.nep2pwd);      
      if (res.err)
      {
        mui.toast(">_< !!! Please enter the correct string ")
      } else
      {
        var loginarray: LoginInfo[] = new Array<LoginInfo>();
        var login: LoginInfo = res.info;
        loginarray.push(login);
        StorageTool.setLoginArr(loginarray);
        LoginInfo.setCurrentAddress(login.address);
        mui.toast('Authentication passed, entering your account ^_^ ...', { duration: 'long', type: 'div' })
        window.location.hash = "#balance";
      }
    }

  }

  cutModual(page: string)
  {
    if (page == "wif")
    {
      this.moudle_wif = true;
      this.moudle_nep2 = false;
      this.moudle_nep6 = false;
    } if (page == "nep2")
    {
      this.moudle_wif = false;
      this.moudle_nep2 = true;
      this.moudle_nep6 = false;
    } if (page == "nep6")
    {
      this.moudle_wif = false;
      this.moudle_nep2 = false;
      this.moudle_nep6 = true;
    }
    // var mask = mui.createMask((call) =>
    // {
    //   mui.alert("modual is close");
    // });//callback为用户点击蒙版时自动执行的回调；
    // mask.show();//显示遮罩
    // mask.close();//关闭遮罩
  }

  wifImport()
  {
  }
  nep2Import()
  {

  }

}