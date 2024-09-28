import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { RecursoModel } from 'src/app/models/recursoModel';
import { Observable } from 'rxjs/internal/Observable';
import { OpeningCalendarResponse } from 'src/app/models/OpeningCalendarResponse';
import { TypeAuthorization } from '../Auth/TypeAuth.enum';
import { AuthService } from '../Auth/auth.service';
import {CitaModel} from "../../models/citaModel";
import {StatusApoiment} from "../../models/StatusApoiment";
import { AddContactModel } from 'src/app/models/ContactModel';
import { AppoimentCalendar } from 'src/app/models/AppoimentCalendarModel';
import { AppointmentUpdate } from 'src/app/models/AppoinmentUpdate';

@Injectable({
    providedIn: 'root'
})
  export class  ServiceCalendario {
    private  type= TypeAuthorization; 
    API_URL = environment.API_URI;
    API_VERSION = 'v2/api/';  
    //API_VERSION = 'api/';   
    VALUE_BcProductId = '';  
  
    options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access_Control_Allow_Origin': '*',
      'responseType': 'text' as 'json'
      
      })
    }
    constructor(private http: HttpClient,private authService:AuthService) {
      this.options=this.authService.getHttpHeaders(this.type.Basic)
     }
  
    getListCalendar(bcProductId: string):Observable<any> {    
     return this.http.get<RecursoModel []>(`${this.API_URL+this.API_VERSION}Calendar?bcProduct=${bcProductId}`,this.options);
    }
    delCalendar(CalendarId: Number):Observable<any> {    
        return this.http.delete<any>(`${this.API_URL+this.API_VERSION}Calendar/${CalendarId}`,this.options);
       }
    insUpdCalendar(calendar: OpeningCalendarResponse):Observable<any> { 
        return this.http.post<any>(`${this.API_URL+this.API_VERSION}Calendar/add`,calendar,this.options);
    }

    getAppointmentByDaySelected(advertiser:string,bcProductId:any, fecha:string, fechafin?:string):Observable<any>{
      let finalDate = (fechafin)? fechafin:fecha
      let url = this.http.get<CitaModel []>(`${this.API_URL+this.API_VERSION}Appointment/Advertiser/${advertiser}/bcProductId/${bcProductId}/InitialDate/${fecha}/FinalDate/${finalDate}`,this.options);
      return url
      //servicio  https://minegocio.d.seccionamarilla.com.mx/v2/api/Appointment/Advertiser/112687846/InitialDate/2023-03-13/FinalDate/2023-03-15
      //jorge     https://minegocio.d.seccionamarilla.com.mx/v2/api/Appointment/Advertiser/112687846/InitialDate/2022-01-01/FinalDate/2023-03-15
    }

    getAppointmentByCalendarId(calendarId:string, fecha:string, fechafin?:string):Observable<any>{
      let finalDate = (fechafin)? fechafin:fecha
      return this.http.get<AppoimentCalendar[]>(`${this.API_URL+this.API_VERSION}Appointment/CalendarId/${calendarId}/InitialDate/${fecha}/FinalDate/${finalDate}`,this.options);
    }

    updateStatusAppoiment(status: StatusApoiment):Observable<any>{
      return this.http.put<CitaModel>(`${this.API_URL+this.API_VERSION}Scheduler/UpdAppointmentStatus/`,status,this.options);
    }

    InsertAppointment(contactoSchedule: AddContactModel):Observable<any>{
      return this.http.post<any>(`${this.API_URL+this.API_VERSION}Scheduler/InsertAppointmentBySchedulerCalendar`,contactoSchedule,this.options);
    }
    getHoursAvailableByDate(bcProductId:string,dateCalendar:string,typeCalendar: number,calendarId: number ):Observable<any> {      
      return this.http.get<any>(`${this.API_URL+this.API_VERSION}scheduler/gethoursavailablebydate?bcProduct=${bcProductId}&dateCalendar=${dateCalendar}&typeCalendar=${typeCalendar}&calendarId=${calendarId}`,this.options);
    }
    getAppointmentByAppointmentId(AppointmentId:string):Observable<any>{
      return this.http.get<AppoimentCalendar[]>(`${this.API_URL+this.API_VERSION}Appointment/GetAppointment/${AppointmentId}`,this.options);
    }
    putAppointmentByAppointment(AppoinmentObj:AppointmentUpdate ):Observable<any>{      
      return this.http.put<AppoimentCalendar[]>(`${this.API_URL+this.API_VERSION}Appointment/`,AppoinmentObj,this.options);
    }
    getAppointmentHours(bcProductId:string, fechaInicio:string, fechaFin:string):Observable<any>{      
      return this.http.get<any[]>(`${this.API_URL+this.API_VERSION}Appointment/GetAppointmentHours/bcProductId/${bcProductId}/InitialDate/${fechaInicio}/FinalDate/${fechaFin}`,this.options);
    }
  }