import {BoroughStations} from "./boroughStations";

export interface Borough {
  borough: string;
  color: string;
  stations: BoroughStations[];
}
