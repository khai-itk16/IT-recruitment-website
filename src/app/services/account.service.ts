import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getAccount(id) {
    return this.http.get<any>(this.urlConfig.urlAccount + id)
  }
}
