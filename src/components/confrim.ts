import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { LoginInfo, currentInfo, LoginType, WalletOtcgo } from "../tools/entity";
import { tools } from "../tools/importpack";
import { ConfrimMessage } from "../entity/TransactionEntitys";

@Component
export default class TranConfrim extends Vue
{
    show: boolean = false;
    deblocking: boolean = false;
    payFee: boolean = false;
    password: string = "";
    passwordError: boolean = false;
    messageList: ConfrimMessage[] = [];
    constructor()
    {
        super();
    }

    closemudloe()
    {
        this.show = false;
    }

    @Watch("open")
    async open(msg: ConfrimMessage[])
    {
        this.messageList = msg;
        this.show = true;
        this.deblocking = (LoginInfo.info) ? false : true;
        let confirmbtn: HTMLButtonElement = document.getElementById("tranfer-confirm") as HTMLButtonElement;
        let current = JSON.parse(sessionStorage.getItem("login-info-arr")) as currentInfo;
        let promise: Promise<boolean> = new Promise((resolve, reject) =>
        {
            confirmbtn.onclick = () =>
            {
                if (LoginInfo.info)
                {
                    resolve(this.payFee);
                }
                else if (current.type == LoginType.wif)
                {
                    var res = tools.neotool.wifDecode(current.msg['wif']);
                    if (res.err)
                    {
                        reject("WIF is error");
                    }
                    else
                    {
                        LoginInfo.info = res.info as LoginInfo;
                        resolve(this.payFee);
                        return;
                    }
                }
                else if (current.type == LoginType.otcgo)
                {
                    let otcgo = new WalletOtcgo();
                    otcgo.fromJsonStr(JSON.stringify(current.msg));
                    otcgo.otcgoDecrypt(this.password);
                    const result = otcgo.doValidatePwd();
                    if (result)
                    {
                        let info: LoginInfo = new LoginInfo();
                        info.address = otcgo.address;
                        info.prikey = otcgo.prikey;
                        info.pubkey = otcgo.pubkey;
                        LoginInfo.info = info;
                        resolve(this.payFee);
                    } else
                    {
                        this.passwordError = true;
                    }
                }
                else
                {
                    let nep2 = current.msg[LoginInfo.getCurrentAddress()];
                    tools.neotool.nep2ToWif(nep2, this.password)
                        .then(result =>
                        {
                            resolve(this.payFee)
                        })
                        .catch(err =>
                        {
                            this.passwordError = true;
                        })
                }
            }
        });
        return promise;
    }
    mounted() 
    {
        sessionStorage.getItem("")
    }


}