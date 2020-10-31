import { Component, OnInit } from '@angular/core';
import { UrlConfig } from 'src/app/config/url-config';
import { JobPostService } from 'src/app/services/job-post.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-candidate-job-save',
  templateUrl: './candidate-job-save.component.html',
  styleUrls: ['./candidate-job-save.component.css']
})
export class CandidateJobSaveComponent implements OnInit {

  jobPosts: any = null
  urlConfig = new UrlConfig()
  private provices: any

  constructor(
    private jobPostService: JobPostService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.provices = this.locationService.readData()
    this.jobPostService.getAllJobPostsByStatus(2).subscribe(
      res => {
        this.jobPosts = res
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
}
