import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import { distanceInWordsToNow, format} from "date-fns";
import { Observable, interval } from "rxjs";
import { map, startWith } from "rxjs/operators";

import {Arrival} from "../../models";

interface ReadableArrival {
  time: string;
  routeId: Arrival["routeId"];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-arrivals",
  templateUrl: "arrivals.template.html",
  styles: [
    `
      :host {
        display: block;
        border-top: #ffffff 4px solid;
        border-left: 1px solid var(--gray--dark);
        border-right: 1px solid var(--gray--dark);
        border-bottom: 1px solid var(--gray--dark);

        padding: 1rem;
      }

      .blinking {
        font-size: 2.5rem;
        color: transparent;
        animation: blinkingText 1s linear;
      }

      @keyframes blinkingText {
        0% {
          color: transparent;
        }
        50% {
          color: #fff;
        }
        100% {
          color: transparent;
        }
      }
    `
  ]
})
export class ArrivalsComponent {

  arrivalsObs$ = this.initObservableArrivals();

  @Input()
  arrivals: Arrival[];

  @Input()
  direction: string;

  initObservableArrivals(): Observable<ReadableArrival[]> {
    return interval(1000)
      .pipe(
        startWith(0),
        map(() => this.makeArrivalData())
      );
  }

  makeArrivalData(): ReadableArrival[] {
    return this.arrivals
        .map((arrival): ReadableArrival => {
          const val = distanceInWordsToNow(arrival.arrivalTime * 1000);
          let time: string;
          // if time is greater than 45 minutes, display time of arrival in hrs & mins
          if (arrival.arrivalTime * 1000 - Date.now() > 2700000) {
            time = format(arrival.arrivalTime * 1000, "HH:mm A");
          } else if (val.includes("less than a minute")) {
            time = val.replace(/less than a minute/g, "< 1 min");
          } else if (val.includes("minutes")) {
            time = val.replace(/minutes/g, "min");
          } else if (val.includes("minute")) {
            time = val.replace(/minute/g, "min");
          } else if (val.includes("about 1 hour")) {
            time = val.replace(/about 1 hour/g, "~ an hr");
          } else {
            time = val;
          }
          return { time, routeId: arrival.routeId };
        });
  }

}
