import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { LoginInfo, currentInfo, LoginType, WalletOtcgo } from "../tools/entity";
import { tools } from "../tools/importpack";
import { ConfrimMessage } from "../entity/TransactionEntitys";

@Component
export default class TranConfrim extends Vue
{
    show: boolean = false;
    title: string = ""
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
    async open(name: string, msg: ConfrimMessage[])
    {
        this.title = name;
        this.messageList = msg;
        this.show = true;
        this.deblocking = (LoginInfo.info) ? false : true;
        let confirmbtn: HTMLButtonElement = document.getElementById("transaction-confirm") as HTMLButtonElement;
        let closebtn: HTMLDivElement = document.getElementById("transaction-mudloe-close") as HTMLDivElement;
        let current = JSON.parse(sessionStorage.getItem("login-info-arr")) as currentInfo;
        if (current.type == LoginType.wif)
        {
            this.deblocking = false;
        }
        let promise: Promise<boolean> = new Promise((resolve, reject) =>
        {
            closebtn.onclick = () =>
            {
                this.closemudloe();
                resolve(false);
            }
            confirmbtn.onclick = () =>
            {
                if (LoginInfo.info)
                {
                    LoginInfo.info.payfee = this.payFee;
                    resolve(true);
                    this.closemudloe();
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
                        LoginInfo.info.payfee = this.payFee;
                        resolve(true);
                        this.closemudloe();
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
                        info.payfee = this.payFee;
                        LoginInfo.info = info;
                        resolve(true);
                        this.closemudloe();
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
                            LoginInfo.info = result.info;
                            LoginInfo.info.payfee = this.payFee;
                            resolve(true)
                            this.closemudloe();
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