import { Arrival } from "./arrival";

export interface Schedule {
  schedule: {
    [key: string]: {
      N: Arrival[];
      S: Arrival[];
    }
  };
  updatedOn: number;
}
