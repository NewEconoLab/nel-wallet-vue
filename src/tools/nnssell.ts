import { tools } from "./importpack";
import { Domainmsg, DomainInfo, SellDomainInfo } from "./entity";
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
                    info.owner = Neo.Uint160.parse(stack[ 0 ].value as string);
                }
                if (stack[ 1 ].type == "ByteArray")
                {
                    info.register = Neo.Uint256.parse(stack[ 1 ].value as string);
                }
                if (stack[ 2 ].type == "ByteArray")
                {
                    info.resolver = Neo.Uint256.parse(stack[ 2 ].value as string);
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
                    info.startBlockSelling = Neo.BigInteger.fromUint8Array((stack[ 5 ].value as string).hexToBytes());
                } if (stack[ 5 ].type = "Boolean")
                {
                    info.endBlock = stack[ 5 ].value;
                } if (stack[ 6 ].type = "ByteArray")
                {
                    info.maxPrice = stack[ 6 ].value;
                } if (stack[ 7 ].type = "ByteArray")
                {
                    info.maxBuyer = stack[ 7 ].value
                }
                if (stack[ 8 ].type = "Integer")
                {
                    info.lastBlock = new Neo.BigInteger(stack[ 7 ].value as string);
                }
            }
        }
        catch (e)
        {
        }
    }
}