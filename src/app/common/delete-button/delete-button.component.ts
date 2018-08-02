import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-delete-button",
  template: `
    <div class="pt2">
      <button
        (click)="clickEvent.emit()"
        class="bg-mid-gray w-100 pv3 f6 ttu dark-red">
        Delete
      </button>
    </div>
  `,
  styles: [ ]
})
export class DeleteButtonComponent {

  @Output()
  clickEvent: any = new EventEmitter();

  // clickEventFunc() {
  //   this.clickEvent.emit();
  // }

}
