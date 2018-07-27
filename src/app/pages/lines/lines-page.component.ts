import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, zip as zipObservable } from "rxjs";
import { map } from "rxjs/operators";

import { MtaApi, SavedStopsService } from "../../core/api";
import { Arrival, StopWithSchedule } from "../../models";
import { SCHEDULES_WITH_STOPS, STOP_LIST } from "../../common";

@Component({
  selector: "app-lines",
  templateUrl: "./lines-page.template.html"
})
export class LinesPageComponent implements OnInit {

  savedStops: Array<{ line: string | number, id: string | number }>;

  stopsWithSchedules$: Observable<StopWithSchedule[]>;

  constructor(
    private api: MtaApi,
    private savedStopsService: SavedStopsService,
    private router: Router
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
    this.stopsWithSchedules$ = zipObservable(
        ...this.savedStops.map((stop) => {
          return this.api.getSchedule(stop.id)
            .pipe(
              map((schedule) => {
                return { ...schedule, line: stop.line };
              }),
            );
        })
      )
      .pipe(
        map(((schedules) => schedules.map(makeStopWithSchedule)))
      );
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


