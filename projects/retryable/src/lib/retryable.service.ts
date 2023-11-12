import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler, HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {Observable, switchMap, throwError, timer} from "rxjs";
import { catchError } from "rxjs/operators";
import {ListService} from "./list.service";

@Injectable({
    providedIn: 'root'
})
export class RetryableService implements HttpInterceptor {
    constructor(private http: HttpClient, private list: ListService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                 return this.checkRequest(request,next);
                }else{
                    const storeRequest = this.list.getObject().get(request.url);
                    if(storeRequest?.loading){
                        storeRequest.loading = false;
                        delete storeRequest.start
                    }
                }
                return next.handle(request);
            })
        );
    }

   private checkRequest(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
        const storeRequest = this.list.getObject().get(request.url);
        const storeRetryableRequest = storeRequest?.retryableMethod?.url ? this.list.getObject().get(storeRequest.retryableMethod.url):null;
        if(storeRequest){
            if(storeRetryableRequest){
                storeRetryableRequest.start =new Date();
                const retryableRequest = this.getRetryableRequest(storeRetryableRequest,storeRequest.recallDelay);
                storeRetryableRequest.loading = true;
                return  this.makeRequest(retryableRequest, request,next);
            }else{
               if(!storeRequest?.start){
                   storeRequest.start = new Date();
                   const retryableRequest = this.getRetryableRequest(request,storeRequest.recallDelay);
                   storeRequest.loading = true;
                  return  this.makeRequest(retryableRequest, request,next);
               }else{
                   let date = new Date(storeRequest.start.getTime() + (storeRequest?.sec ?? 0) * 1000);
                   let currentDate = new Date();
                   if(date.getTime() < currentDate.getTime()) {
                       storeRequest.loading = false;
                       return throwError(new Error('Retry limit reached'));
                   } else {
                        const retryableRequest = this.getRetryableRequest(request,storeRequest.recallDelay);
                       storeRequest.loading = true;
                       return   this.makeRequest(retryableRequest, request,next);
                   }
               }
            }

        }
        return next.handle(request);
    }


    private makeRequest(config: any,request: HttpRequest<any>, next: HttpHandler): Observable<any> {
            const headers = config.headers || new HttpHeaders();
            const body = config.body || null;
        return timer(config.recallDelay).pipe(
            switchMap(() => this.http.request(config.method, config.url, { body, headers }).pipe(
                catchError((err) => {
                    return this.checkRequest(request,next);
                })
            ))
        );
    }

    private getRetryableRequest(originalRequest: any, recallDelay?: number): any {
        return {
            recallDelay: recallDelay ?? 0,
            method: originalRequest.method,
            url: originalRequest.url,
            body: originalRequest?.body ?? null
        };
    }

}
