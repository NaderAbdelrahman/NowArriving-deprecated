import { Component, OnInit } from "@angular/core";
import { Observable, of, zip as zipObservable } from "rxjs";

import { MtaApi } from "./core/api";
import { Arrival, Schedule, Stop } from "./models";
import { SCHEDULES_WITH_STOPS, STOP_LIST } from "./common";
import { map, tap } from "../../node_modules/rxjs/operators";

interface StopWithSchedule extends Schedule {
  stop: Stop;
  line: string | number;
}


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [
    `
      [content-width] {
        min-width: 320px;
      }
    `
  ]
})
export class AppComponent implements OnInit {

  savedStops: Array<{ line: string | number, stopId: string | number }> = [
    { line: 6, stopId: "636" },
    { line: 6, stopId: "637" }
  ];

  stopsWithSchedules$: Observable<StopWithSchedule[]>;

  constructor(private api: MtaApi) { }

  ngOnInit(): void {
    this.loadSchedules();
  }

  private loadSchedules(): void {
    this.stopsWithSchedules$ = zipObservable(
        ...this.savedStops.map((stop) => {
          return this.api.getSchedule(stop.stopId)
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
      .filter(({ arrivalTime }) => arrivalTime * 1000 >= Date.now())
      .slice(0, 4),
    arrivalsSouth: schedule.arrivalsSouth
      .filter(({ arrivalTime }) => arrivalTime * 1000 >= Date.now())
      .slice(0, 4),
    stop: {
      id: matchingStop.id,
      name: matchingStop["Stop Name"]
    }
  };
}


