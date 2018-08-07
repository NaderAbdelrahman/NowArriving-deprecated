import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { SavedStopsService } from "../../core/api";

import { STOP_LIST } from "../../common";

@Component({
  selector: "app-edit-lines-page",
  templateUrl: "edit-lines-page.template.html",
  styles: [
    `
      [border-top]{
        height: 6px;
        background-color: rgb(255, 255, 255);
      }
    `
  ]
})
export class EditLinesPageComponent {

  stop: {
    id?: string | number,
    line?: string
  } = {};

  lineOptions = [
    "1", "2", "3",
    "4", "5", "6",
    "A", "C", "E",
    "N", "Q", "R",
    "W", "B", "D",
    "F", "M", "G",
    "J", "Z", "7",
    "S", "L", "SIR"
  ];

  stopOptions: any[] = [];

  constructor(
    private savedStopsService: SavedStopsService,
    private router: Router
  ) { }

  setStopLine(line: string): void {
    this.stop.line = line;
    // Checks if line is null
    this.setStopOptions();
  }

  setStopId(id: number | string): void {
    this.stop.id = id;
    this.saveStop();
  }

  private saveStop(): void {
    const oldSavedStops = this.savedStopsService.getStops();
    const newStop = { ...this.stop  } as { id: string | number, line: string };
    const newSavedStops = [ ...oldSavedStops, newStop ];
    this.savedStopsService.setStops(newSavedStops);
    this.redirectToLinesPage();
  }

  private redirectToLinesPage(): void {
    this.router.navigateByUrl("/lines");
  }

  private setStopOptions(): void {
    if (this.stop.line == null) {
      throw new Error("Stop Line is null, cannot find options");
    }

    this.stopOptions = STOP_LIST
      .filter((stop) => {
        const rawStopLines = stop["Daytime Routes"];
        const lines = typeof rawStopLines === "number" ? [`${ rawStopLines }`] : rawStopLines.split(" ");
        return lines.includes(this.stop.line);
      })
      .map((stop) => {
        return {
          id: stop.id,
          label: stop["Stop Name"]
        };
      });
  }



}
