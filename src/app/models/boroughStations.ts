export interface BoroughStations {
  name: string;
  id: string;
  type: string;
  ada: string;
  // for status of " -1" & "-1", meaning that the station is inaccessible
  status?: string;
}
