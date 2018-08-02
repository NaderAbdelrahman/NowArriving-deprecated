import {Component, EventEmitter, Input, Output} from "@angular/core";

import { StopWithSchedule } from "../../models";
import {SavedStopsService} from "../../core/api";

@Component({
  selector: "app-stop-schedule",
  templateUrl: "stop-schedule.template.html",
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class StopScheduleComponent {

  constructor(
    private savedStopService: SavedStopsService
  ) { }
  @Input()
  stop: StopWithSchedule;

  // deleteStation(stop: any) {
  //   let localStorageArr = this.savedStopService.getStops();
  //   localStorageArr = localStorageArr.filter(element => {
  //     return (element.line !== stop.line && element.id !== parseInt(stop.stopId, 10);
  //   });
  //   this.savedStopService.setStops(localStorageArr);
  // }

}
