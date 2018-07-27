import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of as observableOf } from "rxjs";

import { SavedStopsService } from "../core/api";
import { tap } from "../../../node_modules/rxjs/operators";

@Injectable()
export class HasSavedStopsGuard implements CanActivate {

  constructor (
    private router: Router,
    private savedStopsService: SavedStopsService
  ) { }

  canActivate(): Observable<boolean> {
    const stops = this.savedStopsService.getStops();
    return observableOf(stops.length > 0)
      .pipe(
        tap((canActivate) => {
            if (!canActivate) {
              this.router.navigateByUrl("/lines/edit");
            }
        })
      );
  }

}

