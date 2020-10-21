import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  addExperience(experience) {
    return this.http.post<any>(this.urlConfig.urlExperience, experience)
  }

  editExperience(experience) {
    return this.http.put<any>(this.urlConfig.urlExperience, experience)
  }

  deleteExperience(experienceId) {
    return this.http.delete<any>(this.urlConfig.urlExperience+ "/" + experienceId)
  }
}
