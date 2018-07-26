import { Component, Input } from "@angular/core";

@Component({
  selector: "app-line-icon",
  templateUrl: "line-icon.template.html",
  styles: [
    `
      .red {
        background-color: rgb(229, 59, 59);
      }

      .green {
        background-color: rgb(53, 104, 35);
      }

      .blue {
        background-color: rgb(19, 96, 174);
      }

      .yellow {
        background-color: rgb(254, 201, 62);
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
