import { sessionStoreTool } from "./storagetool";

export default class Store
{
    static blockheight = new sessionStoreTool("block");
    //    static blockheight = new sessionStoreTool("");
    //    static blockheight = new sessionStoreTool("");
    //    static blockheight = new sessionStoreTool("");
}