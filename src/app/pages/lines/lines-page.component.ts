import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, zip as zipObservable } from "rxjs";
import { map } from "rxjs/operators";

import { MtaApi, SavedStopsService } from "../../core/api";
import { Arrival, StopWithSchedule } from "../../models";
import { STOP_LIST } from "../../common";

@Component({
  selector: "app-lines",
  templateUrl: "./lines-page.template.html"
})
export class LinesPageComponent implements OnInit {

  savedStops: Array<{ line: string | number, id: string | number }>;

  stopsWithSchedules: StopWithSchedule[] = [];

  constructor(
    private api: MtaApi,
    private savedStopsService: SavedStopsService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadSavedStops();
    this.loadSchedules();
  }

  redirectToEditLines(): void {
    this.router.navigateByUrl("/lines/edit");
  }

  private loadSavedStops(): void {
    this.savedStops = this.savedStopsService.getStops();
  }

  private loadSchedules(): void {
    zipObservable(
        ...this.savedStops.map((stop) => {
          console.log(stop);
          return this.api.getSchedule(stop.id, stop.line)
            .pipe(
              map((schedule) => {
                return { ...schedule, line: stop.line };
              }),
            );
        })
      )
      .pipe(
        map(((schedules) => schedules.map(makeStopWithSchedule)))
      )
      .subscribe((schedules) => this.stopsWithSchedules = schedules);
  }

  deleteStation(stop: any) {
    let localStorageArr = this.savedStopsService.getStops();
    localStorageArr = localStorageArr.filter(element => {
      // console.log(element.line, stop.line, element.id, stop.stopId);
      return (element.line !== stop.line || element.id != stop.stopId);
    });
    this.savedStopsService.setStops(localStorageArr);
    // this.savedStops = localStorageArr;
    this.stopsWithSchedules = this.stopsWithSchedules.filter((stopWithSchedule) => {
      // console.log(stopWithSchedule.stopId, stop.stopId, stopWithSchedule.line, stop.line);
      return stopWithSchedule.stopId !== stop.stopId || stopWithSchedule.line !== stop.line;
    });
    if (localStorageArr.length === 0) {
      // console.log("----length is 0-----");
      this.router.navigateByUrl("/lines/edit");
    }
  }

}

function makeStopWithSchedule(schedule: any): StopWithSchedule {
  const matchingStop = STOP_LIST.find((stop) => `${ stop.id }` === `${ schedule.stopId }`);

  return {
    ...schedule,
    arrivalsNorth: (schedule.arrivalsNorth as Arrival[])
      .filter(({ routeId }) => `${ routeId }` === `${ schedule.line }`)
      .filter(({ arrivalTime }) => arrivalTime * 1000 >= Date.now())
      .slice(0, 4),
    arrivalsSouth: schedule.arrivalsSouth
      .filter(({ routeId }) => `${ routeId }` === `${ schedule.line }`)
      .filter(({ arrivalTime }) => arrivalTime * 1000 >= Date.now())
      .slice(0, 4),
    stop: {
      id: matchingStop.id,
      name: matchingStop["Stop Name"]
    }
  };
}


