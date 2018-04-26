import { DomainInfo, Consts, RootDomainInfo, LoginInfo } from './entity';
import { WWW } from "./wwwtool";
import { CoinTool } from './cointool';
import { StorageTool } from './storagetool';

/**
 * @name NEONameServiceTool
 * @method initRootDomain_初始化根域名信息
 */
export class NNSTool
{
    static root_test: RootDomainInfo;

    /**
     * @method 初始化根域名信息
     */
    static async initRootDomain()
    {
        var test = new RootDomainInfo();
        // test.roothash = await NNSTool.getRootNameHash();
        test.roothash = NNSTool.nameHash("test");
        test.rootname = "test";
        var scriptaddress = Consts.baseContract.hexToBytes().reverse();
        var domain = await NNSTool.getOwnerInfo(test.roothash, scriptaddress);
        test.owner = domain.owner;
        test.register = domain.register;
        test.resolver = domain.resolver;
        test.ttl = domain.ttl;
        NNSTool.root_test = test;
    }

    /**
     * @method 查询域名信息
     * @param doamin 域名字符串
     */
    static async queryDomainInfo(doamin: string)
    {
        var domainarr: string[] = doamin.split('.');
        var subdomain: string = domainarr[ 0 ];
        // let rootdomain: string = domainarr.pop();    //返回根域名并删除
        var nnshash: Uint8Array = NNSTool.nameHashArray(domainarr);
        // let address = await NNSTool.getSubOwner(nnshash, subdomain, NNSTool.root_test.register);
        let doamininfo = await NNSTool.getOwnerInfo(nnshash, Consts.baseContract.hexToBytes().reverse());
        console.log(doamininfo.ttl);
        let have = false;
        if (doamininfo.ttl)
        {
            var timestamp = new Date().getTime();
            let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(doamininfo.ttl).multiply(1000));
            // let copare: number = new Neo.BigInteger(timestamp).compareTo(doamininfo.ttl.multiply(1000));
            if (copare < 0)
            {
                // console.log('域名已到期');
                have = true;
            }
        }
        // let info = await NNSTool.getNameInfo(nnshash)
        var owner = doamininfo.owner.toHexString();
        // return address;
        if (have)
            return DomainInfo;
        return have;
    }

    /**
     * 注册域名
     * @param doamin 域名字符串
     */
    static async registerDomain(doamin: string)
    {
        // var domainarr: string[] = doamin.split('.');
        // var subdomain: string = domainarr[ 0 ];
        // domainarr.push(NNSTool.root_test.rootname);
        var nnshash: Uint8Array = NNSTool.nameHash(NNSTool.root_test.rootname);
        // let domains = await NNSTool.getSubOwner(nnshash, subdomain, NNSTool.root_test.register);
        var address = LoginInfo.getCurrentAddress();
        var sb = new ThinNeo.ScriptBuilder();
        var scriptaddress = NNSTool.root_test.register;
        sb.EmitParamJson([ "(addr)" + address, "(bytes)" + nnshash.toHexString(), "(str)" + doamin ]);//第二个参数是个数组
        sb.EmitPushString("requestSubDomain");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();
        var res = await CoinTool.contractInvokeTrans(data);
        if (!res.err)
        {
            // WWW.setnnsinfo(address,doamin,);
        }
        return res;
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
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
            }
            var stack = result.stack as any[];
            //find name 他的type 有可能是string 或者ByteArray
            if (stack[ 0 ].type == "Array")
            {
                // info2.textContent += "name=" + stack[0].value + "\n";
                length = stack[ 0 ].lenght;
            }
            else if (stack[ 0 ].type == "ByteArray")
            {
                var bs = (stack[ 0 ].value as string).hexToBytes();
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

        let nameHash: Uint8Array;

        var sb = new ThinNeo.ScriptBuilder();

        sb.EmitParamJson(JSON.parse("[]"));
        sb.EmitPushString("rootNameHash");
        var scriptaddress = Consts.baseContract.hexToBytes().reverse();
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);
        try
        {
            var state = result[ "state" ] as string;
            // info2.textContent = "";
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
            }
            var stack = result[ "stack" ] as any[];
            //find name 他的type 有可能是string 或者ByteArray
            if (stack[ 0 ].type == "ByteArray")
            {
                nameHash = (stack[ 0 ][ "value" ] as string).hexToBytes();
            }
            return nameHash;
        }
        catch (e)
        {
            return e.message;
        }
    }

    static async getNameInfo(domain: Uint8Array)
    {
        var sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson([ "(bytes)" + domain.toHexString() ]);//第二个参数是个数组
        sb.EmitPushString("getOwnerInfo");
        sb.EmitAppCall(Consts.baseContract.hexToBytes().reverse());
        var data = sb.ToArray();
        let result = await WWW.rpc_getInvokescript(data);
        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
            }
            var stackarr = result[ "stack" ] as any[];
            if (stackarr[ 0 ].type == "Array")
            {
                var stack = stackarr[ 0 ].value as any[];
                if (stack[ 0 ].type == "ByteArray")
                {
                    var owner = (stack[ 0 ].value as string).hexToBytes();
                }
                if (stack[ 1 ].type == "ByteArray")
                {
                    let domainmsg = (stack[ 1 ].value as string).hexToBytes();
                }
                if (stack[ 2 ].type == "Boolean")
                {
                    let root = stack[ 2 ].value;
                }
            }
        }
        catch (e)
        {
        }
    }

    //返回域名详情
    static async getOwnerInfo(domain: Uint8Array, scriptaddress: Uint8Array): Promise<DomainInfo>
    {
        let info: DomainInfo = new DomainInfo();
        var sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson([ "(bytes)" + domain.toHexString() ]);//第二个参数是个数组
        sb.EmitPushString("getOwnerInfo");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
            }
            var stackarr = result[ "stack" ] as any[];
            if (stackarr[ 0 ].type == "Array")
            {
                var stack = stackarr[ 0 ].value as any[];
                if (stack[ 0 ].type == "ByteArray")
                {
                    info.owner = (stack[ 0 ].value as string).hexToBytes();
                }
                if (stack[ 1 ].type == "ByteArray")
                {
                    info.register = (stack[ 1 ].value as string).hexToBytes();
                }
                if (stack[ 2 ].type == "ByteArray")
                {
                    info.resolver = (stack[ 2 ].value as string).hexToBytes();
                }
                if (stack[ 3 ].type == "Integer")
                {
                    info.ttl = new Neo.BigInteger(stack[ 3 ].value as string).toString();

                } if (stack[ 3 ].type = "ByteArray")
                {
                    let bt = (stack[ 3 ].value as string).hexToBytes();
                    info.ttl = Neo.BigInteger.fromUint8ArrayAutoSign(bt.clone()).toString();

                    console.log(info.ttl);
                } if (stack[ 4 ].type = "ByteArray")
                {
                    let parentOwner = (stack[ 5 ].value as string).hexToBytes();
                } if (stack[ 5 ].type = "String")
                {
                    let domainstr = stack[ 5 ].value as string;
                } if (stack[ 6 ].type = "ByteArray")
                {
                    let parentHash = (stack[ 6 ].value as string).hexToBytes();
                } if (stack[ 7 ].type = "ByteArray")
                {
                    let bt = (stack[ 7 ].value as string).hexToBytes();
                    let root = Neo.BigInteger.fromUint8ArrayAutoSign(bt);
                }
                if (stack[ 7 ].type = "Integer")
                {
                    let a = new Neo.BigInteger(stack[ 7 ].value as string);
                }
            }
        }
        catch (e)
        {
        }
        console.log(info);

        return info;

    }

    //返回域名hash
    static async getNameHash(domain: string): Promise<Uint8Array>
    {
        let namehash: Uint8Array
        var domainarr: string[] = domain.split('.');
        var subdomain: string = domainarr[ 0 ];
        var root: string = await NNSTool.getRootName();
        domainarr.shift();
        domainarr.push(root)
        var nnshash: Uint8Array = NNSTool.nameHashArray(domainarr);

        return nnshash;
    }

    //计算子域名hash
    static async getNameHashSub(domainhash: Uint8Array, subdomain: string) { }

    //nanmeHashArray
    static async getNameHashArray(nameArray: string[]) { }

    /**
     * 
     * @param protocol 
     * @param nnshash 
     * @param scriptaddress 
     */
    static async resolve(protocol: string, nnshash: Uint8Array, scriptaddress): Promise<Uint8Array>
    {
        let namehash: Uint8Array
        var sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson([ "(str)" + protocol, "(bytes)" + nnshash.toHexString() ]);//第二个参数是个数组
        sb.EmitPushString("resolve");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);
        return;
    }

    //解析域名完整模式
    static async resolveFull(protocol: string, nameArray: string[]) { }

    /**
     * 获得所有者
     * @param nnshash 根域名hash
     * @param subdomain 二级域名
     * @param scriptaddress scriptaddress
     */
    static async getSubOwner(nnshash: Uint8Array, subdomain: string, scriptaddress: Uint8Array): Promise<string>
    {
        let owner: string = "";
        var sb = new ThinNeo.ScriptBuilder();
        //var scriptaddress = Consts.registerContract.hexToBytes().reverse();
        sb.EmitParamJson([ "(bytes)" + nnshash.toHexString(), "(str)" + subdomain ]);//第二个参数是个数组
        sb.EmitPushString("getSubOwner");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await WWW.rpc_getInvokescript(data);

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
                var stack = result.stack as any[];
                //find name 他的type 有可能是string 或者ByteArray
                if (stack[ 0 ].type == "ByteArray")
                {
                    if (stack[ 0 ].value as string != "00")
                    {
                        owner = ThinNeo.Helper.GetAddressFromScriptHash((stack[ 0 ].value as string).hexToBytes());
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
    static nameHashArray(domainarray: string[]): Uint8Array
    {
        domainarray.reverse();
        var hash: Uint8Array = NNSTool.nameHash(domainarray[ 0 ]);
        for (var i = 1; i < domainarray.length; i++)
        {
            hash = NNSTool.nameHashSub(hash, domainarray[ i ]);
        }
        return hash;
    }

    /**
     * 
     * @param owner 拥有者
     * @param nnshash 域名hash
     * @param subdomain 子域名
     * @param protocol 解析器类型
     * @param data 解析地址
     */
    static async setResolveData(owner: string, nnshash: Uint8Array, subdomain: string | Neo.BigInteger, protocol: string, data: string): Promise<boolean>
    {
        try
        {
            var sb = new ThinNeo.ScriptBuilder();
            var scriptaddress = Consts.registerContract.hexToBytes().reverse();
            sb.EmitParamJson([ "(addr)" + owner, "(bytes)" + nnshash.toHexString(), "(str)" + subdomain, "(str)addr", "(addr)" + data ]);//第二个参数是个数组
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
