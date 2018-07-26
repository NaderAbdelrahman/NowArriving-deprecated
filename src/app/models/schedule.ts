import { Arrival } from "./arrival";

export interface Schedule {
  stopId: string;
  arrivalsNorth: Arrival[];
  arrivalsSouth: Arrival[];
  updatedOn: number;
}
