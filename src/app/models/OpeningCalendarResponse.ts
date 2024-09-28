
import { OpeningDayResponse } from "./OpeningDayResponse"

export interface OpeningCalendarResponse {
    calendarId: number,
    resource: string,
    bcProductId:number,
    calendarTypeId:number,
    timeAppointment:string,
    isDeleted:boolean,
    isActive:boolean,
    openingDays:OpeningDayResponse[]
  };