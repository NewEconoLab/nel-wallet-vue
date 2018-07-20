import { sessionStoreTool } from "./storagetool";
import { Task, TaskType } from "./entity";
import { tools } from "./importpack";

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
                switch (parseInt(task) as TaskType)
                {
                    case TaskType.tranfer:

                        break;
                    case TaskType.openAuction:

                        break;
                    case TaskType.addPrice:

                        break;
                    case TaskType.topup:

                        break;
                    case TaskType.withdraw:

                        break;
                    default:
                        break;
                }
            }
        }
    }

    addTask(task: Task, type: TaskType)
    {
        this.taskStore.put(type.toString(), JSON.stringify(task))
    }

}