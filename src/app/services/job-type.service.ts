import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getAllJobTypes() {
    return this.http.get<any>(this.urlConfig.urlJobType)
  }
}
