import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlConfig } from 'src/app/config/url-config';
import { AuthService } from 'src/app/services/auth.service';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobApplyService } from 'src/app/services/job-apply.service';
import { JobPostService } from 'src/app/services/job-post.service';
import { JobSaveService } from 'src/app/services/job-save.service';
import { LocationService } from 'src/app/services/location.service';

declare const $: any

@Component({
  selector: 'app-detail-recruitment',
  templateUrl: './detail-recruitment.component.html',
  styleUrls: ['./detail-recruitment.component.css']
})
export class DetailRecruitmentComponent implements OnInit {

  jobPost: any
  provices: any
  urlConfig = new UrlConfig()
  jobPostId: any
  accountId: any
  isSave: any
  isApply: any = false
  
  constructor(
    private candidateCvService: CandidateCvService,
    private jobPostService: JobPostService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    public authService: AuthService,
    private jobApplyService: JobApplyService,
    private jobSaveService: JobSaveService,
    private decodeJwtService: DecodeJwtService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.provices = this.locationService.readData()
    this.accountId = this.decodeJwtService?.getDecodedAccessToken()?.id
    this.jobPostId = this.route.snapshot.paramMap.get('id')
    this.jobPostService.getJobPostById(this.jobPostId).subscribe(
      res => {
        this.jobPost = res
        $(".culture_description").html(this.jobPost?.employerResumeDTO?.description)
        $(".job_description .description").html(this.jobPost?.jobDescription)
        $(".skills_experience .experience").html(this.jobPost?.jobRequire)
        this.checkIsApply()
        this.checkIsSave()
      },
      error => {
        console.log(error)
      }
    )
  }

  getImage() {
    let logoImage = this.jobPost?.employerResumeDTO?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
    return this.urlConfig.urlImage+'/'+logoImage?.imageName
  }

  getAddress() {
    let addressObj = this.jobPost?.employerResumeDTO?.accountDTO?.addressEntity
    let provinceObj = this.provices?.find(province => province?.id == addressObj?.province)
    let districtObj = provinceObj?.districts?.find(district => district?.id == addressObj?.district)
    let wardObj = districtObj?.wards?.find(ward => ward?.id == addressObj?.ward)
    return addressObj?.street +", "+ wardObj?.name +", "+ districtObj?.name +", "+ provinceObj?.name
  }

  checkIsSave() {
    this.jobSaveService.checkIsSave(this.accountId, this.jobPost?.jobPostId).subscribe(
      res => { 
        this.isSave = res
      },
      error => { console.log(error) }
    )
  }

  saveJob() {
    if(this.isSave) { return }
    let jobSave = {
      candidateDTO: {
        accountDTO: null,
        accountId: this.accountId,
        educationDTOs: null,
        experienceDTOs: null,
        skillDTOs: null
      },
      jobPostDTO: {
        employerResumeDTO: null,
        jobPostId: this.jobPostId
      },
      jobSaveId: 0
    }
    this.jobSaveService.addJobSave(jobSave).subscribe(
      res => {
        this.isSave = true
        console.log(res)
      },
      error => { console.log(error) }
    )
  }

  deleteJobSave() {
    if(!this.isSave) { return }
    this.jobSaveService.deleteJobSaveByAccountAndJobPost(this.accountId, this.jobPostId).subscribe(
      res => {
        this.isSave = false
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  checkIsApply() {
    this.jobApplyService.checkIsApply(this.accountId, this.jobPost?.jobPostId).subscribe(
      res => { 
        this.isApply = res
      },
      error => { console.log(error) }
    )
  }

  async addjobApply() {
    let isCompleteFieldMandatory = true
    await this.candidateCvService.getCandidateResume(this.accountId).toPromise().then(
      res => {
        let avatar = res?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
        if(avatar == null) { isCompleteFieldMandatory = false }

        if(res?.candidateName == null) { isCompleteFieldMandatory = false }

        if(res?.jobObjective == null && res?.jobObjective == "") { isCompleteFieldMandatory = false }

        if(res.jobPositionEntity == null) { isCompleteFieldMandatory = false }

        if(res?.experienceDTOs.length  == 0) { isCompleteFieldMandatory = false }

        if(res?.educationDTOs.length  == 0) { isCompleteFieldMandatory = false }

        if(res?.skillDTOs.length  == 0) { isCompleteFieldMandatory = false }
        
      }).catch(error => {
        console.log(error)
      })

    if(!isCompleteFieldMandatory) {
      this.toastrService.error("Bạn phải hoàn thành thông tin CV mới được phép ứng tuyển", "ERROR", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
      return
    }
    let jobApply = {
      candidateDTO: {
        accountDTO: null,
        accountId: this.accountId,
        educationDTOs: null,
        experienceDTOs: null,
        skillDTOs: null
      },
      jobApplyId: 0,
      jobPostDTO: {
        employerResumeDTO: null,
        jobPostId: this.jobPostId
      },
      matchPercent: 0,
      statusEntity: {
        statusId: 5
      }
    }

    this.jobApplyService.addJobApply(jobApply).subscribe(
      res => { 
        this.isApply = true
        this.toastrService.success("Hồ sơ của bạn đã được gửi đển nhà tuyển dụng", "SUCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      },
      error => { 
        this.toastrService.error("Có lỗi trong khi gửi hồ sơ", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
        console.log(error) 
      }
    )
  }

}
