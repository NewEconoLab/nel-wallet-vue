import { History } from "../entity/TransferEntitys";
import { tools } from "../tools/importpack";

export class TransferService
{
    async history(address: string, pagesize: number, pageindex: number)
    {
        const transactionHistory: History[] = [];
        const txs = await tools.wwwtool.gettransbyaddressnew(address, pagesize, pageindex)

        for (const key in txs)
        {
            const his = new History()
            his.paresTx(txs[ key ])
            transactionHistory.push(his);
        }
        return transactionHistory;
    }

    txs =
        [
            {
                "addr": "AJ6hqJYnyLLmCT6Cfb7m1R3aXQAEWbeVVo",
                "txid": "0xbdecbb623eee6f9ade28d5a8ff5fb3ea9c9d73af039e0286201b3b0291fb4d4a",
                "txType": "IssueTransaction",
                "vin": [],
                "vout": [
                    {
                        "n": 0,
                        "asset": "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
                        "value": "100000000",
                        "address": "AJ6hqJYnyLLmCT6Cfb7m1R3aXQAEWbeVVo"
                    }
                ],
                "detail": {
                    "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b": {
                        "assetType": "UTXO",
                        "assetName": "小蚁股",
                        "assetSymbol": "小蚁股",
                        "assetDecimals": "",
                        "value": "100000000",
                        "fromOrTo": "to",
                    }
                },
                "netfee": "0",
                "sysfee": "0",
                "blockindex": 0,
                "blocktime": "1468595301",
                "isNep5": false
            },
            {
                "addr": "AeK3VhJq4QfRKsXv7MTpnjLLHi7B8sXbTE",
                "txid": "0x7fdb15659296052d5958830f1df7cfde23e383dbb82015c1646c8e8f075a7e35",
                "txType": "InvocationTransaction",
                "vin": [
                    {
                        "n": 0,
                        "asset": "0x5bb169f915c916a5e30a3c13a5e0cd228ea26826",
                        "value": "11.1",
                        "address": "AXN4uaox3nusecJStjWE1jZVMqfTbhBSPu"
                    }
                ],
                "vout": [
                    {
                        "n": 0,
                        "asset": "0x5bb169f915c916a5e30a3c13a5e0cd228ea26826",
                        "value": "11.1",
                        "address": "AeK3VhJq4QfRKsXv7MTpnjLLHi7B8sXbTE"
                    }
                ],
                "detail": {
                    "0x5bb169f915c916a5e30a3c13a5e0cd228ea26826": {
                        "assetType": "",
                        "assetName": "Ontology Token",
                        "assetSymbol": "ONT",
                        "assetDecimals": "8",
                        "value": "11.1",
                        "fromOrTo": "to"
                    }
                },
                "netfee": "0",
                "sysfee": "0",
                "blockindex": 1205425,
                "blocktime": "1519962350",
                "isNep5": true
            }
        ]
}