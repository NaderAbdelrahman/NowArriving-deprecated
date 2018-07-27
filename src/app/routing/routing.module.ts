import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { EditLinesPageComponent, LinesPageComponent } from "../pages";

import { HasSavedStopsGuard } from "./has-saved-stops.guard";

export let routes: Route[] = [
  {
    path: "lines/edit",
    component: EditLinesPageComponent
  },
  {
    path: "lines",
    component: LinesPageComponent,
    canActivate: [ HasSavedStopsGuard ]
  },
  {
    path: "**",
    redirectTo: "/lines"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    })
  ],
  providers: [HasSavedStopsGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
