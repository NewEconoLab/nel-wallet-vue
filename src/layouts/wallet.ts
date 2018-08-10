import Vue from "vue";
import Component from "vue-class-component";
import MainLayout from "./Main.vue";
import VLink from "../components/VLink.vue";
import { tools } from "../tools/importpack";
import { sessionStoreTool } from "../tools/storagetool";
import { TaskManager } from "../tools/taskmanager";
import { TaskType, Task, TaskFunction } from "../tools/entity";
import Store from "../tools/StorageMap";
@Component({
    components: {
        VLink,
        MainLayout
    }
})
export default class FeatureComponent extends Vue
{
    balance: boolean;
    transfer: boolean;
    exchange: boolean;
    nnsneo: boolean;
    nns: boolean;
    setting: boolean;
    blockheight: number;
    showHistory: boolean;
    taskList: any;
    taskNumber: number;
    constructor()
    {
        super();
        this.balance = true;
        this.exchange = true;
        this.nnsneo = true;
        this.nns = true;
        this.transfer = true;
        this.setting = true;
        this.blockheight = 0;
        this.showHistory = false;
        this.taskList = [];
        this.taskNumber = 0;
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
    }

    mounted()
    {
        this.balance = this.$refs[ "balance" ][ "isActive" ]
            ? false
            : true;
        this.transfer = this.$refs[ "transfer" ][ "isActive" ]
            ? false
            : true;
        this.exchange = this.$refs[ "exchange" ][ "isActive" ]
            ? false
            : true;
        this.nnsneo = this.$refs[ "nnsneo" ][ "isActive" ]
            ? false
            : true;
        this.nns = this.$refs[ "nns" ][ "isActive" ]
            ? false
            : true;
        this.setting = this.$refs[ "setting" ][ "isActive" ]
            ? false
            : true;
        this.makeHref();
        this.getHeight()
        let arr = sessionStorage.getItem("login-info-arr");
        if (!arr || arr.length == 0)
        {
            window.location.hash = "#login";
        }
        TaskFunction.taskHistory = this.taskHistory;
        TaskFunction.heightRefresh = this.getHeight;
    }

    async getHeight()
    {
        this.blockheight = Store.blockheight.select("height");
    }
    onshowHistory()
    {
        this.showHistory = !this.showHistory;
        this.taskHistory();
    }

    taskHistory()
    {
        let list = TaskManager.taskStore.getList();
        this.taskList = [];
        for (const type in list)
        {
            if (list.hasOwnProperty(type))
            {
                const tasks = list[ type ] as Task[];
                switch (parseInt(type) as TaskType)
                {
                    case TaskType.tranfer:
                        this.taskNumber = TaskType.tranfer;
                        this.makeTaskList(tasks, TaskType.tranfer);
                        break;
                    case TaskType.openAuction:
                        this.taskNumber = TaskType.openAuction;
                        this.makeTaskList(tasks, TaskType.openAuction);
                        break;
                    case TaskType.addPrice:
                        this.taskNumber = TaskType.addPrice;
                        this.makeTaskList(tasks, TaskType.addPrice);
                        break;
                    case TaskType.getDomain:
                        this.taskNumber = TaskType.getDomain;
                        this.makeTaskList(tasks, TaskType.getDomain);
                        break;
                    case TaskType.gasToSgas:
                        this.taskNumber = TaskType.gasToSgas;
                        this.makeTaskList(tasks, TaskType.gasToSgas);
                        break;
                    case TaskType.sgasToGas:
                        this.taskNumber = TaskType.sgasToGas;
                        this.makeTaskList(tasks, TaskType.sgasToGas);
                        break;
                    case TaskType.topup:
                        this.taskNumber = TaskType.topup;
                        this.makeTaskList(tasks, TaskType.topup);
                        break;
                    case TaskType.withdraw:
                        this.taskNumber = TaskType.withdraw;
                        this.makeTaskList(tasks, TaskType.withdraw);
                        break;
                    case TaskType.getGasTest:
                        this.taskNumber = TaskType.getGasTest;
                        this.makeTaskList(tasks, TaskType.getGasTest);
                        break;
                    case TaskType.domainMapping:
                        this.taskNumber = TaskType.domainMapping;
                        this.makeTaskList(tasks, TaskType.domainMapping);
                        break;
                    case TaskType.domainResovle:
                        this.taskNumber = TaskType.domainResovle;
                        this.makeTaskList(tasks, TaskType.domainResovle);
                        break;
                    case TaskType.domainRenewal:
                        this.taskNumber = TaskType.domainRenewal;
                        this.makeTaskList(tasks, TaskType.domainRenewal);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    makeHref()
    {
        let str = "testwallet.nel.group";
        // let currentHost = window.location.hostname;
        let href = "";
        if (str.includes("testwallet"))
        {
            href = "https://scan.nel.group/#testnet/"

        } else
        {
            href = "https://scan.nel.group/#mainnet/"
        }
        return href;
    }

    makeTaskList(tasks, tasktype)
    {

        for (let i in tasks)
        {
            let arr = [];
            let href = this.makeHref();
            arr[ "tasktype" ] = tasktype;
            arr[ "startTime" ] = tasks[ i ].startTime;
            arr[ "txid" ] = tasks[ i ].txid.substring(0, 6) + "..." + tasks[ i ].txid.substring(tasks[ i ].txid.length - 6);
            arr[ "txidhref" ] = href + "transaction/" + tasks[ i ].txid;
            arr[ "height" ] = tasks[ i ].height;
            arr[ "state" ] = tasks[ i ].state;
            arr[ "addrhref" ] = href + "address/" + tasks[ i ].message.toaddress ? tasks[ i ].message.toaddress : "";
            arr[ "message" ] = tasks[ i ].message;
            arr[ "domainhref" ] = href + "nns/" + tasks[ i ].message.domain ? tasks[ i ].message.domain : "";
            this.taskList.push(arr);
        }
    }
}