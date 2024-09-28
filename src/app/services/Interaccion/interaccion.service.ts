import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ContactModel, PaginacionContactsModel} from 'src/app/models/ContactModel';
import { BcProductModel } from 'src/app/models/BcProductModel';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../Auth/auth.service';
import { TypeAuthorization } from '../Auth/TypeAuth.enum';
import {InteraccionesContacto} from "../../models/InteraccionesContacto";
import { DetailInteractionModel } from 'src/app/models/DetailInteractionModel';

@Injectable({
  providedIn: 'root'
})

export class  ServiceInteraction {
    API_URL = environment.API_URI;
   API_VERSION = 'v2/api/'
    //API_VERSION = 'api/'
     private  type= TypeAuthorization;  
     VALUE_BcProductId = '';
     options = {
       headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Access_Control_Allow_Origin': '*',
       'responseType': 'text' as 'json'    
       })
     }; 
   
     constructor(private http: HttpClient, private authService:AuthService) {
       this.options=this.authService.getHttpHeaders(this.type.Basic)
      }

      getDetailInteractionById(id:string){
        return this.http.get<any>(`${this.API_URL+this.API_VERSION}Interaction/Details/${id}`,this.options);

      }

}
