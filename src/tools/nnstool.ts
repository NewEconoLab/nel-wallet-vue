import { DomainInfo, Consts } from './entity';
import { WWW } from "./wwwtool";

/**
 * @name NEONameServiceTool
 * @method initRootDomain_初始化根域名信息
 */
export class NNSTool
{
    static domainInfo_test:DomainInfo;
    static domainInfo_main:DomainInfo;

    /**
     * @method 初始化根域名信息
     */
    static async initRootDomain()
    {         
        var rootNameHash_test = await NNSTool.getRootNameHash();
        NNSTool.domainInfo_test = await NNSTool.getDomainInfo(rootNameHash_test);
    }

    /**
     * @method 查询域名信息
     * @param doamin 域名字符串
     */
    static async queryDomainInfo(doamin:string)
    {
        var domainarr: string[] = doamin.split('.');
        var subdomain: string = domainarr[0];
        var root: string = await NNSTool.getRootName();
        domainarr.shift();
        domainarr.push(root)
        var nnshash: Uint8Array = NNSTool.nameHashArray(domainarr);
        let domains = await NNSTool.getSubOwner(nnshash, subdomain, NNSTool.domainInfo_test.register);
        return domains;
    }


    /**
     * @method 返回根域名名称
     */
    static async getRootName(): Promise<string>
    {

        let name: string = "";

        var sb = new ThinNeo.ScriptBuilder();

        sb.EmitParamJson(JSON.parse("[]"));
        sb.EmitPushString("rootName");
        var scriptaddress = Consts.baseContract.hexToBytes().reverse();
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);
        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT"))
            {
                // info2.textContent += "Succ\n";
            }
            var stack = result.stack as any[];
            //find name 他的type 有可能是string 或者ByteArray
            if (stack[0].type == "Array")
            {
                // info2.textContent += "name=" + stack[0].value + "\n";
                length = stack[0].lenght;
            }
            else if (stack[0].type == "ByteArray")
            {
                var bs = (stack[0].value as string).hexToBytes();
                name = ThinNeo.Helper.Bytes2String(bs);
            }

            return name;
        }
        catch (e)
        {
            return e.message;
        }
    }

    /**
     * @method 返回根域名hash
     */
    static async getRootNameHash(): Promise<Uint8Array>
    {

        let nameHash: Uint8Array ;

        var sb = new ThinNeo.ScriptBuilder();

        sb.EmitParamJson(JSON.parse("[]"));
        sb.EmitPushString("rootNameHash");
        var scriptaddress = Consts.baseContract.hexToBytes().reverse();
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);
        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT"))
            {
                // info2.textContent += "Succ\n";
            }
            var stack = result.stack as any[];
            //find name 他的type 有可能是string 或者ByteArray
            if (stack[0].type == "ByteArray")
            {
                nameHash = (stack[0].value as string).hexToBytes();
            }
            return nameHash;
        }
        catch (e)
        {
            return e.message;
        }
    }

    //返回域名详情
    static async getDomainInfo(domain: Uint8Array): Promise<DomainInfo>
    {
        let info: DomainInfo = new DomainInfo();
        var sb = new ThinNeo.ScriptBuilder();
        var scriptaddress = Consts.baseContract.hexToBytes().reverse();
        sb.EmitParamJson(["(bytes)" + domain.toHexString()]);//第二个参数是个数组
        sb.EmitPushString("getInfo");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT"))
            {
                // info2.textContent += "Succ\n";
            }
            var stackarr = result.stack as any[];
            if (stackarr[0].type == "Array")
            {
                var stack = stackarr[0].value as any[];
                if (stack[0].type == "ByteArray")
                {
                    info.owner = (stack[0].value as string).hexToBytes();

                }
                if (stack[1].type == "ByteArray")
                {
                    info.register = (stack[1].value as string).hexToBytes();
                }
                if (stack[2].type == "ByteArray")
                {
                    info.resolver = (stack[2].value as string).hexToBytes();
                }
                if (stack[3].type == "Integer")
                {
                    info.ttl = new Neo.BigInteger(stack[3].value as string);
                }
            }
        }
        catch (e)
        {
        }
        return info;
    }

    //返回域名hash
    static async getNameHash(domain: string): Promise<Uint8Array>
    {
        let namehash: Uint8Array
        var domainarr: string[] = domain.split('.');
        var subdomain: string = domainarr[0];
        var root: string = await NNSTool.getRootName();
        domainarr.shift();
        domainarr.push(root)
        var nnshash: Uint8Array = NNSTool.nameHashArray(domainarr);
        
        return nnshash;
    }

    //计算子域名hash
    static async getNameHashSub(domainhash: Uint8Array, subdomain: string) {}

    //nanmeHashArray
    static async getNameHashArray(nameArray: string[]) {}

    //解析域名
    static async resolve(protocol: string, nnshash: Uint8Array, scriptaddress): Promise<Uint8Array>
    {
        let namehash: Uint8Array
        var sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson(["(str)" + protocol, "(bytes)" + nnshash.toHexString()]);//第二个参数是个数组
        sb.EmitPushString("resolve");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);
        return;
    }

    //解析域名完整模式
    static async resolveFull(protocol: string, nameArray: string[]) {}
    
    /**
     * 此接口为注册器规范要求，必须实现，完整解析域名时会调用此接口验证权利
     * @param nnshash   域名中除最后一位的hash : aa.bb.cc 中的 bb.cc的hash
     * @param subdomain 域名中的最后一位: aa.bb.cc 中的 aa
     */
    static async getSubOwner(nnshash: Uint8Array, subdomain: string, scriptaddress: Uint8Array): Promise<string>
    {
        let owner: string="";
        var sb = new ThinNeo.ScriptBuilder();
        //var scriptaddress = Consts.registerContract.hexToBytes().reverse();
        sb.EmitParamJson(["(bytes)" + nnshash.toHexString(), "(str)" + subdomain]);//第二个参数是个数组
        sb.EmitPushString("getSubOwner");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT"))
            {
                // info2.textContent += "Succ\n";
                var stack = result.stack as any[];
                //find name 他的type 有可能是string 或者ByteArray
                if (stack[0].type == "ByteArray")
                {
                    if (stack[0].value as string != "00")
                    {
                        owner = ThinNeo.Helper.GetAddressFromScriptHash((stack[0].value as string).hexToBytes());
                    }
                }
            }
        }
        catch (e)
        {
            console.log(e);
        }
        return owner;
    }
    
    /**
     * 此接口为演示的先到先得注册器使用，用户调用注册器的这个接口申请域名
     * @param who         注册人的地址
     * @param nnshash     域名中除最后一位的hash : aa.bb.cc 中的 bb.cc的hash
     * @param subdomain   域名中的最后一位: aa.bb.cc 中的 aa
     */
    static async requestSubDomain(who: string, nnshash: Uint8Array, subdomain: string): Promise<any>
    {

        let namehash: Uint8Array
        var sb = new ThinNeo.ScriptBuilder();
        var scriptaddress = Consts.registerContract.hexToBytes().reverse();
        sb.EmitParamJson(["(bytes)" + nnshash.toHexString(), "(str)" + subdomain]);//第二个参数是个数组
        sb.EmitPushString("getSubOwner");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT"))
            {
                // info2.textContent += "Succ\n";
            }
            var stack = result.stack as any[];
            //find name 他的type 有可能是string 或者ByteArray
            if (stack[0].type == "ByteArray")
            {
                namehash = (stack[0].value as string).hexToBytes();
            }
        }
        catch (e)
        {
            console.log(e);
        }
        return;
    }

    //#region 域名转hash算法
    //域名转hash算法
    //aaa.bb.test =>{"test","bb","aa"}
    /**
     * 域名转hash
     * @param domain 域名
     */
    static nameHash(domain: string): Uint8Array
    {
        var domain_bytes = ThinNeo.Helper.String2Bytes(domain);
        var hashd = Neo.Cryptography.Sha256.computeHash(domain_bytes);
        var namehash = new Uint8Array(hashd);
        return namehash.clone();
    }

    /**
     * 子域名转hash
     * @param roothash  根域名hash
     * @param subdomain 子域名
     */
    static nameHashSub(roothash: Uint8Array, subdomain: string): Uint8Array
    {
        var bs: Uint8Array = ThinNeo.Helper.String2Bytes(subdomain);
        if (bs.length == 0)
            return roothash;

        var domain = Neo.Cryptography.Sha256.computeHash(bs);
        var domain_bytes = new Uint8Array(domain);
        var domainUint8arry = domain_bytes.concat(roothash);

        var sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
        var sub_bytes = new Uint8Array(sub);
        return sub_bytes.clone();
    }

    /**
     * 返回一组域名的最终hash
     * @param domainarray 域名倒叙的数组
     */
    static nameHashArray(domainarray:string[]):Uint8Array
    {
        domainarray.reverse();
        var hash: Uint8Array = NNSTool.nameHash(domainarray[0]);
        for (var i = 1; i < domainarray.length; i++)
        {
            hash = NNSTool.nameHashSub(hash, domainarray[i]);
        }
        return hash;
    }

    static async setResolveData(owner: string, nnshash: Uint8Array, subdomain: string | Neo.BigInteger, protocol: string, data: string): Promise<boolean>
    {
        try
        {
            var sb = new ThinNeo.ScriptBuilder();
            var scriptaddress = Consts.registerContract.hexToBytes().reverse();
            sb.EmitParamJson(["(addr)" + owner, "(bytes)" + nnshash.toHexString(), "(str)" + subdomain, "(str)addr", "(addr)" + data]);//第二个参数是个数组
            sb.EmitPushString("getSubOwner");
            sb.EmitAppCall(scriptaddress);
            //var data = sb.ToArray();

            //let result = await WWW.rpc_getInvokescript(data);

        }
        catch (e)
        {

        }
        return true;
    }
}
