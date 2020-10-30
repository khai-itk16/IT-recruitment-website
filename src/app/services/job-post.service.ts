import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';
import { DecodeJwtService } from './decode-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  private urlConfig = new UrlConfig()

  constructor(
    private http: HttpClient,
    private decodeJwtService: DecodeJwtService
    ) { }

  addJobPost(jobPost) {
    return this.http.post<any>(this.urlConfig.urlJobPost, jobPost)
  }

  getAllJobPostsByStatus(statusId) {
    let accountId = this.decodeJwtService.getDecodedAccessToken().id
    return this.http.get<any>(this.urlConfig.urlJobPost, {
      params: { accountId: accountId, statusJobPostId: statusId }
    })
  }

  getJobPostById(jobPostId) {
    return this.http.get<any>(this.urlConfig.urlJobPost + "/" + jobPostId)
  }

  deleteJobPost(jobPostId) {
    return this.http.delete<any>(this.urlConfig.urlJobPost + "/" + jobPostId)
  }
}
