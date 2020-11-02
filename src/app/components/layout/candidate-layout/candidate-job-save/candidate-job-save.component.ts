import { Component, OnInit } from '@angular/core';
import { UrlConfig } from 'src/app/config/url-config';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobPostService } from 'src/app/services/job-post.service';
import { JobSaveService } from 'src/app/services/job-save.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-candidate-job-save',
  templateUrl: './candidate-job-save.component.html',
  styleUrls: ['./candidate-job-save.component.css']
})
export class CandidateJobSaveComponent implements OnInit {

  jobSaves: any = null
  urlConfig = new UrlConfig()
  private provices: any

  constructor(
    private jobSaveService: JobSaveService,
    private locationService: LocationService,
    private decodeJwtService: DecodeJwtService,
  ) { }

  ngOnInit(): void {
    this.provices = this.locationService.readData()
    let accountId = this.decodeJwtService?.getDecodedAccessToken()?.id
    this.jobSaveService.getAllJobSave(accountId).subscribe(
      res => {
        this.jobSaves = res
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  getImage(jobPost) {
    let logoImage = jobPost.employerResumeDTO.accountDTO.imageDTOs.find(imageDTO => imageDTO.avatar)
    return this.urlConfig.urlImage+'/'+logoImage.imageName
  }

  getProvice(jobPost) {
    let proviceId = jobPost?.employerResumeDTO?.accountDTO?.addressEntity?.province
    return this.provices.find(provice => provice.id === proviceId)?.name
  }

  deleteJobSave(jobSaveId) {
    let index = this.jobSaves?.findIndex(jobSave => jobSave?.jobSaveId == jobSaveId)
    this.jobSaveService.deleteJobSave(jobSaveId).subscribe(
      res => {
        console.log(res)
        this.jobSaves.splice(index, 1)
      },
      error => {
        console.log(error)
      }
    )
  }
}
