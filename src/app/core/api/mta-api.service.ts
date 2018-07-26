import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, pipe} from "rxjs";
import { map } from "rxjs/operators";

import { Schedule, Stop } from "../../models";

@Injectable()
export class MtaApi {

  private route = "https://us-central1-mta-hackathon-4b4c1.cloudfunctions.net/";

  constructor(
    private http: HttpClient
  ) {}

  getAllStops(): Observable<Record<string, Stop>> {
    return this.http.get<any[]>(this.route + "viewAllStops")
      .pipe(
        map((stopObj) => {
          return Object.keys(stopObj).reduce((acc, key) => {
              acc[key] = coerceJSON(stopObj[key]);
              return acc;
          }, {});
        })
      );
  }

  getOneStop(stop: string): Observable<Stop> {
    return this.http.get<any>(this.route + "viewSelectedStops?stopID=" + stop)
      .pipe(
        map(coerceJSON)
    );
  }

  getSchedule(stop: string): Observable<Schedule> {
    return this.http.get<Schedule>(this.route + "stopSchedule?stopID=" + stop);
  }
}

function coerceJSON(json: any): Stop {
  return {
    id: json.stop_id,
    name: json.stop_name,
    locationType: json.location_type
  };
}
