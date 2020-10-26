import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getEmployerById(accountId) {
    return this.http.get<any>(this.urlConfig.urlEmployer+ `/${ accountId }`)
  }

  updateEmployer(employer) {
    return this.http.put<any>(this.urlConfig.urlEmployer, employer)
  }
}
