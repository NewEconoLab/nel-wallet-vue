import { sessionStoreTool } from "./storagetool";

class Store
{
    session: sessionStoreTool
    constructor(table: string)
    {
        this.session = new sessionStoreTool(table);
    }
    init()
    {
    }
    update() { }
}