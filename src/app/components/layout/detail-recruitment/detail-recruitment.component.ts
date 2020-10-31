import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConfig } from 'src/app/config/url-config';
import { JobPostService } from 'src/app/services/job-post.service';
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
  
  constructor(
    private jobPostService: JobPostService,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.provices = this.locationService.readData()
    const jobPostId = this.route.snapshot.paramMap.get('id')
    this.jobPostService.getJobPostById(jobPostId).subscribe(
      res => {
        this.jobPost = res
        $(".culture_description").html(this.jobPost?.employerResumeDTO?.description)
        $(".job_description .description").html(this.jobPost?.jobDescription)
        $(".skills_experience .experience").html(this.jobPost?.jobRequire)
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
    let provinceObj = this.provices.find(province => province.id == addressObj.province)
    let districtObj = provinceObj.districts.find(district => district.id == addressObj.district)
    let wardObj = districtObj.wards.find(ward => ward.id == addressObj.ward)
    return addressObj?.street +", "+ wardObj.name +", "+ districtObj.name +", "+ provinceObj.name
  }

}
