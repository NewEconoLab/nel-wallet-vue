import { tools } from "../tools/importpack";
import { Task, ConfirmType, TaskType } from "../tools/entity";
import Store from "../tools/StorageMap";

export class DomainBuyService
{
    async domainBuy(domain: string, amount: string)
    {
        const data1 = await tools.nnstool.registerNNC(amount);
        const data2 = await tools.nnstool.buyDomain(domain);
        const res = await tools.wwwtool.rechargeandtransfer(data1, data2);
        console.log("交易发送结果");
        console.log(res);

        // if (res)
        // {
        //     let txid = res[ "txid" ];
        //     tools.taskManager.addTask(
        //         new Task(ConfirmType.contract, txid, { domain: domain, amount: amount }),
        //         TaskType.buyDomain);
        //     domainEdit.put(domain, "watting", "buy");
        //     return txid;
        // }
        if (res && res[ 'errCode' ]) //检测是否有对应的通知 changeOwnerInfo
        {
            switch (res[ 'errCode' ])
            {
                case '0000'://成功
                    tools.taskManager.addTask(
                        new Task(ConfirmType.recharge, res[ "txid" ], { domain: domain, amount: amount }),
                        TaskType.buyDomain);
                    Store.buyDomain.put(domain, "watting", "buy");
                    return true;
                case '3001'://失败
                    break;
                case '3002'://失败
                    break;
            }
        }
        return false
    }
}