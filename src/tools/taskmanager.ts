import { sessionStoreTool } from "./storagetool";
import { Task, TaskType, TaskState, TaskFunction } from "./entity";
import { tools } from "./importpack";

export class TaskManager
{
    static taskStore: sessionStoreTool = new sessionStoreTool("task-manager");
    static refresh: sessionStoreTool = new sessionStoreTool("refresh_auction");
    static oldBlock: sessionStoreTool = new sessionStoreTool("block");
    static functionList: Function[] = [];
    // static taskFunction: TaskFunction = new TaskFunction();
    constructor()
    {
    }

    static getBlockHeight()
    {
        let height = this.oldBlock.select('height');
        return height;
    }

    static update()
    {
        for (const index in this.functionList)
        {
            if (this.functionList.hasOwnProperty(index))
            {
                let element = this.functionList[ index ];
                element();
            }
        }

        let taskList = (this.taskStore.getList() as Object);
        for (const type in taskList)
        {
            if (taskList.hasOwnProperty(type))
            {
                const task = taskList[ type ] as Task;
                if (task.state == TaskState.watting)
                {
                    switch (parseInt(type) as TaskType)
                    {
                        case TaskType.tranfer:

                            break;
                        case TaskType.openAuction:
                            this.confirm_open(task);
                            break;
                        case TaskType.addPrice:
                            this.confirm_bid(task);
                            break;
                        case TaskType.topup:
                            this.confirm_topup(task);
                            break;
                        case TaskType.withdraw:
                            this.confirm_withdraw(task);
                            break;
                        case TaskType.getGasTest:
                            this.confirm_tranfer(TaskType.getGasTest, task, "getTestGas");
                        default:
                            break;
                    }
                }
            }
        }
    }

    static addTask(task: Task, type: TaskType)
    {
        this.taskStore.put(type.toString(), task)
    }

    static async confirm_tranfer(TaskType, task: Task, name: string)
    {
        if (task.confirm < 3)
        {
            let data = await tools.wwwtool.hastx(task.txid);
            if (data.issucces)
            {
                task.state = TaskState.success;
                sessionStorage.setItem("" + name, "true");
            } else
            {
                task.state = TaskState.watting;
            }
        } else
        {
            task.state = TaskState.fail;
            sessionStorage.setItem("" + name, "fail");
        }
        task.confirm++;
        this.taskStore.put(TaskType.toString(), task);

    }

    static async confirm_withdraw(task: Task)
    {
        if (task.confirm < 3)
        {
            let data = await tools.wwwtool.hastx(task.txid);
            if (data.issucces)
            {
                task.state = TaskState.success;
                this.refresh.put("withdraw", true);
            } else
            {
                return;
            }
        } else
        {
            task.state = TaskState.fail;
            this.refresh.put("withdraw", true);
        }
        task.confirm += 1;
        this.taskStore.put(TaskType.withdraw.toString(), task);
    }

    static async confirm_topup(task: Task)
    {
        if (task.confirm < 3)
        {
            let data = await tools.wwwtool.hastx(task.txid);
            if (data.issucces)
            {
                task.state = TaskState.success;
                this.refresh.put("topup", true);
            } else
            {
                return;
            }
        } else
        {
            task.state = TaskState.fail;
            this.refresh.put("topup", true);
        }
        task.confirm += 1;
        this.taskStore.put(TaskType.topup.toString(), task);
    }

    static async confirm_open(task: Task)
    {
        if (task.confirm < 3)
        {
            let data = await tools.wwwtool.hastx(task.txid);
            if (data.issucces)
            {
                // let session_open = new tools.sessionstoretool("auction-openSession");
                task.state = TaskState.success;
                // session_open.delete()
                // sessionStorage.removeItem("auction-openSession");
                this.refresh.put("bidlist", true);
            } else
            {
                return;
            }
        } else
        {
            task.state = TaskState.fail;
            this.refresh.put("bidlist", true);
        }
        task.confirm += 1;
        this.taskStore.put(TaskType.openAuction.toString(), task);
    }

    static async confirm_bid(task: Task)
    {
        if (task.confirm < 3)
        {
            let data = await tools.wwwtool.hastx(task.txid);
            if (data)
            {
                task.state = TaskState.success;
                this.refresh.put("bidlist", true);
            } else
            {
                return;
            }
        } else
        {
            task.state = TaskState.fail;
            this.refresh.put("bidlist", true);
        }
        task.confirm += 1;
        this.taskStore.put(TaskType.addPrice.toString(), task);
    }

}