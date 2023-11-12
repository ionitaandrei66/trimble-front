import {StoreModel} from "./interfaces/loader-object";

export const Store:StoreModel[] =[
      {
         url:'http://localhost:3000/clients/getClients',
         sec:60,
         recallDelay: 5000,
         loading: false,
         method:'GET',
      },
     {
         url:'http://localhost:3000/clients/getStatusLongPolling',
         sec:60,
         recallDelay: 3000,
         loading: false,
         method:'GET',
     },
     {
         url:'http://localhost:3000/clients/fetchDataLongPolling',
         loading: false,
         method:'GET',
         retryableMethod:{
             url:'http://localhost:3000/clients/getStatusLongPolling',
         }
     },
 ]

export const StoreMap: Map<string, StoreModel> = new Map(
    Store.map((storeModel) => [storeModel.url, storeModel])
);
