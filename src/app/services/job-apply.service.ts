import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../config/url-config';

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {

  private urlConfig = new UrlConfig()

  constructor(private http: HttpClient) { }

  getAllCandidateByJobPostIdAndStatusId(jobPostId, statusId) {
    return this.http.get<any>(`${ this.urlConfig.host }/api/candidate/${ jobPostId }/job-apply`, { params: { statusId } })
  }

  getAllJobPostByCandidateIdAndStatusId(accountId, statusId) {
    return this.http.get<any>(`${ this.urlConfig.host }/api/candidate/${ accountId }/job-apply`, { params: { statusId } })
  }

  checkIsApply(accountId, jobPostId) {
    return this.http.get<any>(`${ this.urlConfig.host }/api/job-apply`, { params: { accountId, jobPostId } })
  }

  addJobApply(jobApply) {
    return this.http.post<any>(`${ this.urlConfig.host }/api/job-apply`, jobApply)
  }

  getAllCandidateAppliesByStatus(jobPostId, statusId) {
    return this.http.get<any>(`${ this.urlConfig.host }/api/job-post/${jobPostId}/job-apply`, { params: { statusId } })
  }

  filterResume(jobPostId) {
    return this.http.get<any>(`${ this.urlConfig.host }/api/job-post/${jobPostId}/job-apply/filter`)
  }

  changeStatusJobApply(jobApplyId, statusId) {
    return this.http.put<any>(`${ this.urlConfig.host }/api/job-apply/${ jobApplyId }/change-status`, null, { params: { statusId } })
  }

  deleteJobApply(jobApplyId) {
    return this.http.delete<any>(`${ this.urlConfig.host }/api/job-apply/${jobApplyId}`)
  }
}
