import { DatePipe } from "@angular/common";

export interface CitaModel {
    appointmentId: number
    calendarId: number
    contactId: number
    initialDate: string
    finalDate: string
    appointSchedType: any
    observations: string
    statusCodeId: string
    statusCode: string
    calendarTypeId: number
    calendarType: string
    resource: string
  };