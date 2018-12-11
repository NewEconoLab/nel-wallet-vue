import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../../layouts/wallet.vue";
import { LoginInfo } from "../../tools/entity";

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
    wif: string = "";
    href: string = "";
    walletname: string = "";
    constructor()
    {
        super();
    }

    mounted()
    {
        this.address = LoginInfo.getCurrentAddress();
    }
    visibleWif()
    {
        this.wifshow = (this.wifshow == true ? false : true);
        if (this.wifshow == true)
        {
            LoginInfo.info = null;
        }
        LoginInfo.deblocking()
            .then(info =>
            {
                var msg: LoginInfo = info;
                var wif = ThinNeo.Helper.GetWifFromPrivateKey(msg.prikey);
                this.wif = (this.wifshow == true ? wif : "");
            })
            .catch(err =>
            {

                var msg: LoginInfo = LoginInfo.info;
                var wif = ThinNeo.Helper.GetWifFromPrivateKey(msg.prikey);
                this.wif = (this.wifshow == true ? wif : "");
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
            {
            })
    }
}