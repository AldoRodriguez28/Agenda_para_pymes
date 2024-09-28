import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ContactModel, PaginacionContactsModel} from 'src/app/models/ContactModel';
import { BcProductModel } from 'src/app/models/BcProductModel';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../Auth/auth.service';
import { TypeAuthorization } from '../Auth/TypeAuth.enum';
import {InteraccionesContacto} from "../../models/InteraccionesContacto";

@Injectable({
  providedIn: 'root'
})
export class  ServiceContact {

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

  addContact( contacto: any):Observable<any>{
      const body=JSON.stringify(contacto);
      return this.http.post(`${this.API_URL+this.API_VERSION+'Contact'}`, contacto,this.options)
    }

  getListBcProduct(id?: string):Observable<any>{
    return this.http.get<BcProductModel>(`${this.API_URL+this.API_VERSION}advertiser?idAdvertiser=${id}`,this.options);
  }
  getListContacts(Advertiser:number,BCproductId: string, RegisterByPage: number, page: number, search?: string):Observable<any> {


    let queryParams = '?';
    if (search){
      queryParams+='search='+ search;
    }
    return this.http.get<PaginacionContactsModel>(
        `${this.API_URL+this.API_VERSION}Contact/Advertiser/${Advertiser}/BcProductId/${BCproductId}/RegisterByPage/${RegisterByPage}/page/${page}${queryParams}`,
        this.options);

  }
  getListContactsAll(Advertiser:number,BCproductId: string):Observable<any> {
    return this.http.get<PaginacionContactsModel>(`${this.API_URL+this.API_VERSION}Contact/Advertiser/${Advertiser}/`+
                                            `BcProductId/${BCproductId}`,this.options);
  }
  getDetailContact(id?: string):Observable<any>{
    return this.http.get<ContactModel>(`${this.API_URL+this.API_VERSION}Contact/Advertiser/0/BcProductId/${this.VALUE_BcProductId}/ContactId/${id}`,this.options);
  }
  putContact(contacto: ContactModel){
    return this.http.put<ContactModel>(`${this.API_URL+this.API_VERSION}Contact/`,contacto,this.options);
  }
  deleteContact(id?: string):Observable<any>{
    return this.http.delete(`${this.API_URL+this.API_VERSION}Contact/${id}`,this.options);
  }
  //getListResources(BCproductId: string):Observable<any> {    
  // return this.http.get<ContactModel []>(`${this.API_URL+this.API_VERSION}Resource/${BCproductId}`,this.options);
  //}

  getInteractionByIdContact(idContact:number, bcproduct:string):Observable<any> {
    return this.http.get<InteraccionesContacto []>(`${this.API_URL+this.API_VERSION}Interaction/Contact/${idContact}/BcProduct/${bcproduct}`,this.options);
  }
}