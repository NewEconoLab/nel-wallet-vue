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

    taskHistory()
    {
        let taskList = TaskManager.taskStore.getList()
        console.log(taskList);

        for (const type in taskList)
        {
            if (taskList.hasOwnProperty(type))
            {
                const tasks = taskList[ type ] as Task[];
                switch (parseInt(type) as TaskType)
                {
                    case TaskType.tranfer:
                        console.log(TaskType.tranfer);

                        break;
                    case TaskType.openAuction:
                        console.log(TaskType.openAuction);
                        break;
                    case TaskType.addPrice:
                        console.log(TaskType.addPrice);
                        break;
                    case TaskType.gasToSgas:
                        console.log(TaskType.gasToSgas);
                        break;
                    case TaskType.sgasToGas:
                        console.log(TaskType.sgasToGas);
                        break;
                    case TaskType.topup:
                        console.log(TaskType.topup);
                        break;
                    case TaskType.withdraw:
                        console.log(TaskType.withdraw);
                        break;
                    case TaskType.getGasTest:
                        console.log(TaskType.getGasTest);
                        break;
                    case TaskType.domainResovle:
                        console.log(TaskType.domainResovle);
                        break;
                    case TaskType.domainMapping:
                        console.log(TaskType.domainMapping);
                        break;
                    case TaskType.domainRenewal:
                        console.log(TaskType.domainRenewal);
                        break;
                    default:
                        break;
                }
            }
        }
    }

}