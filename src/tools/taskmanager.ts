import { sessionStoreTool } from "./storagetool";

class TaskManager
{
    taskStore: sessionStoreTool
    constructor(parameters)
    {
        this.taskStore = new sessionStoreTool("task-manager");
    }

    init()
    {
        let taskList = (this.taskStore.getList() as Object);
        for (const task in taskList)
        {
            if (taskList.hasOwnProperty(task))
            {
                const element = taskList[ task ];
                switch (task)
                {
                    case "addprice":

                        break;
                    case "addprice":

                        break;
                    case "addprice":

                        break;
                    case "addprice":

                        break;
                    case "addprice":

                        break;

                    default:
                        break;
                }
            }
        }
    }

    /**
     * 加价确认
     * @param txid 交易id
     */
    addpriceConfirm(txid: string)
    {
    }

}