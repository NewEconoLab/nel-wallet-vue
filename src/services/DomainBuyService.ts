import { tools } from "../tools/importpack";
import { Task, ConfirmType, TaskType } from "../tools/entity";
import { sessionStoreTool } from "tools/storagetool";

export class DomainBuyService
{
    async domainBuy(domain: string, amount: string)
    {
        let domainEdit: sessionStoreTool;
        const data1 = await tools.nnstool.registerNNC(amount);
        const data2 = await tools.nnstool.buyDomain(domain);
        const res = await tools.wwwtool.rechargeandtransfer(data1, data2);
        console.log(res);

        if (res)
        {
            let txid = res[ "txid" ];
            tools.taskManager.addTask(
                new Task(ConfirmType.contract, txid, { domain: domain, amount: amount }),
                TaskType.buyDomain);
            domainEdit.put(domain, "watting", "buy");
            return txid;
        }
        return false
    }
}