import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  addEducation(education) {
    return this.http.post<any>(this.urlConfig.urlEducation, education)
  }

  deleteEducation(educationId) {
    return this.http.delete<any>(this.urlConfig.urlEducation+ "/" + educationId)
  }
}
