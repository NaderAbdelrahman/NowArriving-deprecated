import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MtaApi } from "./mta-api.service";
import { SavedStopsService } from "./saved-stops.service";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    MtaApi,
    SavedStopsService
  ]
})
export class AppApiModule {

}
