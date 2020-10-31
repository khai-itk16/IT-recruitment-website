import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  *  as  data  from  'src/assets/local.json';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  
  readData() {
    return (data  as  any).default;
  }
}
