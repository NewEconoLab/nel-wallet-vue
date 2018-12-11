import { History } from "../entity/TransferEntitys";
import { tools } from "../tools/importpack";

export class TransferService
{
    async history(address: string, pagesize: number, pageindex: number)
    {
        const transactionHistory: History[] = [];
        const txs = await tools.wwwtool.gettransbyaddress(address, pagesize, pageindex)
        console.log(txs);

        for (const key in txs)
        {
            const his = new History()
            his.paresTx(txs[ key ])
            transactionHistory.push(his);
        }
        return transactionHistory;
    }

    async nep5Transfer(current: string, toaddress: string, asset: string, amount: number)
    {

    }
}