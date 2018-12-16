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
    time: string;
    isNep5: boolean;
    from: string[];
    to: string[]

    paresTx(txs)
    {
        this.txid = txs["txid"];
        this.addr = txs["addr"];
        this.txType = txs["txType"];
        this.netfee = txs["netfee"];
        this.sysfee = txs["sysfee"];
        this.blockindex = txs["blockindex"];
        this.blocktime = txs["blocktime"];
        this.time = tools.timetool.getTime(this.blocktime);
        this.isNep5 = txs["isNep5"];
        const detail = txs["detail"];
        if (detail)
        {
            this.to = detail["to"];
            this.from = detail["from"];
            this.assetId = detail["assetId"];
            this.assetType = detail["assetType"];
            this.assetName = detail["assetName"];
            this.assetSymbol = detail["assetSymbol"];
            this.assetDecimals = detail["assetDecimals"];
            this.value = Neo.Fixed8.parse(detail["value"]);
            //判断form or to
            this.fromOrTo = parseFloat(detail[`value`]) > 0 ? `from` : `to`;
            this.addr = (this.fromOrTo === 'to' ? (detail["to"] ? detail['to'][0] : "") : (detail['from'] ? detail['from'][0] : ""))
            if (tools.coinTool.id_GAS == this.assetId)
            {
                this.assetName = this.assetSymbol = "GAS";
            }
            if (tools.coinTool.id_NEO == this.assetId)
            {
                this.assetName = this.assetSymbol = "NEO";
            }
        }
    }

}

