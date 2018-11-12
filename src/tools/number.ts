Number.prototype.add = function (arg: number | string)
{
    let arg1 = (typeof this) == "number" ? this : parseFloat(this);
    let arg2 = (typeof arg) == "number" ? arg : parseFloat(arg as string);
    var r1, r2, m, c;
    try
    {
        r1 = arg1.toString().split(".")[ 1 ].length;
    }
    catch (e)
    {
        r1 = 0;
    }
    try
    {
        r2 = arg2.toString().split(".")[ 1 ].length;
    }
    catch (e)
    {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0)
    {
        var cm = Math.pow(10, c);
        if (r1 > r2)
        {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else
        {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else
    {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}


export function toNumFixed(params: number | string, num: number)
{
    let res: number = 0;
    if (params.toString().includes('.'))
    {
        const arr = params.toString().split('.');
        arr[ 1 ] = arr[ 1 ].split('')[ num - 1 ];
        res = parseFloat(arr.join('.'));
        console.log(arr);
    }
    else
    {
        res = parseFloat(params.toString());
    }
    return res;
}