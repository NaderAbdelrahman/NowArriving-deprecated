import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import {AppCoreModule} from "./core";
import { AppCommonModule } from "./common";
import { AppRoutingModule } from "./routing";
import { EditLinesPageComponent, LinesPageComponent } from "./pages";

import { AppComponent } from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
    LinesPageComponent,
    EditLinesPageComponent
  ],
  imports: [
    AppCommonModule,
    BrowserModule,
    AppCoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
