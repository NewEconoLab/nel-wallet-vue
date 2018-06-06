import { CoinTool } from "./cointool";
import { neotools } from "./neotools";
import { NNSTool } from "./nnstool";
import { StorageTool } from "./storagetool";
import { WWW } from "./wwwtool";
import DateTool from "./timetool";
import Contract from "./contract";
import SgasTool from "./sgastool";

export namespace tools
{
    export let coinTool = CoinTool;
    export let neotool = neotools;
    export let nnstool = NNSTool;
    export let storagetool = StorageTool;
    export let wwwtool = WWW;
    export let timetool = DateTool;
    export let contract = Contract;
    export let sgastoll = SgasTool;

}