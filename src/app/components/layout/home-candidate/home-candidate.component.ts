import { Component, OnInit } from '@angular/core';
import { JobPostService } from 'src/app/services/job-post.service';
import { UrlConfig } from 'src/app/config/url-config'
import { LocationService } from 'src/app/services/location.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobSaveService } from 'src/app/services/job-save.service';
import { JobApplyService } from 'src/app/services/job-apply.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-home-candidate',
  templateUrl: './home-candidate.component.html',
  styleUrls: ['./home-candidate.component.css']
})
export class HomeCandidateComponent implements OnInit {
  
  jobPosts: any = null
  jobSaves: any = null
  urlConfig = new UrlConfig()
  isSearch: any
  isDataEmpty = false
  private provices: any

  constructor(
    private jobPostService: JobPostService,
    private locationService: LocationService,
    private decodeJwtService: DecodeJwtService,
    private jobSaveService: JobSaveService,
    private jobApplyService: JobApplyService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService
  ) {  }

  ngOnInit(): void {
    this.provices = this.locationService.readData()
    this.isSearch = this.route.snapshot.queryParamMap.get('search');
    if(this.isSearch == null) {
      this.getJobPost()
    } else {
      this.dataTransferService.getpreviewMessage().subscribe(
        res => { this.jobPosts = res },
        error => { console.log(error) }
      )
    }
    this.getJobSave()
  }

  getImage(jobPost) {
    let logoImage = jobPost?.employerResumeDTO?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
    return this.urlConfig.urlImage+'/'+logoImage.imageName
  }

  getProvice(jobPost) {
    let proviceId = jobPost?.employerResumeDTO?.accountDTO?.addressEntity?.province
    return this.provices.find(provice => provice.id === proviceId)?.name
  }

  private getJobPost() {
    this.isSearch == null
    this.jobPostService.getAllJobPostsByStatus(2).subscribe(
      res => {
        this.jobPosts = res
      },
      error => {
        console.log(error)
      }
    )
  }

  getSatusJobSave(jobPostId) {
    let index = this.jobSaves?.findIndex(jobSave => jobSave?.jobPostDTO?.jobPostId == jobPostId)
    if (index == -1 || index == null || index == undefined) { return false }
    return true
  }

  private getJobSave() {
    let accountId = this.decodeJwtService?.getDecodedAccessToken()?.id
    this.jobSaves = null
    if(accountId == null) { return }
    this.jobSaveService.getAllJobSave(accountId).subscribe(
      res => { 
        this.jobSaves = res
      },
      error => { console.log(error) }
    )
  }

  saveJob(jobPostId) {
    let accountId = this.decodeJwtService?.getDecodedAccessToken()?.id
    if(accountId == null) { return }
    let jobSave = {
      candidateDTO: {
        accountDTO: null,
        accountId: accountId,
        educationDTOs: null,
        experienceDTOs: null,
        skillDTOs: null
      },
      jobPostDTO: {
        employerResumeDTO: null,
        jobPostId: jobPostId
      },
      jobSaveId: 0
    }
    this.jobSaveService.addJobSave(jobSave).subscribe(
      res => {
        this.getJobSave()
      },
      error => { console.log(error) }
    )
  }

  deleteJobSave(jobPostId) {
    let index = this.jobSaves?.findIndex(jobSave => jobSave?.jobPostDTO?.jobPostId == jobPostId)
    this.jobSaveService.deleteJobSave(this.jobSaves[index].jobSaveId).subscribe(
      res => {
        this.jobSaves.splice(index, 1)
      },
      error => {
        console.log(error)
      }
    )
  }
}
