import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Observable,
  combineLatest as observableCombineLatest,
  zip as zipObservable,
  interval as intervalObservable,
  fromEvent as observableFromEvent
} from "rxjs";
import { debounceTime, filter, map, startWith, takeUntil, tap } from "rxjs/operators";

import { MtaApi, SavedStopsService } from "../../core/api";
import { Arrival, StopWithSchedule } from "../../models";
import { STOP_LIST } from "../../common";

const LINES_WITH_EXPRESS = new Set(["6", "7"]);

@Component({
  selector: "app-lines",
  templateUrl: "./lines-page.template.html"
})
export class LinesPageComponent implements OnInit, OnDestroy {

  savedStops: Array<{ line: string | number, id: string | number }>;

  stopsWithSchedules: StopWithSchedule[] = [];

  private onDestroyEmitter = new EventEmitter<void>();

  constructor(
    private api: MtaApi,
    private savedStopsService: SavedStopsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadSavedStops();
    this.initLoadDataInterval();
  }

  ngOnDestroy(): void {
    this.onDestroyEmitter.emit();
  }


  redirectToEditLines(): void {
    this.router.navigateByUrl("/lines/edit");
  }

  private initLoadDataInterval(): void {
    const pageVisible$: Observable<boolean> = observableFromEvent(document, "visibilitychange")
      .pipe(
        startWith(!document.hidden),
        map(() => !document.hidden)
      );
    const refreshInterval$ = intervalObservable(30e3)
      .pipe(startWith(0));

    observableCombineLatest(
      refreshInterval$,
      pageVisible$
    )
      .pipe(
        filter(([_, isVisible]) => isVisible),
        takeUntil(this.onDestroyEmitter)
      )
      .subscribe(() => this.loadSchedules());
  }

  private loadSavedStops(): void {
    this.savedStops = this.savedStopsService.getStops();
  }

  private loadSchedules(): void {
    zipObservable(
        ...this.savedStops.map((stop) => {
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
      console.log(stop);
      return (element.line !== stop.line || element.id != stop.stopId);
    });
    this.savedStopsService.setStops(localStorageArr);
    this.stopsWithSchedules = this.stopsWithSchedules.filter((stopWithSchedule) => {
      return stopWithSchedule.stopId !== stop.stopId || stopWithSchedule.line !== stop.line;
    });
    if (localStorageArr.length === 0) {
      this.router.navigateByUrl("/lines/edit");
    }
  }

}

function makeStopWithSchedule(schedule: any): StopWithSchedule {
  const matchingStop = STOP_LIST.find((stop) => `${ stop.id }` === `${ schedule.stopId }`);

  return {
    ...schedule,
    arrivalsNorth: (schedule.arrivalsNorth as Arrival[])
      .filter(({ routeId }) => {
        const lineStr = `${ schedule.line }`,
          routeIdStr = `${ routeId }`;
        if (lineStr === "SIR") {
          return routeIdStr === lineStr || routeIdStr === "SI" || routeIdStr === "SS";
        } else if (LINES_WITH_EXPRESS.has(lineStr)) {
          return routeIdStr === lineStr || routeIdStr === lineStr + "X";
        } else if (lineStr === "S") {

        } else {
          return routeIdStr === lineStr;
        }
      })
      .filter(({ arrivalTime }) => arrivalTime * 1000 >= Date.now())
      .slice(0, 4),
    arrivalsSouth: schedule.arrivalsSouth
      .filter(({ routeId }) => {
        const lineStr = `${ schedule.line }`,
          routeIdStr = `${ routeId }`;
        if (lineStr === "SIR") {
          return routeIdStr === lineStr || routeIdStr === "SI" || routeIdStr === "SS";
        } else if (LINES_WITH_EXPRESS.has(lineStr)) {
          return routeIdStr === lineStr || routeIdStr === lineStr + "X";
        } else {
          return routeIdStr === lineStr;
        }
      })
      .filter(({ arrivalTime }) => arrivalTime * 1000 >= Date.now())
      .slice(0, 4),
    stop: {
      id: matchingStop.id,
      name: matchingStop["Stop Name"]
    }
  };
}
