
export class WWW
{
    static api: string = "https://api.nel.group/api/testnet";
    static apiaggr: string = "https://apiwallet.nel.group/api/testnet";
    static scanApi: string = "https://apiscan.nel.group/api/testnet";
    static makeRpcUrl(url: string, method: string, ..._params: any[])
    {
        if (url[url.length - 1] != '/')
            url = url + "/";
        var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
        for (var i = 0; i < _params.length; i++)
        {
            urlout += JSON.stringify(_params[i]);
            if (i != _params.length - 1)
                urlout += ",";
        }
        urlout += "]";
        return urlout;
    }
    static makeRpcPostBody(method: string, ..._params: any[]): {}
    {
        var body = {};
        body["jsonrpc"] = "2.0";
        body["id"] = 1;
        body["method"] = method;
        var params = [];
        for (var i = 0; i < _params.length; i++)
        {
            params.push(_params[i]);
        }
        body["params"] = params;
        return body;
    }

    static async gettransbyaddress(address: string, pagesize: number, pageindex: number)
    {
        var postdata =
            WWW.makeRpcPostBody(
                "gettransbyaddress",
                address,
                pagesize,
                pageindex
            );
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    static async gettransbyaddressnew(address: string, pagesize: number, pageindex: number)
    {
        var postdata =
            WWW.makeRpcPostBody(
                "gettransbyaddressNew",
                address,
                pagesize,
                pageindex
            );
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r ? r : [];
    }

    static async  api_getHeight()
    {
        var str = WWW.makeRpcUrl(WWW.api, "getblockcount");
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        var height = parseInt(r[0]["blockcount"] as string) - 1;
        return height;
    }
    static async api_getBlockInfo(index: number)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getblocktime", index);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        var time = parseInt(r[0]["time"] as string);
        return time;
    }
    static async api_getAllAssets()
    {
        var str = WWW.makeRpcUrl(WWW.api, "getallasset");
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        return r;
    }
    static async api_getUTXO(address: string)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getutxo", address);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        return r;
    }
    /**判断是否获取了gas */
    static async api_hasclaimgas(address: string)
    {
        var postdata =
            WWW.makeRpcPostBody(
                "hasclaimgas",
                address
            );
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }
    /**
     * 获取gas
     */
    static async api_claimgas(address: string, num: number)
    {
        var postdata =
            WWW.makeRpcPostBody(
                "claimgas",
                address, num
            );
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }
    /**判断是否获取了NNC */
    static async api_hasclaimnnc(address: string)
    {
        var postdata =
            WWW.makeRpcPostBody(
                "hasClaimNNC",
                address
            );
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }
    /**
     * 获取测试网NNC
     */
    static async api_claimNNC(address: string)
    {
        var postdata =
            WWW.makeRpcPostBody(
                "claimNNC",
                address
            );
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    static async api_getnep5Balance(address: string)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getallnep5assetofaddress", address, 1);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        return r;
    }
    static async api_getBalance(address: string)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getbalance", address);
        var value = await fetch(str, { "method": "get" });
        var json = await value.json();
        var r = json["result"];
        return r;
    }

    /**
     * @method 获得nep5资产信息
     * @param asset 资产id
     */
    static async getNep5Asset(asset: string)
    {
        var postdata = WWW.makeRpcPostBody("getnep5asset", asset);
        var result = await fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }

    /**
     * 跟地址获取nep资产id对应的余额
     * @param asset 资产id
     * @param address 地址
     */
    static async getnep5balanceofaddress(asset: string, address: string)
    {
        var postdata = WWW.makeRpcPostBody("getnep5balanceofaddress", asset, address);
        var result = await fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }

    static async api_getAddressTxs(address: string, size: number, page: number)
    {
        var postdata = WWW.makeRpcPostBody("getaddresstxs", address, size, page);
        var result = await fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    static async api_postRawTransaction(data: Uint8Array): Promise<any>
    {
        console.log("===================================这里是交易体的 Hex========" + data.toHexString());

        var postdata = WWW.makeRpcPostBody("sendrawtransaction", data.toHexString());
        var result = await fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw json['error'];
        }
    }

    static async api_getclaimgas(address: string, type: number)
    {
        if (type)
            var str = WWW.makeRpcUrl(WWW.api, "getclaimgas", address, type);
        else
            var str = WWW.makeRpcUrl(WWW.api, "getclaimgas", address);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        if (r == undefined)
            return { gas: 0 };
        return r[0];
    }

    static async api_getclaimtxhex(address: string): Promise<string>
    {
        var str = WWW.makeRpcUrl(WWW.api, "getclaimtxhex", address);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        if (r == undefined)
            return "";
        return r[0]["claimtxhex"];
    }

    static async  rpc_getHeight()
    {
        var str = WWW.makeRpcUrl(WWW.api, "getblockcount");
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        var r = json["result"];
        var height = parseInt(r as string) - 1;
        return height;
    }

    static async  rpc_getStorage(scripthash: Uint8Array, key: Uint8Array): Promise<string>
    {
        var str = WWW.makeRpcUrl(WWW.api, "getstorage", scripthash.toHexString(), key.toHexString());
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        if (json["result"] == null)
            return null;
        var r = json["result"] as string;
        return r;
    }

    static async rpc_getInvokescript(scripthash: Uint8Array): Promise<any>
    {
        var str = WWW.makeRpcUrl(WWW.api, "invokescript", scripthash.toHexString());
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        if (json["result"] == null)
            return null;
        var r = json["result"][0]
        return r;
    }
    static async getrawtransaction(txid: string)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getrawtransaction", txid);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        if (!json["result"])
            return null;
        var r = json["result"][0]
        return r;
    }
    //获取nep5的交易详情
    static async getnep5transferbytxid(txid: string)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getnep5transferbytxid", txid);
        var result = await fetch(str, { "method": "get" });
        var json = await result.json();
        if (!json["result"])
            return null;
        var r = json["result"][0]
        return r;
    }
    //根据域名查询映射地址    
    static async getresolvedaddress(domain: string)
    {
        var postdata = WWW.makeRpcPostBody("getresolvedaddress", domain);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"] == null)
            return null;
        var r = json["result"][0]
        return r;
    }
    // 根据地址查询绑定域名
    static async getboundDomain(addr: string)
    {
        var postdata = WWW.makeRpcPostBody("getMappingDomain", addr);
        var result = await fetch(WWW.scanApi, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"] == null)
            return null;
        var r = json["result"][0]
        return r;
    }

    //获取地址下所有的域名
    static async getnnsinfo(...params): Promise<string[]>
    {
        // let data = params.join(',');
        var postdata = WWW.makeRpcPostBody("getdomainbyaddress", ...params);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"] == null)
            return null;
        var r = json["result"]
        return r;
    }

    /**
     * 发送合约调用
     * @param scriptaddr 合约参数脚本
     */
    static async api_getcontractstate(scriptaddr: string)
    {
        var str = WWW.makeRpcUrl(WWW.api, "getcontractstate", scriptaddr);
        var value = await fetch(str, { "method": "get" });
        var json = await value.json();
        var r = json["result"][0];
        return r;
    }

    /**
     * 获得全量的地址列表的数据
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 页面条数
     */
    static async getauctioninfobyaddress(address: string, currentpage: number, pagesize: number, root: string, search: string)
    {
        var postdata = WWW.makeRpcPostBody("getauctioninfobyaddress", address, currentpage, pagesize, root, search);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    /**
     * 根据id和address更新列表数据
     * @param address 地址
     * @param ids id 列表
     */
    static async getauctioninfobyaucitonid(address: string, ids: string[], root: string)
    {
        var postdata = WWW.makeRpcPostBody("getauctioninfobyaucitonid", address, ids, root);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    /**
     * 根据id和address更新列表数据
     * @param address 地址
     * @param ids id 列表
     */
    static async getdomainauctioninfo(domain: string)
    {
        var postdata = WWW.makeRpcPostBody("getdomainauctioninfo", domain);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    static async searchDomainStatus(domain: string)
    {
        var postdata = WWW.makeRpcPostBody("getdomainstate", domain);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    /**
     * 获得分页总条数
     * @param address 地址
     */
    static async getauctioninfocount(address: string, root: string)
    {
        var postdata = WWW.makeRpcPostBody("getauctioninfocount", address, root);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        return (json && json["result"]) ? json["result"][0]["count"] : 0;
    }

    /**
     * 根据地址查询参与竞拍的域名列表
     * @param address 要查询的地址
     */
    static async api_getBidListByAddress(address: string)
    {
        var postdata = WWW.makeRpcPostBody("getbidlistbyaddress", address);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    /**
     * 获得时间轴的域名详情
     * @param domain 域名
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    static async api_getBidDetail(id: string, currentpage: number, pagesize: number)
    {
        var postdata = WWW.makeRpcPostBody("getbiddetailbydomain", id, currentpage, pagesize);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }

    /**
     * 获得bonus 历史记录
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    static async api_getbonushistbyaddress(address: string, currentpage: number, pagesize: number)
    {
        var postdata = WWW.makeRpcPostBody("getbonushistbyaddress", address, currentpage, pagesize);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }


    /**
     * 获得bonus 历史记录
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    static async getavailableutxos(address: string, count: number)
    {
        var postdata = WWW.makeRpcPostBody("getavailableutxos", address, count);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"];
        return r;
    }


    /**
     * 两笔交易提交给服务器发送
     * @param data1 第一笔交易数据
     * @param data2 第二笔交易数据
     */
    static async rechargeandtransfer(data1: Uint8Array, data2: Uint8Array)
    {
        var postdata = WWW.makeRpcPostBody("rechargeandtransfer", data1.toHexString(), data2.toHexString());
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }

    /**
     * 查询合约调用状态
     * @param txid 交易id
     */
    static async getrechargeandtransfer(txid: string)
    {
        var postdata = WWW.makeRpcPostBody("getrechargeandtransfer", txid);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }

    /**
     * 我的域名的状态
     * @param address 地址
     * @param domain 域名
     */
    static async getDomainState(address: string, id: string)
    {
        var postdata = WWW.makeRpcPostBody("getdomainstate", address, id);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }

    /**
     * 获得交易对应的notify
     * @param txid 
     */
    static async getNotify(txid: string)
    {
        var postdata = WWW.makeRpcPostBody("getnotify", txid);
        var result = await fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }

    /**
     * 查询交易的状态
     * @param txid 
     */
    static async hastx(txid: string)
    {
        var postdata = WWW.makeRpcPostBody("hastx", txid);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }

    /**
     * 查询交易对应notify的方法名
     * @param txid 
     */
    static async hascontract(txid: string)
    {
        var postdata = WWW.makeRpcPostBody("hascontract", txid);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        var r = json["result"][0];
        return r;
    }

    /**
     * 查询我参与竞拍的域名
     * @param address 地址
     * @param domain 域名
     */
    static async searchdomainbyaddress(address: string, domain: string)
    {
        var postdata = WWW.makeRpcPostBody("searchdomainbyaddress", address, domain);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }
    /**查询分红 */
    static async getbonushistbyaddress(address: string, page: number, pagesize: number)
    {
        var postdata = WWW.makeRpcPostBody("getbonushistbyaddress", address, page, pagesize);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }

    /**
     * 获取分红记录列表
     * @param address 
     * @param page 
     * @param pagesize 
     */
    static async getbonusbyaddress(address: string, page: number, pagesize: number)
    {
        var postdata = WWW.makeRpcPostBody("getbonusbyaddress", address, page, pagesize);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }
    /**
     * 出售域名获取NNC的收益
     * @param address 当前地址
     */
    static async getNNCFromSellingHash(address: string)
    {
        var postdata = WWW.makeRpcPostBody("getNNCfromSellingHash", address);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            return 0;
        }
    }
    /**
     * 根据地址查询已出售已成交列表
     * @param address 当前地址
     * @param type 域名类型“neo or test”
     * @param showtype 显示类型“sale or buy”
     * @param page 当前页码
     * @param pagesize 每页条数
     */
    static async getSaleOrBuyList(address: string, type: string, showtype: string, page: number, pagesize: number)
    {
        var postdata = WWW.makeRpcPostBody("getDomainSellingListByAddress", address, type, showtype, page, pagesize);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"];
            return r;
        } else
        {
            return null;

        }
    }
    /**
     * 获取域名的上架信息
     * @param domain 域名
     */
    static async getSaleDomainInfo(domain: string)
    {
        var postdata = WWW.makeRpcPostBody("getNNSfixedSellingInfo", domain);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }
    /**
     * 获取我的分红详情
     * @param addr 当前地址
     */
    static async getcurrentbonus(addr: string)
    {
        var postdata = WWW.makeRpcPostBody("getcurrentbonus", addr);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }
    /**
     * 申请领取分红
     * @param addr 当前地址
     */
    static async applybonus(addr: string)
    {
        var postdata = WWW.makeRpcPostBody("applybonus", addr);
        var result = await fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) });
        var json = await result.json();
        if (json["result"])
        {
            var r = json["result"][0];
            return r;
        } else
        {
            throw "not data";

        }
    }
}