import { LoginInfo } from "./entity";

export class StorageTool
{
    static getLoginArr():LoginInfo[]
    {
        var message = sessionStorage.getItem("login-info-arr");
        var arr:LoginInfo[] = JSON.parse(message) as LoginInfo[];
        return arr;
    }
    static setLoginMessage(value:LoginInfo)
    {
        sessionStorage.setItem('login-info-arr',JSON.stringify(value));
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