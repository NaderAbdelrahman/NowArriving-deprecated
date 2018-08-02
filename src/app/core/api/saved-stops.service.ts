import { Injectable } from "@angular/core";

// SAVES STOPS TO LOCAL STORAGE ON CLIENT SIDE

interface SavedStop {
  id: string | number;
  line: string | number;
}

const SAVED_STOPS_KEY = "[NOW ARRIVING] Saved Stop";

@Injectable()
export class SavedStopsService {

  setStops(stops: SavedStop[]): void {
    localStorage.clear();
    localStorage.setItem(SAVED_STOPS_KEY, JSON.stringify(stops));
  }

  getStops(): SavedStop[] {
    const rawStops = localStorage.getItem(SAVED_STOPS_KEY);
    return rawStops != null ? JSON.parse(rawStops) : [];
  }

}
