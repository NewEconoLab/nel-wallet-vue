import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../../layouts/wallet.vue";
import { LoginInfo, currentInfo, LoginType, alert } from "../../tools/entity";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout
    }
})
export default class Settings extends Vue
{
    address: string = "";
    wifshow: boolean = false;
    type: LoginType;
    wif: string = "";
    nep2: string = "";
    href: string = "";
    walletname: string = "";
    nep2show: boolean = false;
    constructor()
    {
        super();
        let current = JSON.parse(sessionStorage.getItem("login-info-arr")) as currentInfo;
        this.type = current.type;
    }

    mounted()
    {
        this.address = LoginInfo.getCurrentAddress();
    }
    visibleWif()
    {
        this.wifshow = !this.wifshow;
        if (this.wifshow)
        {
            LoginInfo.info = null;
        }
        LoginInfo.deblocking()
            .then(info =>
            {
                var wif = ThinNeo.Helper.GetWifFromPrivateKey(info.prikey);
                this.wif = this.wifshow ? wif : "";
            })
            .catch(err =>
            {
                console.log(err);
            })
    }
    //查看Nep2 字段
    async visibleNep2()
    {
        this.nep2show = !this.nep2show;
        if (this.nep2show)
        {
            LoginInfo.info = null;
            try
            {
                let info = await LoginInfo.deblocking();
                if (this.type == LoginType.otcgo)
                {
                    let password = info["password"];

                    ThinNeo.Helper.GetNep2FromPrivateKey(info.prikey, password, 16384, 8, 8, (str, result) =>
                    {
                        this.nep2 = result;
                    })
                } else
                {
                    let current = JSON.parse(sessionStorage.getItem("login-info-arr")) as currentInfo;
                    this.nep2 = current.msg[this.address]
                }

            } catch (error)
            {

            }
        }
    }

    createNep2()
    {
        alert.show("请输入密码", "password", "创建", password =>
        {
            if (!password)
            {
            }
            else
            {
                LoginInfo.deblocking()
                    .catch(info =>
                    {
                        console.log(info);

                        ThinNeo.Helper.GetNep2FromPrivateKey(info.prikey, password, 16384, 8, 8, (str, result) =>
                        {
                            this.nep2 = result;
                            alert.close();
                        })
                    })
            }
        })
    }
    download()
    {
        LoginInfo.deblocking()
            .then(msg =>
            {
                this.walletname = LoginInfo.getCurrentAddress() + ".json";
                var wallet = new ThinNeo.nep6wallet();
                wallet.scrypt = new ThinNeo.nep6ScryptParameters();
                wallet.scrypt.N = 16384;
                wallet.scrypt.r = 8;
                wallet.scrypt.p = 8;
                wallet.accounts = [];
                wallet.accounts[0] = new ThinNeo.nep6account();
                wallet.accounts[0].address = LoginInfo.getCurrentAddress();
                mui.prompt("" + this.$t("setting.msg3"), "" + this.$t("setting.msg4"), "" + this.$t("setting.msg5"), ["" + this.$t("btn.cancel"), "" + this.$t("btn.confirm")], (e) =>
                {
                    if (e.index == 1)
                    {
                        ThinNeo.Helper.GetNep2FromPrivateKey(msg.prikey, e.value, wallet.scrypt.N, wallet.scrypt.r, wallet.scrypt.p, (info, result) =>
                        {
                            if (info == "finish")
                            {
                                wallet.accounts[0].nep2key = result;
                                wallet.accounts[0].contract = new ThinNeo.contract();
                                wallet.accounts[0].contract.script = ThinNeo.Helper.GetAddressCheckScriptFromPublicKey(msg.pubkey).toHexString();
                                var jsonstr = JSON.stringify(wallet.toJson());
                                var blob = new Blob([ThinNeo.Helper.String2Bytes(jsonstr)]);
                                this.href = URL.createObjectURL(blob);
                            }
                        });
                    }
                }, 'div')
                var input = document.querySelector('.mui-popup-input input') as HTMLInputElement;
                var download = document.querySelector('.mui-popup-button mui-popup-button-bold')
                input.type = 'password';
            })
            .catch(err =>
            { })
    }
}