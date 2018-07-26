import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MtaApi } from "./mta-api.service";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    MtaApi
  ]
})
export class AppApiModule {

}
