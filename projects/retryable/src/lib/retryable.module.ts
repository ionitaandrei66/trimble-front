import { NgModule } from '@angular/core';
import {RetryableService} from "./retryable.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ListService} from "./list.service";


@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RetryableService,
            multi: true,
        },
        ListService
    ],
})
export class RetryableModule { }
