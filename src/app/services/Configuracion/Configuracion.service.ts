import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { HorarioAtencion } from 'src/app/models/HorarioAtencion';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../Auth/auth.service';
import { TypeAuthorization } from '../Auth/TypeAuth.enum';
import { HoursBussinesRequest } from 'src/app/models/HoursBussinesRequest';


@Injectable({
  providedIn: 'root'
})
export class  ServiceConfiguracion {
  private  type= TypeAuthorization;  
  API_URL = environment.API_URI; 
 API_VERSION = 'v2/api/'
 //API_VERSION = 'api/'
  VALUE_BcProductId = ''
  options = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access_Control_Allow_Origin': '*',
    'responseType': 'text' as 'json'
  
    })
  }
  constructor(private http: HttpClient, private authService:AuthService) { 
    this.options=this.authService.getHttpHeaders(this.type.Basic)
  }
  
  ObtenerHorariosConfiguracion(bcProduct: string):Observable<any> {    
    return this.http.get<HorarioAtencion[]>(`${this.API_URL+this.API_VERSION}Calendar/Bussines/Opening/Horus/${bcProduct}`,this.options);
  }
  ObtenerHorariosDetalleConfiguracion(bcProduct: string,calendarId: number):Observable<any> {    
    return this.http.get<HorarioAtencion[]>(`${this.API_URL+this.API_VERSION}Calendar/Bussines/Opening/Horus/${bcProduct}/${calendarId}`,this.options);
  }
  ObtenerCalndariosPorBcProduct(bcProduct: string):Observable<any> {    
    return this.http.get<HorarioAtencion[]>(`${this.API_URL+this.API_VERSION}Calendar/?bcProduct=${bcProduct}`,this.options);
  }

  agregarModificarEliminarHorariosNegocio(BussinesRecords:HoursBussinesRequest[]):Observable<HoursBussinesRequest[]> {    
    return this.http.post<any>(`${this.API_URL+this.API_VERSION}Calendar/Add/Business/Record`,BussinesRecords,this.options);
  }
}