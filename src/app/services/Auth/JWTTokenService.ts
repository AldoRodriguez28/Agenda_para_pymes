import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';

@Injectable()
export class JWTTokenService {

    jwtToken: string;
    decodedToken: { [key: string]: string };

    constructor() {
      if(localStorage.getItem('TokenAuth')!=null)
      {
        this.jwtToken= localStorage.getItem('TokenAuth') as string;
        
      }
  
    }

    setToken(token: string) {
      
      if (token) {
        localStorage.setItem('TokenAuth',token );
        this.jwtToken = token;
      }
    }

    decodeToken() {
      
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
     console.log(this.decodedToken);
      }
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }

    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['displayname'] : null;
    }

    getEmailId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['email'] : null;
    }

    getExpiryTime() {
      this.decodeToken();
     
      return (this.decodedToken ? this.decodedToken['exp'] : 0) as number;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
        console.log("expiryTime "+ 1000 * expiryTime);
        console.log("current  "+  (new Date()).getTime());
        const expiryDate = new Date(expiryTime*1000);
        console.log("expiryDate "+ expiryDate);
        console.log(((1000 * expiryTime) - (new Date()).getTime()) < 5000);
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}