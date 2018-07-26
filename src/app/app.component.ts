import { Component, OnInit } from "@angular/core";

import { MtaApi } from "./core/api";
import { Schedule, Stop } from "./models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  stops: Array<Stop["id"]> = ["635"];

  schedules: Schedule[];


  constructor(
    private mtaApi: MtaApi
  ) { }

  ngOnInit(): void {

    // this.mtaApi.getOneStop("635").subscribe((stop) => {
    //   this.stop = stop;
    // });
  }
}
