export interface StoreInterface
{
    tablename: string;
    setSotre(data): void;
    getSotre(): any;
    queryStore(...param: any[]): any;
}