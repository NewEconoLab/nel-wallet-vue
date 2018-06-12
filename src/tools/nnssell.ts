import { tools } from "./importpack";
import { Domainmsg, DomainInfo, SellDomainInfo, NNSResult, ResultItem, DataType } from "./entity";
export default class NNSSell
{

    static async getSellingStateByDomain(domain: string)
    {
        // tools.nnstool.initRootDomain(domainarr.reverse[ 0 ]);
        await tools.nnstool.initRootDomain("neo");
        var domainarr: string[] = domain.split('.');
        var nnshash: Neo.Uint256 = tools.nnstool.nameHashArray(domainarr);
        console.log(tools.nnstool.root_neo);
        let data = tools.contract.buildScript(tools.nnstool.root_neo.register, "getSellingStateByFullhash", [ "(hex256)" + nnshash.toString() ]);

        let result = await tools.wwwtool.rpc_getInvokescript(data);
        let info = new SellDomainInfo();

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (!state.includes("HALT, BREAK"))
            {
                throw "error";
            }
            let rest = new NNSResult();
            rest.textInfo = result;
            var stackarr = result[ "stack" ] as any[];
            let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[ 0 ].subItem;

            if (stack.length >= 8)
            {
                // var stack = stackarr[ 0 ].value as any[];
                info.owner = stack[ 0 ].AsHash160();
                info.register = stack[ 1 ].AsHash160();
                info.resolver = stack[ 2 ].AsHash160();
                info.ttl = stack[ 3 ].AsInteger().toString();
                info.startBlockSelling = stack[ 4 ].AsInteger();
                info.endBlock = stack[ 5 ].AsInteger();
                info.maxPrice = stack[ 6 ].AsInteger();
                info.maxBuyer = stack[ 7 ].AsHash160();
                info.lastBlock = stack[ 8 ].AsInteger();
            }

        }
        catch (e)
        {
        }
    }
}