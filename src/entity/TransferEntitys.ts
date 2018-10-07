import { tools } from "../tools/importpack";

export class History
{
    addr: string;
    txid: string;
    txType: string;
    fromOrTo: string;
    assetId: string;
    assetType: string;
    assetName: string;
    assetSymbol: string;
    assetDecimals: string;
    value: Neo.Fixed8;
    netfee: Neo.Fixed8;
    sysfee: Neo.Fixed8;
    blockindex: number;
    blocktime: number;
    isNep5: boolean;

    static paresTx(txs): History[]
    {
        let txid = txs[ "txid" ];
        let addr = txs[ "addr" ];
        let txType = txs[ "txType" ];
        let netfee = txs[ "netfee" ];
        let sysfee = txs[ "sysfee" ];
        let blockindex = txs[ "blockindex" ];
        let blocktime = txs[ "blocktime" ];
        let isNep5 = txs[ "isNep5" ];
        blocktime = tools.timetool.getTime(parseInt(blocktime));
        let historys: History[] = []
        for (const assetid in txs[ "detail" ])
        {
            const detail = txs[ "detail" ][ assetid ];
            let history = new History();
            history.txid = txid;
            history.addr = addr;
            history.txType = txType;
            history.netfee = netfee;
            history.sysfee = sysfee;
            history.blockindex = blockindex;
            history.blocktime = blocktime;
            history.isNep5 = isNep5;
            history.assetId = assetid;
            history.fromOrTo = detail[ "fromOrTo" ];
            history.assetType = detail[ "assetType" ];
            history.assetName = detail[ "assetName" ];
            history.assetSymbol = detail[ "assetSymbol" ];
            history.assetDecimals = detail[ "assetDecimals" ];
            history.value = Neo.Fixed8.parse(detail[ "value" ]);
            if (tools.coinTool.id_GAS == assetid)
                history.assetName = history.assetSymbol = "GAS";
            if (tools.coinTool.id_NEO == assetid)
                history.assetName = history.assetSymbol = "NEO";
            historys.push(history);
        }
        return historys;
    }

}

