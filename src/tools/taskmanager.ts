import { sessionStoreTool } from "./storagetool";
import { Task, TaskType, TaskState, TaskFunction, ConfirmType } from "./entity";
import { tools } from "./importpack";
import Store from "./StorageMap";
/**
 * 任务管理器
 */
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

    /**
     * 更新方法
     */
    static update()
    {

        if (TaskFunction.heightRefresh && TaskFunction.taskHistory)
        {
            TaskFunction.heightRefresh();
            TaskFunction.taskHistory();
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
                        this.confirm_tranfer(tasks);
                        break;
                    case TaskType.openAuction:
                        this.confirm_open(tasks);
                        break;
                    case TaskType.addPrice:
                        this.confirm_bid(tasks);
                        break;
                    case TaskType.getDomain:
                        this.confirm_getDomain(tasks);
                        break;
                    case TaskType.recoverSgas:
                        this.confirm_recoverSgas(tasks);
                        break;
                    case TaskType.gasToSgas:
                        this.confirm_gasToSgas(tasks);
                        break;
                    case TaskType.sgasToGas:
                        this.confirm_sgasToGas(tasks);
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

        for (const index in this.functionList)
        {
            if (this.functionList.hasOwnProperty(index))
            {
                let element = this.functionList[ index ];
                element();
            }
        }
    }

    /**
     * 类似 js 数组的 map方法
     * @param tasks Task数组
     * @param call 回调方法
     */
    static forConfirm(tasks: Task[], call)
    {
        let taskarr: Task[] = [];
        for (let index = 0; index < tasks.length; index++)
        {
            let tasknew: Task;
            const task = tasks[ index ];
            if (task.state == TaskState.watting)
            {
                tasknew = call(task);
            } else
            {
                tasknew = task;
            }
            taskarr.push(tasknew);
        }
        return taskarr;
    }

    /**
     * 循环得到任务返回的结果
     * @param tasks 任务类
     */
    static async getResult(tasks: Task[])
    {
        let ress = {};
        for (let index = 0; index < tasks.length; index++)
        {
            const element = tasks[ index ];
            if (element.state == TaskState.watting) //判断如果状态是 watting 则查找对应的返回值
            {
                switch (element.type)
                {
                    case ConfirmType.tranfer:
                        ress[ element.txid ] = await tools.wwwtool.hastx(element.txid);
                        break;
                    case ConfirmType.contract:
                        ress[ element.txid ] = await tools.wwwtool.hascontract(element.txid);
                        break;
                    case ConfirmType.recharge:
                        ress[ element.txid ] = await tools.wwwtool.getrechargeandtransfer(element.txid);
                        break;
                    default:
                        ress[ element.txid ] = await tools.wwwtool.hastx(element.txid);
                        break;
                }
            } else  //如果状态是 成功或者失败就没必要调用api查询返回结果了
            {
                ress[ element.txid ] = undefined;
            }
        }
        return ress;
    }

    static addTask(task: Task, type: TaskType)
    {
        this.taskStore.push(type.toString(), task)
    }

    static async confirm_tranfer(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.tranfer.toString(), taskarr); //保存修改的状态
    }

    /**
     * 退币操作跟踪
     * @param tasks 
     */
    static async confirm_withdraw(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.withdraw();
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    TaskFunction.withdraw();
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.withdraw.toString(), taskarr); //保存修改的状态
    }

    /**
     * 重置操作跟踪
     * @param tasks 
     */
    static async confirm_topup(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.topup();
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    TaskFunction.topup();
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.topup.toString(), taskarr); //保存修改的状态
    }

    /**
     * 域名开标操作跟踪
     * @param tasks 
     */
    static async confirm_open(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result && result.displayNameList && result.displayNameList.includes("domainstate"))
                {
                    task.state = TaskState.success;
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.openAuction.toString(), taskarr); //保存修改的状态
    }

    /**
     * 域名加价操作跟踪
     * @param tasks 加价操作对象数组
     */
    static async confirm_bid(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result && result.displayNameList && result.displayNameList.includes("addprice")) //检测是否有对应的通知 addprice
                {
                    task.state = TaskState.success;
                }
                if (result && result.displayNameList && result.displayNameList.includes("domainstate"))
                {
                    task.state = TaskState.fail;
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.addPrice.toString(), taskarr); //保存修改的状态
    }

    /**
     * 确认Gas到SGas的兑换
     * @param tasks 任务数组
     */
    static async confirm_sgasToGas(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[ task.txid ]; //获取通知数组
            if (result && result[ 'errCode' ]) //检测是否有对应的通知 changeOwnerInfo
            {
                switch (result[ 'errCode' ])
                {
                    case '0000'://成功
                        task.state = TaskState.success;
                        TaskFunction.exchange();
                        break;
                    case '3001'://失败
                        task.state = TaskState.fail;
                        TaskFunction.exchange();
                        break;
                    case '3002'://失败
                        task.state = TaskState.fail;
                        TaskFunction.exchange();
                        break;
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.sgasToGas.toString(), taskarr); //保存修改的状态
    }

    /**
     * 确认Sgas到 Gas的兑换
     * @param tasks 任务数组
     */
    static async confirm_gasToSgas(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.exchange();
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    TaskFunction.exchange();
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.gasToSgas.toString(), taskarr); //保存修改的状态
    }

    /**
     * 确认域名解析器的注册
     * @param tasks 任务列表
     */
    static async confirm_resovler(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let domainEdit = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.domainResovle(task.message[ 'domain' ]);
                domainEdit.delete(task.message[ 'domain' ], 'resolver');
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result && result.displayNameList && result.displayNameList.includes("changeOwnerInfo")) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    TaskFunction.domainResovle(task.message[ 'domain' ]);
                    domainEdit.delete(task.message[ 'domain' ], 'resolver');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.domainResovle.toString(), taskarr); //保存修改的状态
    }

    /**
     * 确认域名映射的结果
     * @param tasks 所有映射的任务
     */
    static async confirm_mapping(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let domainEdit = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.domainMapping(task[ 'domain' ], undefined)
                domainEdit.delete(task.message[ 'domain' ], 'mapping');
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result && result.displayNameList && result.displayNameList.includes("setResolveData")) //如果返回的通知有 setResolveData则域名映射设置成功
                {
                    task.state = TaskState.success;
                    TaskFunction.domainMapping(task.message[ 'domain' ], task.message[ 'address' ])
                    domainEdit.delete(task.message[ 'domain' ], 'mapping');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.domainMapping.toString(), taskarr); //保存修改的状态
    }

    /**
     * 续约确认方法
     * @param tasks 任务数组
     */
    static async confirm_renewal(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let domainEdit = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.domainRenewal(task.message[ 'domain' ])
                domainEdit.delete(task.message[ 'domain' ], 'renewal');
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result && result.displayNameList && result.displayNameList.includes("changeOwnerInfo"))
                {
                    task.state = TaskState.success;
                    TaskFunction.domainRenewal(task.message[ 'domain' ])
                    domainEdit.delete(task.message[ 'domain' ], 'renewal');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.domainRenewal.toString(), taskarr); //保存修改的状态
    }


    /**
     * 获得域名状态跟踪
     * @param tasks 任务数组
     */
    static async confirm_getDomain(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[ task.txid ]; //获取通知数组
            if (task.type == ConfirmType.recharge)
            {

                if (result && result[ 'errCode' ]) //检测是否有对应的通知 changeOwnerInfo
                {
                    switch (result[ 'errCode' ])
                    {
                        case '0000'://成功
                            task.state = TaskState.success;
                            Store.auctionInfo.put(task.message[ "domain" ], false, 'isGetDomainWait');
                            break;
                        case '3001'://失败
                            task.state = TaskState.fail;
                            Store.auctionInfo.put(task.message[ "domain" ], false, 'isGetDomainWait');
                            break;
                        case '3002'://失败
                            task.state = TaskState.fail;
                            Store.auctionInfo.put(task.message[ "domain" ], false, 'isGetDomainWait');
                            break;
                    }
                }
            } else
            {
                if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
                {
                    task.state = TaskState.fail;
                    Store.auctionInfo.put(task.message[ "domain" ], false, 'isGetDomainWait');
                } else
                {
                    if (result && result.displayNameList && result.displayNameList.includes("domainstate"))
                    {
                        task.state = TaskState.success;
                        Store.auctionInfo.put(task.message[ "domain" ], false, 'isGetDomainWait');
                    }
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.getDomain.toString(), taskarr); //保存修改的状态
    }


    /**
     * 退回sgas状态跟踪
     * @param tasks 任务数组
     */
    static async confirm_recoverSgas(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                Store.auctionInfo.put(task.message[ "domain" ], false, 'isRecoverWait');
            } else
            {
                let result = ress[ task.txid ]; //获取通知数组
                if (result && result.issucces)
                {
                    task.state = TaskState.success;
                    Store.auctionInfo.put(task.message[ "domain" ], false, 'isRecoverWait');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.recoverSgas.toString(), taskarr); //保存修改的状态
    }

    /**
     * 获取 测试 Gas
     * @param tasks 
     */
    static async confirm_getGas(tasks: Task[])
    {
        let taskarr: Task[] = []
        for (let index = 0; index < tasks.length; index++)
        {
            const task = tasks[ index ];
            if (task.state == TaskState.watting)
            {
                let res = await tools.wwwtool.api_hasclaimgas(task.message.address);
                if (res)
                {
                    if (res[ 0 ].code == "3010")//可领取
                    {
                        task.state = TaskState.fail;
                        TaskFunction.getGasTest(0);//可领取
                    } else if (res[ 0 ].code == "3012")//已领取
                    {
                        task.state = TaskState.success;
                        TaskFunction.getGasTest(1);//已领取
                    } else if (res[ 0 ].code == "3011")//正在领取
                    {
                        task.state = TaskState.watting;
                    }
                }
            }
            task.confirm++;
            taskarr.push(task);
        }
        this.taskStore.put(TaskType.getGasTest.toString(), taskarr);
    }

}