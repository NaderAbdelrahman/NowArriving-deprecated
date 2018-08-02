import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { map } from "rxjs/operators";

import { Arrival, Schedule, Stop } from "../../models";

// CALLS OUR API TO GET STOPS

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

  getSchedule(stop: string | number): Observable<Schedule> {
    return this.http.get<Schedule>(this.route + "stopSchedule?stopID=" + stop)
      .pipe(
        map(coerceScheduleJSON)
      );
  }
}

function coerceJSON(json: any): Stop {
  return {
    id: json.stop_id,
    name: json.stop_name,
    locationType: json.location_type
  };
}

function coerceScheduleJSON(json: any): Schedule {
  const stopId = Object.keys(json.schedule)[0] as string;
  return {
    stopId,
    arrivalsNorth: json.schedule[stopId]["N"] as Arrival[],
    arrivalsSouth: json.schedule[stopId]["S"] as Arrival[],
    updatedOn: json.updatedOn
  };
}
