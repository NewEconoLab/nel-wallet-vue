import { sessionStoreTool } from "./storagetool";
import { Task, TaskType, TaskState, TaskFunction, ConfirmType, LoginInfo } from "./entity";
import { tools } from "./importpack";
import Store from "./StorageMap";
import { services } from "../services/index";
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
    static async update()
    {
        let taskList = (this.taskStore.getList() as Object);
        for (const type in taskList)
        {
            if (taskList.hasOwnProperty(type))
            {
                const tasks = taskList[type] as Task[];
                switch (parseInt(type) as TaskType)
                {
                    case TaskType.tranfer:
                        await this.confirm_tranfer(tasks);
                        break;
                    case TaskType.ClaimGas:
                        await this.confirm_claimGas(tasks);
                        break;
                    case TaskType.openAuction:
                        await this.confirm_open(tasks);
                        break;
                    case TaskType.addPrice:
                        await this.confirm_bid(tasks);
                        break;
                    case TaskType.getDomain:
                        await this.confirm_getDomain(tasks);
                        break;
                    case TaskType.recoverSgas:
                        await this.confirm_recoverSgas(tasks);
                        break;
                    case TaskType.gasToSgas:
                        await this.confirm_gasToSgas(tasks);
                        break;
                    case TaskType.sgasToGas:
                        await this.confirm_sgasToGas(tasks);
                        break;
                    case TaskType.topup:
                        await this.confirm_topup(tasks);
                        break;
                    case TaskType.withdraw:
                        await this.confirm_withdraw(tasks);
                        break;
                    case TaskType.getGasTest:
                        await this.confirm_getGas(tasks);
                        break;
                    case TaskType.domainResovle:
                        await this.confirm_resovler(tasks);
                        break;
                    case TaskType.domainMapping:
                        await this.confirm_mapping(tasks);
                        break;
                    case TaskType.domainRenewal:
                        await this.confirm_renewal(tasks);
                        break;
                    case TaskType.domainTransfer:
                        await this.confirm_domain_transfer(tasks);
                        break;
                    case TaskType.saleDomain:
                        await this.confirm_sale(tasks);
                        break;
                    case TaskType.unSaleDomain:
                        await this.confirm_unsale(tasks);
                        break;
                    case TaskType.buyDomain:
                        await this.confirm_buyDomain(tasks);
                        break;
                    case TaskType.getMyNNC:
                        await this.confirm_getNNC(tasks);
                        break;
                    case TaskType.requestNNC:
                        await this.confirm_requestNNC(tasks);
                        break;
                    case TaskType.bindDomain:
                        await this.confirm_bindDomain(tasks);
                        break;
                    case TaskType.delBindDomain:
                        await this.confirm_delBindDomain(tasks);
                        break;
                    default:
                        break;
                }
            }
        }

        /**
         * 放在任务状态更新后面执行刷新操作，以防数据未变化就刷新操作
         */
        if (TaskFunction.taskHistory)
        {
            TaskFunction.taskHistory();
        }

        // await services.auction.updateAuctionList(LoginInfo.getCurrentAddress());
        for (const index in this.functionList)
        {
            if (this.functionList.hasOwnProperty(index))
            {
                let element = this.functionList[index];
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
            const task = tasks[index];
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
            const element = tasks[index];
            if (element.state == TaskState.watting) //判断如果状态是 watting 则查找对应的返回值
            {
                switch (element.type)
                {
                    case ConfirmType.tranfer:
                        ress[element.txid] = await tools.wwwtool.hastx(element.txid);
                        break;
                    case ConfirmType.contract:
                        ress[element.txid] = await tools.wwwtool.hascontract(element.txid);
                        break;
                    case ConfirmType.recharge:
                        ress[element.txid] = await tools.wwwtool.getrechargeandtransfer(element.txid);
                        break;
                    default:
                        ress[element.txid] = await tools.wwwtool.hastx(element.txid);
                        break;
                }
            } else  //如果状态是 成功或者失败就没必要调用api查询返回结果了
            {
                ress[element.txid] = undefined;
            }
            // console.log("                                           task-update");
            // console.log("task-txid" + element.txid);
            // console.log("task-state-res");
            // console.log(ress[element.txid]);

        }
        return ress;
    }

    static addTask(task: Task, type: TaskType)
    {
        this.taskStore.push(type.toString(), task);
        TaskFunction.newTaskNumber();
    }

    /**
     * 交易确认
     * @param tasks 
     */
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
                let result = ress[task.txid]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    if (task.message.type && task.message.type == "Claim")//判断此交易是否是claim
                    {
                        // TaskFunction.claimGas();
                        tools.coinTool.claimGas()
                            .then(res =>
                            {
                                if (res["sendrawtransactionresult"])
                                {
                                    if (TaskFunction.claimState)
                                        TaskFunction.claimState(2);
                                    let txid = res["txid"];
                                    let amount = JSON.parse(res['amount']);
                                    let height = Store.blockheight.select("height");
                                    TaskManager.addTask(
                                        new Task(ConfirmType.tranfer, txid, { amount }),
                                        TaskType.ClaimGas
                                    );
                                    sessionStorage.setItem("claimState", "2");
                                }

                            })
                            .catch(err =>
                            {
                                console.error(err);

                            })
                    }
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.tranfer.toString(), taskarr); //保存修改的状态
    }


    /**
     * 交易确认
     * @param tasks 
     */
    static async confirm_claimGas(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            if (task.confirm > 3)   //交易确认的次数超过三次，等同于三个块也没有查询到对应的数据 默认失败;
            {
                task.state = TaskState.fail;
                TaskFunction.claimState(0);
            } else
            {
                let result = ress[task.txid]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    TaskFunction.claimState(1);
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.ClaimGas.toString(), taskarr); //保存修改的状态
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
                if (TaskFunction.withdraw)
                    TaskFunction.withdraw();
            } else
            {
                let result = ress[task.txid]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    if (TaskFunction.withdraw)
                        TaskFunction.withdraw();
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.withdraw.toString(), taskarr); //保存修改的状态
    }

    /**
     * 注册器充值操作跟踪
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
                if (TaskFunction.topup)
                    TaskFunction.topup();
            } else
            {
                let result = ress[task.txid]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    if (TaskFunction.topup)
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

            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    Store.session_open.delete(task.message.domain);
                }
                else if (result && result.displayNameList && result.displayNameList.includes("startAuction"))
                {
                    task.state = TaskState.success;
                    Store.session_open.delete(task.message.domain);
                } else
                {
                    task.state = TaskState.fail;
                    Store.session_open.delete(task.message.domain);
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
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                } else if (result && result.displayNameList && result.displayNameList.includes("raise")) //检测是否有对应的通知 addprice
                {
                    task.state = TaskState.success;
                } else if (result && result.displayNameList && result.displayNameList.includes("bidSettlement"))
                {
                    task.state = TaskState.fail;
                } else
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
            let result = ress[task.txid]; //获取通知数组
            if (result && result['errCode']) //检测是否有对应的通知 changeOwnerInfo
            {
                switch (result['errCode'])
                {
                    case '0000'://成功
                        task.state = TaskState.success;
                        if (TaskFunction.exchange)
                            TaskFunction.exchange();
                        break;
                    case '3001'://失败
                        task.state = TaskState.fail;
                        if (TaskFunction.exchange)
                            TaskFunction.exchange();
                        break;
                    case '3002'://失败
                        task.state = TaskState.fail;
                        if (TaskFunction.exchange)
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
                if (TaskFunction.exchange)
                    TaskFunction.exchange();
            } else
            {
                let result = ress[task.txid]; //获取通知数组
                if (result.issucces) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    if (TaskFunction.exchange)
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
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainResovle)
                        TaskFunction.domainResovle(task.message['domain']);
                    domainEdit.delete(task.message['domain'], 'resolver');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("changeOwnerInfo")) //检测是否有对应的通知 changeOwnerInfo
                {
                    task.state = TaskState.success;
                    if (TaskFunction.domainResovle)
                        TaskFunction.domainResovle(task.message['domain']);
                    domainEdit.delete(task.message['domain'], 'resolver');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainResovle)
                        TaskFunction.domainResovle(task.message['domain']);
                    domainEdit.delete(task.message['domain'], 'resolver');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.domainResovle.toString(), taskarr); //保存修改的状态
    }

    static async confirm_domain_transfer(tasks: Task[])
    {
        let ress = await this.getResult(tasks);
        let domainEdit = new sessionStoreTool("domain-edit");
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid];
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainTransfer)
                        TaskFunction.domainTransfer(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'domain_transfer');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("changeOwnerInfo"))
                {
                    task.state = TaskState.success;
                    if (TaskFunction.domainTransfer)
                        TaskFunction.domainTransfer(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'domain_transfer');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainTransfer)
                        TaskFunction.domainTransfer(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'domain_transfer');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.domainTransfer.toString(), taskarr);
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
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainMapping)
                        TaskFunction.domainMapping(task['domain'], undefined)
                    domainEdit.delete(task.message['domain'], 'mapping');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("setResolverData")) //如果返回的通知有 setResolveData则域名映射设置成功
                {
                    task.state = TaskState.success;
                    if (TaskFunction.domainMapping)
                        TaskFunction.domainMapping(task.message['domain'], task.message['address'])
                    domainEdit.delete(task.message['domain'], 'mapping');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainMapping)
                        TaskFunction.domainMapping(task['domain'], undefined)
                    domainEdit.delete(task.message['domain'], 'mapping');
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
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainRenewal)
                        TaskFunction.domainRenewal(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'renewal');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("changeOwnerInfo"))
                {
                    task.state = TaskState.success;
                    if (TaskFunction.domainRenewal)
                        TaskFunction.domainRenewal(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'renewal');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainRenewal)
                        TaskFunction.domainRenewal(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'renewal');
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
            let result = ress[task.txid]; //获取通知数组
            if (task.type == ConfirmType.recharge)
            {

                if (result && result['errCode']) //检测是否有对应的通知 changeOwnerInfo
                {
                    switch (result['errCode'])
                    {
                        case '0000'://成功
                            task.state = TaskState.success;
                            Store.auctionInfo.put(task.message["domain"], false, 'isGetDomainWait');
                            if (TaskFunction.auctionStateUpdate)
                                TaskFunction.auctionStateUpdate();
                            break;
                        case '3001'://失败
                            task.state = TaskState.fail;
                            Store.auctionInfo.put(task.message["domain"], false, 'isGetDomainWait');
                            if (TaskFunction.auctionStateUpdate)
                                TaskFunction.auctionStateUpdate();
                            break;
                        case '3002'://失败
                            task.state = TaskState.fail;
                            Store.auctionInfo.put(task.message["domain"], false, 'isGetDomainWait');
                            if (TaskFunction.auctionStateUpdate)
                                TaskFunction.auctionStateUpdate();
                            break;
                    }
                }
            } else
            {
                if (result && result["vmstate"] && result["vmstate"] != "")
                {
                    if (result.vmstate == "FAULT, BREAK")
                    {
                        task.state = TaskState.fail;
                        Store.auctionInfo.put(task.message["domain"], false, 'isGetDomainWait');
                        if (TaskFunction.auctionStateUpdate)
                            TaskFunction.auctionStateUpdate();
                    }
                    else if (result && result.displayNameList && result.displayNameList.includes("collectDomain"))
                    {
                        task.state = TaskState.success;
                        Store.auctionInfo.put(task.message["domain"], false, 'isGetDomainWait');
                        if (TaskFunction.auctionStateUpdate)
                            TaskFunction.auctionStateUpdate();
                    } else
                    {
                        task.state = TaskState.fail;
                        Store.auctionInfo.put(task.message["domain"], false, 'isGetDomainWait');
                        if (TaskFunction.auctionStateUpdate)
                            TaskFunction.auctionStateUpdate();
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
                Store.auctionInfo.put(task.message["domain"], false, 'isRecoverWait');
                if (TaskFunction.auctionStateUpdate)
                    TaskFunction.auctionStateUpdate();
            } else
            {
                let result = ress[task.txid]; //获取通知数组
                if (result && result.issucces)
                {
                    task.state = TaskState.success;
                    Store.auctionInfo.put(task.message["domain"], false, 'isRecoverWait');
                    if (TaskFunction.auctionStateUpdate)
                        TaskFunction.auctionStateUpdate();
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
            const task = tasks[index];
            if (task.state == TaskState.watting)
            {
                let res = await tools.wwwtool.api_hasclaimgas(task.message.address);
                if (res)
                {
                    if (res[0].code == "3010")//可领取
                    {
                        task.state = TaskState.fail;
                        if (TaskFunction.getGasTest)
                            TaskFunction.getGasTest(0);//可领取
                    } else if (res[0].code == "3012")//已领取
                    {
                        task.state = TaskState.success;
                        if (TaskFunction.getGasTest)
                            TaskFunction.getGasTest(1);//已领取
                    } else if (res[0].code == "3011")//正在领取
                    {
                        task.state = TaskState.watting;
                        if (TaskFunction.getGasTest)
                            TaskFunction.getGasTest(2);//已领取
                    }
                }
            }
            task.confirm++;
            taskarr.push(task);
        }
        this.taskStore.put(TaskType.getGasTest.toString(), taskarr);
    }
    /**
     * 域名出售操作跟踪
     * @param tasks 
     */
    static async confirm_sale(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let domainEdit = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {
                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainSale)
                        TaskFunction.domainSale(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'sale');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("NNSfixedSellingLaunched"))
                {
                    task.state = TaskState.success;
                    if (TaskFunction.domainSale)
                        TaskFunction.domainSale(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'sale');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainSale)
                        TaskFunction.domainSale(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'sale');
                }
            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.saleDomain.toString(), taskarr); //保存修改的状态
    }
    /**
     * 域名下架操作跟踪
     * @param tasks 
     */
    static async confirm_unsale(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let domainEdit = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {

                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainUnSale)
                        TaskFunction.domainUnSale(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'unsale');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("NNSfixedSellingDiscontinued"))
                {
                    task.state = TaskState.success;
                    if (TaskFunction.domainUnSale)
                        TaskFunction.domainUnSale(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'unsale');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.domainUnSale)
                        TaskFunction.domainUnSale(task.message['domain'])
                    domainEdit.delete(task.message['domain'], 'unsale');
                }

            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.unSaleDomain.toString(), taskarr); //保存修改的状态
    }
    /**
     * 域名购买操作跟踪
     * @param tasks 
     */
    static async confirm_buyDomain(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let buyDomain = new sessionStoreTool("buyDomain");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid]; //获取通知数组
            if (task.type == ConfirmType.recharge)
            {
                if (result && result['errCode']) //检测是否有对应的通知 changeOwnerInfo
                {
                    switch (result['errCode'])
                    {
                        case '0000'://成功
                            task.state = TaskState.success;
                            // if (TaskFunction.domainUnSale)
                            //     TaskFunction.domainUnSale(task.message[ 'domain' ])
                            buyDomain.delete(task.message['domain'], 'buy');
                            break;
                        case '3001'://失败
                            task.state = TaskState.fail;
                            buyDomain.delete(task.message['domain'], 'buy');
                            break;
                        case '3002'://失败
                            task.state = TaskState.fail;
                            buyDomain.delete(task.message['domain'], 'buy');
                            break;
                    }
                }
            }

            task.confirm++;
            return task;
        });

        this.taskStore.put(TaskType.buyDomain.toString(), taskarr); //保存修改的状态
    }
    /**
     * 提取NNC
     * @param tasks 
     */
    static async confirm_getNNC(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let getNNC = new sessionStoreTool("getnnc");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid]; //获取通知数组
            if (result && result["vmstate"] && result["vmstate"] != "")
            {

                if (result.vmstate == "FAULT, BREAK")
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.getNNC)
                        TaskFunction.getNNC();
                    getNNC.delete('getnnc');
                }
                else if (result && result.displayNameList && result.displayNameList.includes("getMoneyBack"))
                {
                    task.state = TaskState.success;
                    if (TaskFunction.getNNC)
                        TaskFunction.getNNC();
                    getNNC.delete('getnnc');
                } else
                {
                    task.state = TaskState.fail;
                    if (TaskFunction.getNNC)
                        TaskFunction.getNNC();
                    getNNC.delete('getnnc');
                }

            }
            task.confirm++;
            return task;
        });
        this.taskStore.put(TaskType.getMyNNC.toString(), taskarr); //保存修改的状态
    }
    /**
     * 获取 测试 NNC
     * @param tasks 
     */
    static async confirm_requestNNC(tasks: Task[])
    {
        let taskarr: Task[] = []
        for (let index = 0; index < tasks.length; index++)
        {
            const task = tasks[index];
            if (task.state == TaskState.watting)
            {
                let res = await tools.wwwtool.api_hasclaimnnc(task.message.address);
                if (res)
                {
                    if (res[0].code == "3001")//可领取
                    {
                        task.state = TaskState.fail;
                        if (TaskFunction.getNNCTest)
                            TaskFunction.getNNCTest(0);//可领取
                    } else if (res[0].code == "3002")//可再次领取
                    {
                        task.state = TaskState.fail;
                        if (TaskFunction.getNNCTest)
                            TaskFunction.getNNCTest(0);//可领取
                    } else if (res[0].code == "3004")//已领取
                    {
                        task.state = TaskState.success;
                        if (TaskFunction.getNNCTest)
                            TaskFunction.getNNCTest(1);//已领取
                    } else if (res[0].code == "3003")//正在领取
                    {
                        task.state = TaskState.watting;
                        if (TaskFunction.getNNCTest)
                            TaskFunction.getNNCTest(2);//已领取
                    }
                }
            }
            task.confirm++;
            taskarr.push(task);
        }
        this.taskStore.put(TaskType.requestNNC.toString(), taskarr);
    }
    /**
     * 域名绑定操作跟踪
     * @param tasks 
     */
    static async confirm_bindDomain(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let bindDomain = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid]; //获取通知数组
            console.log(result);
            if (task.type == ConfirmType.contract)
            {
                if (result && result["vmstate"] && result["vmstate"] != "")
                {

                    if (result.vmstate == "FAULT, BREAK")
                    {
                        task.state = TaskState.fail;
                        bindDomain.delete(task.message['domain'], 'bind');
                    }
                    else if (result && result.displayNameList && result.displayNameList.includes("addrCreditRegistered"))
                    {
                        task.state = TaskState.success;
                        bindDomain.delete(task.message['domain'], 'bind');
                    } else
                    {
                        task.state = TaskState.fail;
                        bindDomain.delete(task.message['domain'], 'bind');
                    }
                }
            }

            task.confirm++;
            return task;
        });

        this.taskStore.put(TaskType.bindDomain.toString(), taskarr); //保存修改的状态
    }
    /**
     * 域名解绑操作跟踪
     * @param tasks 
     */
    static async confirm_delBindDomain(tasks: Task[])
    {
        let ress = await this.getResult(tasks); //得到所有的watting返回的查询结果
        let delBindDomain = new sessionStoreTool("domain-edit");
        //遍历管理类数组，在回调中处理后返回新的对象并用数组接收
        let taskarr = this.forConfirm(tasks, (task: Task) =>
        {
            let result = ress[task.txid]; //获取通知数组
            console.log(result);
            if (task.type == ConfirmType.contract)
            {
                if (result && result["vmstate"] && result["vmstate"] != "")
                {

                    if (result.vmstate == "FAULT, BREAK")
                    {
                        task.state = TaskState.fail;
                        delBindDomain.delete(task.message['domain'], 'unbind');
                    }
                    else if (result && result.displayNameList && result.displayNameList.includes("addrCreditRevoke"))
                    {
                        task.state = TaskState.success;
                        delBindDomain.delete(task.message['domain'], 'unbind');
                    } else
                    {
                        task.state = TaskState.fail;
                        delBindDomain.delete(task.message['domain'], 'unbind');
                    }

                }
            }

            task.confirm++;
            return task;
        });
        console.log(taskarr);

        this.taskStore.put(TaskType.delBindDomain.toString(), taskarr); //保存修改的状态
    }
}