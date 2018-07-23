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
     * @param value param[0]:value,param[1]:key
     */
    put(key: string, ...param: any[])
    {
        let value = param[ 0 ];   //第零位是value
        let item = this.getList()
        let obj = item ? item : {};
        if (param.length == 1)
        {
            obj[ key ] = value;
        } else
        {
            let index = param[ 1 ];
            if (obj[ key ])
            {
                obj[ key ][ index ] = value;
            } else
            {
                obj[ key ] = {};
                obj[ key ][ index ] = value;
            }
        }
        localStorage.setItem(this.table, JSON.stringify(obj));
    }

    /**
     * 往key对应的对象里塞数据，如果有相同的值则，往数组中push
     * @param key 
     * @param value 
     */
    push(key, value)
    {
        let item = this.getList();
        let list = item ? item : {};
        let arr = (list[ key ] ? list[ key ] : []) as Array<any>;
        arr.push(value);
        list[ key ] = arr;
        localStorage.setItem(this.table, JSON.stringify(list));
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
     * 根据下标删除对应缓存数组中的数据
     * @param key 主键
     * @param index 下标
     */
    deleteByIndex(key: string, index: number)
    {
        let item = this.getList();
        if (item && item[ key ])
        {
            let arr = [];
            arr = item[ key ];
            arr.splice(index, 1);
            console.log(arr);
            item[ key ] = arr;
            localStorage.setItem(this.table, JSON.stringify(item));
        }
    }

    /**
     * 删除数据
     * @param key key:param[0],要删除的列名
     * @param index index:param[1] 要删除的字段名
     */
    delete(...param: any[])
    {
        let item = this.getList();
        let key = param[ 0 ] as string;
        if (param.length == 1)
        {
            if (item && item[ key ])
            {
                delete item[ key ];
                localStorage.setItem(this.table, JSON.stringify(item));
            }
        } else
        {
            let index = param[ 1 ] as string;
            if (item && item[ key ] && item[ key ][ index ])
            {
                delete item[ key ][ index ];
                localStorage.setItem(this.table, JSON.stringify(item));
            }
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
     * @param value param[0]:value,param[1]:key
     */
    put(key: string, ...param: any[])
    {
        let value = param[ 0 ];   //第零位是value
        let item = this.getList()
        let obj = item ? item : {};
        if (param.length == 1)
        {
            obj[ key ] = value;
        } else
        {
            let index = param[ 1 ];
            if (obj[ key ])
            {
                obj[ key ][ index ] = value;
            } else
            {
                obj[ key ] = {};
                obj[ key ][ index ] = value;
            }
        }
        sessionStorage.setItem(this.table, JSON.stringify(obj));
    }

    /**
     * 往key对应的对象里塞数据，如果有相同的值则，往数组中push
     * @param key 
     * @param value 
     */
    push(key, value)
    {
        let item = this.getList();
        let list = item ? item : {};
        let arr = (list[ key ] ? list[ key ] : []) as Array<any>;
        arr.push(value);
        list[ key ] = arr;
        sessionStorage.setItem(this.table, JSON.stringify(list));
    }

    /**
     * 查找数据
     * @param key 
     */
    select(key: string)
    {
        let item = this.getList()
        if (item)
        {
            return item[ key ];
        } return undefined;
    }

    /**
     * 删除数据
     * @param key key:param[0],要删除的列名
     * @param index index:param[1] 要删除的字段名
     */
    delete(...param: any[])
    {
        let item = this.getList();
        let key = param[ 0 ] as string;
        if (param.length == 1)
        {
            if (item && item[ key ])
            {
                delete item[ key ];
                sessionStorage.setItem(this.table, JSON.stringify(item));
            }
        } else
        {
            let index = param[ 1 ] as string;
            if (item && item[ key ] && item[ key ][ index ])
            {
                delete item[ key ][ index ];
                sessionStorage.setItem(this.table, JSON.stringify(item));
            }
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
        let item = sessionStorage.getItem(table);
        if (item)
        {
            let obj = JSON.parse(item);
            return obj;
        }
        return undefined;
    }
    getList()
    {
        return sessionStoreTool.getTable(this.table);
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
