import { Injectable } from '@angular/core';
import { StoreModel} from "./interfaces";

@Injectable({
    providedIn: 'root'
})
export class ListService {
   private Store: Map<string, StoreModel> =  new Map();

    setObject(obj:  StoreModel[]) {
        this.Store = new Map(
            obj.map((objItem) => [objItem.url, objItem])
        );
    }

    getObject(){
        return this.Store
    }

    getObjectLoader(object: string): any {
        return this.Store.get(object)?.loading ?? false;
    }

}
