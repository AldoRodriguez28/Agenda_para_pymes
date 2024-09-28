import { HoursBussinesResponse } from "./HoursBussinesResponse"

export interface OpeningDayBussinesResponse {
    dayId: number,
    dayName: string,
    closedDay:boolean,
    hours:HoursBussinesResponse[]
  };