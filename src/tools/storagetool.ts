import { LoginInfo } from "./entity";

export class StorageTool
{
    static getLoginArr():LoginInfo[]
    {
        var message = sessionStorage.getItem("login-info-arr");
        var arr:LoginInfo[] = LoginInfo.StringToArray(message);
        return arr;
    }
    static setLoginArr(value:LoginInfo[])
    {
        sessionStorage.setItem('login-info-arr',LoginInfo.ArrayToString(value));
    }
    static setStorage(key:string,value:string)
    {
        sessionStorage.setItem(key,value)
    }
    static getStorage(key:string):string
    {
        return sessionStorage.getItem(key);
    }

}

export class StaticStore
{
    static choiceAsset:string = "";

    static setAsset(asset:string)
    {
        StaticStore.choiceAsset = asset;
    }
}