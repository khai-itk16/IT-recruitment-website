import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  addSkill(skill) {
    return this.http.post<any>(this.urlConfig.urlSkill, skill)
  }

  editSkill(skill) {
    return this.http.put<any>(this.urlConfig.urlSkill, skill)
  }

  deleteSkill(skillId) {
    return this.http.delete<any>(this.urlConfig.urlSkill+ "/" + skillId)
  }
}
