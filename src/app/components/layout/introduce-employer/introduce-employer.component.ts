import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConfig } from 'src/app/config/url-config';
import { EmployerService } from 'src/app/services/employer.service';
import { LocationService } from 'src/app/services/location.service';

declare const $: any

@Component({
  selector: 'app-introduce-employer',
  templateUrl: './introduce-employer.component.html',
  styleUrls: ['./introduce-employer.component.css']
})
export class IntroduceEmployerComponent implements OnInit {
  employerResume: any
  urlConfig = new UrlConfig()

  constructor(
    private locationService: LocationService,
    private employerService: EmployerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  private initData() {
    const accountId = this.route.snapshot.paramMap.get("id")
    this.employerService.getEmployerById(accountId).subscribe(
      res => {
        this.employerResume = res
        $("#overview").html(this.employerResume?.overview)
        $("#work-reason").html(this.employerResume?.description)
      },
      error => {
        console.log(error)
      }
    )
  }

  getAddress() {
    let addressObj = this.employerResume?.accountDTO?.addressEntity
    let provices = this.locationService.readData();
    let proviceObj = provices.find(province => province.id == addressObj?.province)
    let districtObj = proviceObj?.districts.find(district => district.id == addressObj?.district)
    let wardObj = districtObj?.wards.find(ward => ward.id == addressObj?.ward)
    return addressObj.street +", "+ wardObj.name +", "+ districtObj.name +", "+ proviceObj.name
  }

  getImage(imageType) {
    if(imageType == "logo") {
      let logoImage = this.employerResume.accountDTO.imageDTOs.find(imageDTO => imageDTO.avatar)
      return this.urlConfig.urlImage+'/'+logoImage.imageName
    }
    
    if(imageType == "banner") {
      let bannerImage = this.employerResume.accountDTO.imageDTOs.find(imageDTO => imageDTO.banner)
      return this.urlConfig.urlImage+'/'+bannerImage.imageName
    }

  }
}
