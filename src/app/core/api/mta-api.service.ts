import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import {map} from "rxjs/operators";

import { Arrival, Schedule, Stop } from "../../models";
import {Router} from "@angular/router";

// CALLS OUR API TO GET STOPS

// type ApiResponse = {
//   success: true;
//   data: any;
// } | {
//   success: false;
//   error: string;
// };
//
// enum ApiError {
//   BAD_REQUEST,
//   SERVER_ERROR
// }

@Injectable()
export class MtaApi {

  private route = "https://us-central1-mta-hackathon-4b4c1.cloudfunctions.net/";
  // private mtaRoute = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/";
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // getAllStops(): Observable<Record<string, Stop>> {
  //   return this.http.get<any[]>(this.route + "viewAllStops")
  //     .pipe(
  //       map((stopObj) => {
  //         return Object.keys(stopObj).reduce((acc, key) => {
  //             acc[key] = coerceJSON(stopObj[key]);
  //             return acc;
  //         }, {});
  //       })
  //     );
  // }
  //
  // // : Observable<Stop>
  // getOneStop(stop: string) {
  //   console.log(this.http.get<any>(this.route + "getStationsByLine/" + stop));
  //   // return this.http.get<any>(this.route + "getStationsByLine/" + stop)
  //   //   .pipe(
  //   //     map(coerceJSON)
  //   // );
  // }

  getStopsByLine(line: string, extra?: string) {
    return this.http.get(this.route + "getStopsByLine?line=" + line).pipe(
      map((res: string) => JSON.parse(res))
    );
  }

  getSchedule(stopID: string | number, line: string | number): Observable<Schedule> {
    return this.http.get<Schedule>(this.route + "stopSchedule?stopID=" + stopID + "&line=" + line)
      .pipe(
        map(coerceScheduleJSON)
      );
  }
}

function coerceJSON(json: any): Stop {
  return {
    id: json.stop_id,
    stop: json.stop_name,
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
