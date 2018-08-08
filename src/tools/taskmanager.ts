import { sessionStoreTool } from "./storagetool";
import { Task, TaskType, TaskState, TaskFunction } from "./entity";
import { tools } from "./importpack";

export class TaskManager
{
    static taskStore: sessionStoreTool = new sessionStoreTool("task-manager");
    static refresh: sessionStoreTool = new sessionStoreTool("refresh_auction");
    static oldBlock: sessionStoreTool = new sessionStoreTool("block");
    static functionList: Function[] = [];
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
                const tasks = taskList[ type ] as Task[];
                switch (parseInt(type) as TaskType)
                {
                    case TaskType.tranfer:

                        break;
                    case TaskType.openAuction:
                        this.confirm_open(tasks);
                        break;
                    case TaskType.addPrice:
                        this.confirm_bid(tasks);
                        break;
                    case TaskType.topup:
                        this.confirm_topup(tasks);
                        break;
                    case TaskType.withdraw:
                        this.confirm_withdraw(tasks);
                        break;
                    case TaskType.getGasTest:
                        // this.confirm_tranfer(TaskType.getGasTest, tasks, "getTestGas");
                        break;
                    case TaskType.domainResovle:
                        this.confirm_resovler(tasks);
                        break;
                    case TaskType.domainMapping:
                        this.confirm_mapping(tasks);
                        break;
                    case TaskType.domainRenewal:
                        this.confirm_renewal(tasks);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    static addTask(task: Task, type: TaskType)
    {
        this.taskStore.push(type.toString(), task)
    }

    static async confirm_tranfer(TaskType, task: Task, name: string)
    {
        if (task.state == TaskState.watting)
        {
        }
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

    static async confirm_withdraw(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];
                if (task.state == TaskState.watting)
                {
                }
                if (task.state == TaskState.watting)
                {
                }
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
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.withdraw.toString(), taskarr);
    }

    static async confirm_topup(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];
                if (task.state == TaskState.watting)
                {
                }
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
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.topup.toString(), taskarr);
    }

    static async confirm_open(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];

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
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.openAuction.toString(), taskarr);
    }

    static async confirm_bid(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];

                if (task.state == TaskState.watting)
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
                }
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.addPrice.toString(), taskarr);
    }

    static async confirm_resovler(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];

                if (task.state == TaskState.watting)
                {
                    let domainEdit = new sessionStoreTool("domain-edit");
                    if (task.confirm < 3)
                    {
                        let data = await tools.wwwtool.hastx(task.txid);
                        if (data.issucces)
                        {
                            task.state = TaskState.success;
                            TaskFunction.domainResovle(task.message[ 'domain' ]);
                            domainEdit.delete(task.message[ 'domain' ], 'resolver');
                        } else
                        {
                            task.state = TaskState.watting;
                        }
                    } else
                    {
                        task.state = TaskState.fail;
                        TaskFunction.domainResovle(task.message[ 'domain' ]);
                        domainEdit.delete(task.message[ 'domain' ], 'resolver');
                    }
                    task.confirm++;
                }
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.domainResovle.toString(), taskarr);
    }
    static async confirm_mapping(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];

                if (task.state == TaskState.watting)
                {
                    let domainEdit = new sessionStoreTool("domain-edit");
                    if (task.confirm < 3)
                    {
                        let data = await tools.wwwtool.hastx(task.txid);
                        if (data.issucces)
                        {
                            task.state = TaskState.success;
                            TaskFunction.domainMapping(task.message[ 'domain' ], task.message[ 'address' ])
                            domainEdit.delete(task.message[ 'domain' ], 'mapping');
                        } else
                        {
                            task.state = TaskState.watting;
                        }
                    } else
                    {
                        task.state = TaskState.fail;
                        TaskFunction.domainMapping(task[ 'domain' ], undefined)
                        domainEdit.delete(task.message[ 'domain' ], 'mapping');
                    }
                    task.confirm++;
                }
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.domainMapping.toString(), taskarr);
    }
    static async confirm_renewal(tasks: Task[])
    {
        let taskarr: Task[] = [];
        for (const key in tasks)
        {
            if (tasks.hasOwnProperty(key))
            {
                const task = tasks[ key ];

                if (task.state == TaskState.watting)
                {
                    let domainEdit = new sessionStoreTool("domain-edit");
                    if (task.confirm < 3)
                    {
                        let data = await tools.wwwtool.hastx(task.txid);
                        if (data.issucces)
                        {
                            task.state = TaskState.success;
                            TaskFunction.domainRenewal(task.message[ 'domain' ])
                            domainEdit.delete(task.message[ 'domain' ], 'renewal');
                        } else
                        {
                            task.state = TaskState.watting;
                        }
                    } else
                    {
                        task.state = TaskState.fail;
                        TaskFunction.domainRenewal(task.message[ 'domain' ])
                        domainEdit.delete(task.message[ 'domain' ], 'renewal');
                    }
                    task.confirm++;
                }
                taskarr.push(task);
            }
        }
        this.taskStore.put(TaskType.domainRenewal.toString(), taskarr);
    }

}