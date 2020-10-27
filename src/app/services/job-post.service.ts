import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  addJobPost(jobPost) {
    return this.http.post<any>(this.urlConfig.urlJobPost, jobPost)
  }
}
