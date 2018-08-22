import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

import {Arrival} from "../../models";
import { Observable, interval } from "rxjs";

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
    `
  ]
})
export class ArrivalsComponent {

  @Input()
  arrivals: Arrival[];

  @Input()
  direction: string;

  initObservableArrivals(): Observable<string[]> {
    return interval(1000)
      .pipe(
        () => this.makeArrivalData()
      );
  }

  makeArrivalData(): void {
    this.arrivals.map((arrival, idx) => {
      if (idx === 0) {
        return ((arrival - Date.now()) * 1000) * 60;
      }
      // return count up string
    });
  }

}
