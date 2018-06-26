import { tools } from "./importpack";
import { UTXO, LoginInfo } from "./entity";

export class StorageTool
{
    static getLoginArr(): LoginInfo[]
    {
        var message = sessionStorage.getItem("login-info-arr");

        var arr: LoginInfo[] = message ? LoginInfo.StringToArray(message) : [];
        return arr;
    }
    static setLoginArr(value: LoginInfo[])
    {
        sessionStorage.setItem('login-info-arr', LoginInfo.ArrayToString(value));
    }
    static setStorage(key: string, value: string)
    {
        sessionStorage.setItem(key, value)
    }
    static storageArrayPush(key: string, value: any)
    {
        let arr = sessionStorage.getItem(key);
        arr ? arr : arr = "[]";
        let obj = JSON.parse(arr) as Array<any>;
        obj.push(value);
        sessionStorage.setItem(key, JSON.stringify(obj))
    }
    static getStorage(key: string): string
    {
        return sessionStorage.getItem(key);
    }
    static delStorage(key: string)
    {
        sessionStorage.removeItem(key);
    }
    static async heightRefresh()
    {
        let oldheight = StorageTool.getStorage("block-height");
        let height = await tools.wwwtool.api_getHeight() as number;
        if (oldheight == undefined || oldheight == null || oldheight == "")
        {
            StorageTool.setStorage("block-height", height.toString());
        }
        if (height - parseInt(oldheight) >= 2)
        {
            StorageTool.utxosRefresh();
            StorageTool.setStorage('block-height', height.toString());
        }
        // setInterval(this.heightRefresh(), 30000);
    }
    static async utxosRefresh()
    {
        let assets = await tools.coinTool.getassets()
        UTXO.setAssets(assets);
    }

}


/**
 * @class localStorage工具类
 */
export class LocalStoreTool
{
    //表名
    public table: string;

    //初始化对象
    constructor(table: string)
    {
        this.table = table;
    }

    /**
     * 添加数据
     * @param key 
     * @param value 
     */
    put(key: string, value: any)
    {
        let item = LocalStoreTool.getTable(this.table);
        let obj = item ? item : {};
        obj[ key ] = value;
        localStorage.setItem(this.table, JSON.stringify(obj));
    }

    set(obj: {})
    {
        localStorage.setItem(this.table, JSON.stringify(obj));
    }

    /**
     * 查找数据
     * @param key 
     */
    select(key: string)
    {
        let item = LocalStoreTool.getTable(this.table);
        if (item)
        {
            return item[ key ];
        } return undefined;
    }

    /**
     * 删除数据
     * @param key 
     */
    delete(key: string)
    {
        let item = LocalStoreTool.getTable(this.table);
        if (item && item[ key ])
        {
            delete item[ key ];
            localStorage.setItem(this.table, JSON.stringify(item));
        }
    }

    /**
     * 更新数据(其实put就可以了直接覆盖掉已有的数据)
     * @param key 
     * @param value 
     */
    update(key: string, value: any)
    {
        let item = LocalStoreTool.getTable(this.table);
        if (item && item[ key ])
        {
            item[ key ] = value;
        }
    }

    getList()
    {
        return LocalStoreTool.getTable(this.table);
    }

    /**
     * 获得整张表的数据
     * @param table 
     */
    static getTable(table: string)
    {
        let item = localStorage.getItem(table);
        if (item)
        {
            let obj = JSON.parse(item);
            return obj;
        }
        return undefined;
    }
}

/**
 * @class sessionStorage工具类
 */
export class sessionStoreTool
{
    //表名
    public table: string;

    //初始化对象
    constructor(table: string)
    {
        this.table = table;
    }

    /**
     * 添加数据
     * @param key 
     * @param value 
     */
    put(key: string, value: any)
    {
        let item = sessionStoreTool.getTable(this.table);
        let obj = item ? item : {};
        obj[ key ] = value;
        localStorage.setItem(this.table, JSON.stringify(obj));
    }

    /**
     * 查找数据
     * @param key 
     */
    select(key: string)
    {
        let item = sessionStoreTool.getTable(this.table);
        if (item)
        {
            return item[ key ];
        } return undefined;
    }

    /**
     * 删除数据
     * @param key 
     */
    delete(key: string)
    {
        let item = sessionStoreTool.getTable(this.table);
        if (item && item[ key ])
        {
            delete item[ key ];
            localStorage.setItem(this.table, JSON.stringify(item));
        }
    }

    /**
     * 更新数据(其实put就可以了直接覆盖掉已有的数据)
     * @param key 
     * @param value 
     */
    update(key: string, value: any)
    {
        let item = sessionStoreTool.getTable(this.table);
        if (item && item[ key ])
        {
            item[ key ] = value;
        }
    }

    /**
     * 获得整张表的数据
     * @param table 
     */
    static getTable(table: string)
    {
        let item = localStorage.getItem(table);
        if (item)
        {
            let obj = JSON.parse(item);
            return obj;
        }
        return undefined;
    }
}

export class StaticStore
{
    static choiceAsset: string = "";

    static setAsset(asset: string)
    {
        StaticStore.choiceAsset = asset;
    }
}
