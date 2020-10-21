import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class CandidateCvService {

  urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getCandidateResume(id) {
    return this.http.get<any>(this.urlConfig.urlCandidateResume + id)
  }

  updateCandidateSelfInfor (candidateResume) {
    return this.http.put<any>(this.urlConfig.urlCandidateReusmeSelfInfor, candidateResume)
  }

  updateCandidateResume (candidateResume) {
    return this.http.put<any>(this.urlConfig.urlUpdateCandidateReusme, candidateResume)
  }
}
