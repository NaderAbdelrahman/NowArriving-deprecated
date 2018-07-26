import { Component, Input } from "@angular/core";

import { Arrival } from "../../models";

@Component({
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

}
