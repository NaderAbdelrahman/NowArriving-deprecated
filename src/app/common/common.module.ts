import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ArrivalsComponent } from "./arrivals";
import { LoadingSpinnerComponent } from "./loading-spinner";
import { LineIconComponent } from "./line-icon";
import { StopScheduleComponent } from "./stop-schedule";

@NgModule({
  imports: [CommonModule],
  declarations: [
    ArrivalsComponent,
    LineIconComponent,
    LoadingSpinnerComponent,
    StopScheduleComponent
  ],
  exports: [
    ArrivalsComponent,
    LineIconComponent,
    LoadingSpinnerComponent,
    StopScheduleComponent
  ]
})
export class AppCommonModule { }
