import { Component } from '@angular/core';
import {Store} from "./services/interceptor-loader-object";
import {MainService} from "./services/main-service/main.service";
import {ListService} from "../../projects/retryable/src/lib/list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private listService: ListService, private mainService: MainService) {
    this.listService.setObject(Store);
    this.mainService.fetchDataLongPolling();
  }
}
