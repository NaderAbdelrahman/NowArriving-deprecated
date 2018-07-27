import { Component, Input } from "@angular/core";

@Component({
  selector: "app-line-icon",
  templateUrl: "line-icon.template.html",
  styles: [
    `
      :host {
        color: rgb(255, 255, 255);
      }

      .icon-red {
        background-color: rgb(229, 57, 53);
      }

      .icon-green {
        background-color: rgb(51, 105, 30);
      }

      .icon-blue {
        background-color: rgb(9, 93, 177);
      }

      .icon-yellow {
        color: rgb(44, 44, 44);
        background-color: rgb(255, 202, 40);
      }

      [circle] {
        height: 80px;
        width: 80px;
        border-radius: 80px;
      }
    `
  ]
})
export class LineIconComponent {

  lineColor: "blue" | "yellow" | "green" | "red";

  @Input()
  get line(): string | number {
    return this._line;
  }
  set line(val: string | number) {
    if (val === this._line) {
      return;
    }
    this._line = val;

    this.setLineColor();
  }
  private _line: string | number;


  private setLineColor(): void {
    const line = `${ this.line }`;

    const blueLines: Array<string> = ["A", "C", "E"];
    const redLines: Array<string> = ["1", "2", "3"];
    const yellowLines: Array<string> = ["N", "Q", "R"];
    const greenLines: Array<string> = ["4", "5", "6"];

    if (blueLines.includes(line)) {
      this.lineColor = "blue";
      return;
    }

    if (redLines.includes(line)) {
      this.lineColor = "red";
      return;
    }

    if (yellowLines.includes(line)) {
      this.lineColor = "yellow";
      return;
    }

    if (greenLines.includes(line)) {
      this.lineColor = "green";
      return;
    }
  }

}
