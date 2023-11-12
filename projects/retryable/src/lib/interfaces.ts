
export interface StoreModel{
    url:string,
    sec?:number,
    loading: boolean,
    start?:Date,
    method?:string,
    recallDelay?: number,
    body?: any,
    retryableMethod?: RetryableMethodModel
}
export interface RetryableMethodModel{
    url:string,
}