import { tools } from "./importpack";
import { RootDomainInfo, Consts, LoginInfo, DomainInfo, DomainStatus, Result } from "./entity";

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
        var scriptaddress = Consts.baseContract;
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
        var nnshash: Neo.Uint256 = NNSTool.nameHashArray(domainarr);
        // let address = await NNSTool.getSubOwner(nnshash, subdomain, NNSTool.root_test.register);
        let doamininfo = await NNSTool.getOwnerInfo(nnshash, Consts.baseContract);

        // let info = await NNSTool.getNameInfo(nnshash)
        var owner = doamininfo.owner.toHexString();
        // return address;
        return doamininfo;
    }

    /**
     * 注册域名
     * @param doamin 域名字符串
     */
    static async registerDomain(doamin: string)
    {
        var nnshash: Neo.Uint256 = NNSTool.nameHash(NNSTool.root_test.rootname);
        // let domains = await NNSTool.getSubOwner(nnshash, subdomain, NNSTool.root_test.register);
        var address = LoginInfo.getCurrentAddress();
        var sb = new ThinNeo.ScriptBuilder();
        var scriptaddress = NNSTool.root_test.register;
        //生成随机数
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson([ "(addr)" + address, "(hex256)" + nnshash.toString(), "(str)" + doamin ]);//第二个参数是个数组
        sb.EmitPushString("requestSubDomain");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();
        var res = await tools.coinTool.contractInvokeTrans_attributes(data);
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
        var scriptaddress = Consts.baseContract;
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await tools.wwwtool.rpc_getInvokescript(data);
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
        var scriptaddress = Consts.baseContract;
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();

        let result = await tools.wwwtool.rpc_getInvokescript(data);
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

    //返回域名详情
    static async getOwnerInfo(domain: Neo.Uint256, scriptaddress: Neo.Uint160): Promise<DomainInfo>
    {
        let info: DomainInfo = new DomainInfo();
        var data = tools.contract.buildScript(scriptaddress, "getOwnerInfo", [ "(hex256)" + domain.toString() ]);

        let result = await tools.wwwtool.rpc_getInvokescript(data);

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
        // console.log(info);

        return info;

    }

    /**
     * 生成解析器
     * @param protocol 
     * @param nnshash 
     * @param scriptaddress 
     */
    static async setResolve(domain: string, resolverhash: Uint8Array): Promise<Result>
    {
        let current = LoginInfo.getCurrentLogin();
        let hash = ThinNeo.Helper.GetPublicKeyScriptHashFromPublicKey(current.pubkey);
        let hashstr = hash.reverse().toHexString();
        let arr = domain.split(".");
        let nnshash: Neo.Uint256 = tools.nnstool.nameHashArray(arr);
        let resolvestr = resolverhash.reverse().toHexString();
        var scriptaddress = Consts.baseContract;

        var sb = new ThinNeo.ScriptBuilder();
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson([
            "(hex160)" + hashstr,
            "(hex256)" + nnshash.toString(),
            "(hex160)" + resolvestr ]);//第二个参数是个数组
        sb.EmitPushString("owner_SetResolver");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();
        console.log(data.toHexString());

        let res = await tools.coinTool.contractInvokeTrans_attributes(data);
        return res;
    }

    static async setResolveData(domain: string, str: string, resolve: string)
    {
        let current = LoginInfo.getCurrentLogin();
        let hash = ThinNeo.Helper.GetPublicKeyScriptHashFromPublicKey(current.pubkey);
        let hashstr = hash.reverse().toHexString();
        let arr = domain.split(".");
        let nnshash: Neo.Uint256 = tools.nnstool.nameHashArray(arr);
        var scriptaddress = resolve.hexToBytes();

        var sb = new ThinNeo.ScriptBuilder();
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson([
            "(hex160)" + hashstr,
            "(hex256)" + nnshash.toString(),
            "(str)1",
            "(str)addr",
            "(str)" + str
        ]);
        sb.EmitPushString("setResolveData");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();
        // console.log(data.toHexString())
        let res = await tools.coinTool.contractInvokeTrans_attributes(data);
        return;
    }

    static async resolveData(domain: string)
    {
        var scriptaddress = Consts.baseContract;
        let arr = domain.split(".");
        let nnshash = NNSTool.nameHashArray(arr);
        let nnshashstr = nnshash;

        var sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson([
            "(str)addr",
            "(hex256)" + nnshashstr,
            "(str)1"
        ]);
        sb.EmitPushString("resolve");
        sb.EmitAppCall(scriptaddress);
        var data = sb.ToArray();
        let res = await tools.wwwtool.rpc_getInvokescript(data);
        let addr = "";

        try
        {
            var state = res.state as string;
            // info2.textContent = "";
            if (state.includes("HALT, BREAK"))
            {
                // info2.textContent += "Succ\n";
                var stack = res.stack as any[];
                //find name 他的type 有可能是string 或者ByteArray
                if (stack[ 0 ].type == "ByteArray")
                {
                    if (stack[ 0 ].value as string != "00")
                    {
                        let value = (stack[ 0 ].value as string).hexToBytes();
                        addr = ThinNeo.Helper.Bytes2String(value);
                    }
                }
            }
        }
        catch (e)
        {
            console.log(e);
        }
        return addr;
    }


    //解析域名完整模式
    static async resolveFull(protocol: string, nameArray: string[]) { }


    /**
     * 域名转hash    
     * #region 域名转hash算法
     * 域名转hash算法
     * aaa.bb.test =>{"test","bb","aa"}
     * @param domain 域名
     */
    static nameHash(domain: string): Neo.Uint256
    {
        var domain_bytes = ThinNeo.Helper.String2Bytes(domain);
        var hashd = Neo.Cryptography.Sha256.computeHash(domain_bytes);
        return new Neo.Uint256(hashd);
    }

    /**
     * 子域名转hash
     * @param roothash  根域名hash
     * @param subdomain 子域名
     */
    static nameHashSub(roothash: Neo.Uint256, subdomain: string): Neo.Uint256
    {
        var bs: Uint8Array = ThinNeo.Helper.String2Bytes(subdomain);
        if (bs.length == 0)
            return roothash;

        var domain = Neo.Cryptography.Sha256.computeHash(bs);
        var domain_bytes = new Uint8Array(domain);
        var domainUint8arry = domain_bytes.concat(new Uint8Array(roothash.bits.buffer));

        var sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
        return new Neo.Uint256(sub);
    }

    /**
     * 返回一组域名的最终hash
     * @param domainarray 域名倒叙的数组
     */
    static nameHashArray(domainarray: string[]): Neo.Uint256
    {
        domainarray.reverse();
        var hash: Neo.Uint256 = NNSTool.nameHash(domainarray[ 0 ]);
        for (var i = 1; i < domainarray.length; i++)
        {
            hash = NNSTool.nameHashSub(hash, domainarray[ i ]);
        }
        return hash;
    }


    static verifyDomain(domain)
    {
        //check domain valid
        var reg = /^(.+\.)(test|TEST|[a-z][a-z])$/;
        if (!reg.test(domain))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    static verifyAddr(addr)
    {
        var reg = /^[a-zA-Z0-9]{34,34}$/
        if (!reg.test(addr))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    static domainStatus: DomainStatus;

    static setDomainStatus()
    {

    }

    static initStatus()
    {
        NNSTool.domainStatus = DomainStatus.getStatus() as DomainStatus;
    }

}