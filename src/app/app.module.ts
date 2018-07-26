import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import {AppCoreModule} from "./core";
import { AppCommonModule } from "./common";

import { AppComponent } from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppCommonModule,
    BrowserModule,
    AppCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
