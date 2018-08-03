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

      .icon-purple {
        background-color: rgb(143, 57, 178);
      }

      .icon-brown {
        background-color: rgb(121, 85, 72);
      }

      .icon-limeGreen {
        background-color: rgb(139, 195, 74);
      }

      .icon-grey {
        background-color: rgb(136, 136, 136);
      }
      
      .icon-orange {
        background-color: rgb(244, 129, 0);
      }

      .icon-yellow {
        color: rgb(44, 44, 44);
        background: rgb(255, 202, 40);
      }

      .icon-SIR {
        background-color: rgb(9, 93, 177);
      }
      
      .icon-SIR-span {
        letter-spacing: -3px;
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

  lineColor: "blue" | "yellow" | "green" | "red" | "orange" | "limeGreen" | "grey" | "brown" | "purple" | "SIR";

  @Input()
  get line(): string | number {
    return this._line;
  }
  set line(val: string | number) {
    if (val === this._line) {
      return;
    }
    this._line = String(val);

    this.setLineColor();
  }
  private _line: string;


  isSIR(): boolean {
    return this._line === "SIR";
  }

  private setLineColor(): void {
    const line = `${ this.line }`;

    const blueLines: Array<string> = ["A", "C", "E", "H"];
    const redLines: Array<string> = ["1", "2", "3"];
    const yellowLines: Array<string> = ["N", "Q", "R", "W"];
    const greenLines: Array<string> = ["4", "5", "6"];
    const orangeLines: Array<string> = ["B", "D", "F", "M"];
    const limeGreenLines: Array<string> = ["G"];
    const greyLines: Array<string> = ["L", "S"];
    const brownLines: Array<string> = ["J", "Z"];
    const purpleLines: Array<string> = ["7"];
    const SIRLines: Array<string> = ["SIR"];

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

    if (orangeLines.includes(line)) {
      this.lineColor = "orange";
      return;
    }

    if (limeGreenLines.includes(line)) {
      this.lineColor = "limeGreen";
      return;
    }

    if (greyLines.includes(line)) {
      this.lineColor = "grey";
      return;
    }

    if (brownLines.includes(line)) {
      this.lineColor = "brown";
      return;
    }

    if (purpleLines.includes(line)) {
      this.lineColor = "purple";
      return;
    }

    if (SIRLines.includes(line)) {
      this.lineColor = "SIR";
      return;
    }
  }

}
