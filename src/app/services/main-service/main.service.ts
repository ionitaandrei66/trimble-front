import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private http: HttpClient) {

  }

    fetchDataLongPolling() {
    const url = `${environment.api}/clients/fetchDataLongPolling`;
    this.http.get<any>(url).subscribe(
        (res: any[] ) => {
          console.log(res)
        });
  }
    getClients() {
        const url = `${environment.api}/clients/getClients`;
        this.http.get<any>(url).subscribe(
            (res: any[] ) => {
                console.log(res)
            });
    }
    fetchDataForSubs() {
        const url = `${environment.api}/clients/fetchDataForSubs`;
        this.http.get<any>(url).subscribe(
            (res: any[] ) => {
                console.log(res)
            });
    }


}
