import Vue from "vue";
import Component from "vue-class-component";
import MainLayout from "./Main.vue";
import VLink from "../components/VLink.vue";
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
    blockheight: number;
    showHistory: boolean;
    taskList: any;
    taskNumber: number;
    constructor()
    {
        super();
        this.blockheight = 0;
        this.showHistory = false;
        this.taskList = [];
        this.taskNumber = sessionStorage.getItem("newTaskNumber") ? parseInt(sessionStorage.getItem("newTaskNumber")) : 0;
    }

    mounted()
    {
        if (this.$router.currentRoute.fullPath.length <= 1)
        {
            this.$router.push("login");
        }
        let arr = sessionStorage.getItem("login-info-arr");
        if (!arr || arr.length == 0)
        {
            this.$router.push("login");
        }
        this.getHeight()
        TaskFunction.taskHistory = this.taskHistory;
        TaskFunction.heightRefresh = this.getHeight;
        TaskFunction.newTaskNumber = this.newTaskNumber;
    }

    isActive(page: string)
    {
        return this.$router.currentRoute.fullPath.includes(page);
    }

    beforeDestroy()
    {
        this.clearTimer();
    }

    getHeight()
    {
        this.blockheight = Store.blockheight.select("height");
    }
    onshowHistory()
    {
        this.showHistory = !this.showHistory;
        this.taskNumber = 0;
        sessionStorage.setItem("newTaskNumber", this.taskNumber.toString());
        this.taskHistory();
    }

    newTaskNumber()
    {
        this.taskNumber++;
        sessionStorage.setItem("newTaskNumber", this.taskNumber.toString());
    }

    taskHistory()
    {
        this.clearTimer();
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
                        this.makeTaskList(tasks, TaskType.tranfer);
                        break;
                    case TaskType.openAuction:
                        this.makeTaskList(tasks, TaskType.openAuction);
                        break;
                    case TaskType.addPrice:
                        this.makeTaskList(tasks, TaskType.addPrice);
                        break;
                    case TaskType.gasToSgas:
                        this.makeTaskList(tasks, TaskType.gasToSgas);
                        break;
                    case TaskType.sgasToGas:
                        this.makeTaskList(tasks, TaskType.sgasToGas);
                        break;
                    case TaskType.topup:
                        this.makeTaskList(tasks, TaskType.topup);
                        break;
                    case TaskType.withdraw:
                        this.makeTaskList(tasks, TaskType.withdraw);
                        break;
                    case TaskType.getGasTest:
                        this.makeTaskList(tasks, TaskType.getGasTest);
                        break;
                    case TaskType.domainMapping:
                        this.makeTaskList(tasks, TaskType.domainMapping);
                        break;
                    case TaskType.domainResovle:
                        this.makeTaskList(tasks, TaskType.domainResovle);
                        break;
                    case TaskType.domainRenewal:
                        this.makeTaskList(tasks, TaskType.domainRenewal);
                        break;
                    case TaskType.getDomain:
                        this.makeTaskList(tasks, TaskType.getDomain);
                        break;
                    case TaskType.recoverSgas:
                        this.makeTaskList(tasks, TaskType.recoverSgas);
                        break;
                    case TaskType.ClaimGas:
                        this.makeTaskList(tasks, TaskType.ClaimGas);
                        break;
                    case TaskType.domainTransfer:
                        this.makeTaskList(tasks, TaskType.domainTransfer);
                        break;
                    case TaskType.saleDomain:
                        this.makeTaskList(tasks, TaskType.saleDomain);
                        break;
                    case TaskType.unSaleDomain:
                        this.makeTaskList(tasks, TaskType.unSaleDomain);
                        break;
                    case TaskType.buyDomain:
                        this.makeTaskList(tasks, TaskType.buyDomain);
                        break;
                    default:
                        break;
                }
            }
        }
        this.taskList.sort((n1, n2) =>
        {
            return n1.startTime > n2.startTime ? -1 : 1;
        })

        this.taskList.forEach(v =>
        {
            if (v.state == 0)
            {
                this.timer(v);
            }
        })
    }

    makeHref()
    {
        let str = "testwallet.nel.group";
        // let currentHost = window.location.hostname;
        let href = "";
        if (str.includes("testwallet"))
        {
            href = "https://scan.nel.group/test/"

        } else
        {
            href = "https://scan.nel.group/"
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
            arr[ "addrhref" ] = href + "address/" + (tasks[ i ].message.toaddress ? tasks[ i ].message.toaddress : tasks[ i ].message.address);
            arr[ "message" ] = tasks[ i ].message;
            arr[ "domainhref" ] = href + "nnsinfo/" + (tasks[ i ].message.domain ? tasks[ i ].message.domain : "");
            arr[ "resolver" ] = "" + (tasks[ i ].message.contract ? (tasks[ i ].message.contract.substring(0, 4) + "..." + tasks[ i ].message.contract.substring(tasks[ i ].message.contract.length - 4)) : "");
            this.taskList.push(arr);
        }
    }
    timer(item)
    {
        if (item.timer)
        {
            clearInterval(item.timer);
        }
        let pendingText = '';
        let seconds = '' + (new Date().getTime() - item[ "startTime" ]) / 1000;
        pendingText = `(${parseInt(seconds)}s)`;
        this.$set(item, 'pendingText', pendingText);
        let timer = setInterval(() =>
        {
            if (item.state != 0)
            {
                clearInterval(timer);
            }
            let seconds = '' + (new Date().getTime() - item[ "startTime" ]) / 1000;
            pendingText = `(${parseInt(seconds)}s)`;
            this.$set(item, 'pendingText', pendingText);
        }, 1000)
        item.timer = timer;
    }

    clearTimer()
    {
        this.taskList.forEach(v =>
        {
            if (v.timer)
            {
                clearInterval(v.timer);
                v.timer = null;
            }
        });
    }
}