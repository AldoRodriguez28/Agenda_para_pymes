import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JWTTokenService } from './JWTTokenService';
import { TypeAuthorization } from './TypeAuth.enum';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private API_URL = environment.API_URI;  
  private API_VERSION = 'v2/api/'
  private jwtToken: string;
  private   decodedToken: { [key: string]: string }
 public type= TypeAuthorization;
public  getValueHeaderAuthorization(typeAuth:TypeAuthorization)
{
  let value:string="";
  switch (typeAuth) {
    case this.type.Basic:
      value= window.btoa(environment.API_MINEGOCIO_USER + ':' + environment.API_MINEGOCIO_PASSWORD);
      break;
    case this.type.Bearer:
      let jwt = new JWTTokenService();
      console.log("getValueHeaderAuthorization "+ jwt.isTokenExpired());
      console.log("getExpiryTime "+ jwt.getExpiryTime());
      console.log("getEmailId "+ jwt.getEmailId());      
      if(jwt.isTokenExpired())
      {       
         this.getToken().subscribe(valueToken=>{
            jwt.setToken(valueToken);         
            value=valueToken;
         });
        
      }else
      {
        value=jwt.jwtToken;
      }   
      break;
  }
  
  return value;
}

public  getHttpHeaders(typeAut:TypeAuthorization){
  let  options = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access_Control_Allow_Origin': '*',
    'responseType': 'text' as 'json'   
    })
  };  
  switch (typeAut) {
    case this.type.Basic:
      options.headers= options.headers.append("Authorization","Basic "+this.getValueHeaderAuthorization(typeAut));
      break;
    case this.type.Bearer:     
      let token=this.getValueHeaderAuthorization(typeAut);     
      options.headers= options.headers.append("Authorization","Bearer "+token);     
        break;
    default:
      break;
  } 
  return options;
}
public  getToken(){
  let jwt_user=environment.API_MINEGOCIO_JWT_USER;
  let jwt_password=environment.API_MINEGOCIO_JWT_PASSWORD;
  let user={"UserName":jwt_user,"Password":jwt_password};
  return this.http.post<string>(`${this.API_URL+this.API_VERSION}security/createToken`,user,this.getHttpHeaders(this.type.NoAuth));
}
  constructor(private http: HttpClient) { }
}
