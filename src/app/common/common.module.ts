import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LoadingSpinnerComponent } from "./loading-spinner";
import { LineIconComponent } from "./line-icon";

@NgModule({
  imports: [CommonModule],
  declarations: [
    LineIconComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    LineIconComponent,
    LoadingSpinnerComponent
  ]
})
export class AppCommonModule { }
