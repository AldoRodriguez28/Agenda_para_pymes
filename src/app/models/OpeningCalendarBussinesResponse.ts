import { OpeningDayBussinesResponse } from "./OpeningDayBussinesResponse";

export interface OpeningCalendarBussinesResponse {
    calendarId: number,
    resource: string,
    bcProductId:number,
    calendarTypeId:number,
    timeAppointment:string,
    isDeleted:boolean,
    isActive:boolean,
    openingDays:OpeningDayBussinesResponse[]
  };