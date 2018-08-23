export interface StoreInterface
{
    tablename: string;
    setSotre(...param: any[]): void;
    getSotre(): any;
    queryStore(...param: any[]): any;
}