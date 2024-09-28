
import { HoursResponse } from "./HoursResponse"

export interface OpeningDayResponse {
    dayId: number,
    dayName: String,
    closedDay:boolean,
    closedDayB:boolean,
    hours:HoursResponse[]
  };