import { Schedule } from "./schedule";
import { Stop } from "./stop";

export interface StopWithSchedule extends Schedule {
  stop: Stop;
  line: string | number;
}
