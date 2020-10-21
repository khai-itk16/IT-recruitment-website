import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodeJwtService {

  constructor() { }

  getDecodedAccessToken() {
    try{
        return jwt_decode(localStorage.getItem("token"));
    }
    catch(Error){
        return null;
    }
  }
}
