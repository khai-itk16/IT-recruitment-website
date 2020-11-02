import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class JobSaveService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getAllJobSave(accountId) {
    return this.http.get<any>(this.urlConfig.urlJobSave, { params: { accountId }})
  }

  addJobSave(jobSave) {
    return this.http.post<any>(this.urlConfig.urlJobSave, jobSave)
  }

  deleteJobSave(jobSaveId) {
    return this.http.delete<any>(this.urlConfig.urlJobSave +"/"+ jobSaveId)
  }
}
