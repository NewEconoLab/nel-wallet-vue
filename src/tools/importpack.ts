import { CoinTool } from "./cointool";
import { neotools } from "./neotools";
import { NNSTool } from "./nnstool";
import { StorageTool } from "./storagetool";
import { WWW } from "./wwwtool";
import DateTool from "./timetool";
import Contract from "./contract";
import SgasTool from "./sgastool";
import NNSSell from "./nnssell";

export namespace tools
{

    export let coinTool = CoinTool;         //构造交易，UTXO排序
    export let neotool = neotools;          //NEO的算法工具类
    export let nnstool = NNSTool;           //nns域名处理工具类
    export let storagetool = StorageTool;   //sessionStory
    export let wwwtool = WWW;               //api请求工具类
    export let timetool = DateTool;         //时间工具类
    export let contract = Contract;         //智能合约调用方法封装
    export let sgastool = SgasTool;         //Sgas兑换方法
    export let nnssell = NNSSell;

}