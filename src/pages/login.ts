import { Result, WalletOtcgo } from './../tools/entity';
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
  otcgo: WalletOtcgo = new WalletOtcgo();
  reader: FileReader;
  isotc: boolean = false;
  filename: string = "";
  password: string = "";
  nep2: string = "";
  nep2pwd: string = "";
  wif: string = "";
  walletname: string = "";
  walletpwd: string = "";
  confirmpwd: string = "";
  nameerr: string = "";
  pwderr: string = "";
  pwdmsg: string = "";
  confirmerr: string = "";
  moudle_nep6: boolean = true;
  moudle_wif: boolean = false;
  moudle_nep2: boolean = false;
  moudle_generate: boolean = false;
  moudle_download: boolean = false;
  download_name: string = "";
  download_href: string = "";

  constructor()
  {
    super();
    this.reader = new FileReader();
    this.reader.onload = () =>
    {
      var walletstr = this.reader.result as string;
      let isotc = !walletstr.includes("accounts");
      if (isotc)
      {
        this.otcgo.fromJsonStr(walletstr);
      } else
      {
        this.wallet.fromJsonStr(walletstr);
      }
    }
    //初始化随机数生成器
    //该随机数生成器原理是，手机鼠标事件，所以早点打开效果好
    Neo.Cryptography.RandomNumberGenerator.startCollectors();
  }

  mounted()
  {
    if (StorageTool.getLoginArr().length > 0)
    {
      sessionStorage.clear();
    }
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

  async loginFile()
  {
    mui.toast("" + this.$t("toast.msg1"));
    if (!!this.wallet.accounts)
    {
      try
      {
        let loginarray = await neotools.nep6Load(this.wallet, this.password) as LoginInfo[];
        StorageTool.setLoginArr(loginarray);
        LoginInfo.setCurrentAddress(loginarray[ 0 ].address)
        mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' })
        window.location.hash = "#balance";
      } catch (error)
      {
        mui.alert("" + this.$t("toast.msg3") + error);
      }
    }
    if (!!this.otcgo.address)
    {
      this.otcgo.otcgoDecrypt(this.password);
      var loginarray: LoginInfo[] = new Array<LoginInfo>();
      loginarray.push(new LoginInfo());
      loginarray[ 0 ].address = this.otcgo.address;
      loginarray[ 0 ].prikey = this.otcgo.prikey;
      loginarray[ 0 ].pubkey = this.otcgo.pubkey;

      StorageTool.setLoginArr(loginarray);
      LoginInfo.setCurrentAddress(loginarray[ 0 ].address)
      mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' })
      window.location.hash = "#balance";
    }
  }

  async loginWif()
  {
    mui.toast("" + this.$t("toast.msg1"));
    var res = neotools.wifDecode(this.wif);
    if (res.err)
    {
      mui.toast("" + this.$t("toast.msg4"))
    } else
    {
      var loginarray: LoginInfo[] = new Array<LoginInfo>();
      var login: LoginInfo = res.info;
      loginarray.push(login);
      StorageTool.setLoginArr(loginarray);
      LoginInfo.setCurrentAddress(login.address);
      mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' })
      window.location.hash = "#balance";
    }
  }

  async loginNep2()
  {
    mui.toast("" + this.$t("toast.msg1"));
    var res = await neotools.nep2ToWif(this.nep2, this.nep2pwd);
    if (res.err)
    {
      mui.toast("" + this.$t("toast.msg4"))
    } else
    {
      var loginarray: LoginInfo[] = new Array<LoginInfo>();
      var login: LoginInfo = res.info;
      loginarray.push(login);
      StorageTool.setLoginArr(loginarray);
      LoginInfo.setCurrentAddress(login.address);
      mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' })
      window.location.hash = "#balance";
    }
  }

  loginNeodun() { }

  cutModual(page: string)
  {
    if (page == "wif")
    {
      this.moudle_wif = true;
      this.moudle_nep2 = false;
      this.moudle_nep6 = false;
      this.moudle_generate = false;
      this.moudle_download = false;
    } if (page == "nep2")
    {
      this.moudle_wif = false;
      this.moudle_nep2 = true;
      this.moudle_nep6 = false;
      this.moudle_generate = false;
      this.moudle_download = false;
    } if (page == "nep6")
    {
      this.moudle_wif = false;
      this.moudle_nep2 = false;
      this.moudle_nep6 = true;
      this.moudle_generate = false;
      this.moudle_download = false;
    }
    if (page == "generate")
    {
      this.moudle_wif = false;
      this.moudle_nep2 = false;
      this.moudle_nep6 = false;
      this.moudle_generate = true;
      this.moudle_download = false;
    }
    if (page == "download")
    {
      this.moudle_wif = false;
      this.moudle_nep2 = false;
      this.moudle_nep6 = false;
      this.moudle_generate = false;
      this.moudle_download = true;
    }
  }

  verifypwd()
  {
    if (this.walletpwd.length < 8)
    {
      this.pwderr = 'true';
      this.pwdmsg = '' + this.$t("generate.pwderrmsg1");
      return false;
    }
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (!reg.test(this.walletpwd))
    {
      this.pwderr = 'true';
      this.pwdmsg = '' + this.$t("generate.pwderrmsg2");
      return false;
    } else
    {
      this.pwderr = 'false';
      this.pwdmsg = '';
      return true;
    }
  }

  verifyConfirm()
  {
    if (this.confirmpwd && this.walletpwd == this.confirmpwd)
    {
      this.confirmerr = 'false';
      return true;
    } else
    {
      this.confirmerr = 'true';
      return false;
    }
  }

  verifyName()
  {
    this.walletname = this.walletname.replace(' ', '');
    if (this.walletname.length == 0)
    {
      this.nameerr = 'true';
      return false;
    } else
    {
      this.nameerr = 'false';
      return true;
    }
  }

  generate()
  {
    var confirm = this.verifyConfirm()
    var pwd = this.verifypwd();
    var name = this.verifyName();
    if (confirm && pwd && name)
    {
      this.cutModual('download');
      var array = new Uint8Array(32);
      var key = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(array);
      // spanPri.textContent = key.toHexString();
      var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(key);
      var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
      this.moudle_download = true;

      this.wallet.scrypt = new ThinNeo.nep6ScryptParameters();
      this.wallet.scrypt.N = 16384;
      this.wallet.scrypt.r = 8;
      this.wallet.scrypt.p = 8;
      this.wallet.accounts = [];
      this.wallet.accounts[ 0 ] = new ThinNeo.nep6account();
      this.wallet.accounts[ 0 ].address = addr;
      ThinNeo.Helper.GetNep2FromPrivateKey(key, this.walletpwd, this.wallet.scrypt.N, this.wallet.scrypt.r, this.wallet.scrypt.p, (info, result) =>
      {
        if (info == "finish")
        {
          this.wallet.accounts[ 0 ].nep2key = result;
          this.wallet.accounts[ 0 ].contract = new ThinNeo.contract();
          var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(key);
          this.wallet.accounts[ 0 ].contract.script = ThinNeo.Helper.GetAddressCheckScriptFromPublicKey(pubkey).toHexString();
          var jsonstr = JSON.stringify(this.wallet.toJson());
          var blob = new Blob([ ThinNeo.Helper.String2Bytes(jsonstr) ]);
          this.download_href = URL.createObjectURL(blob);
          this.download_name = this.walletname + ".json";
        }
      });
    }
  }

}