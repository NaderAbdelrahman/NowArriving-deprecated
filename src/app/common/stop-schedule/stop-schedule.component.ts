import { Component, Input } from "@angular/core";

import { StopWithSchedule } from "../../models";

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

  @Input()
  stop: StopWithSchedule;

}
