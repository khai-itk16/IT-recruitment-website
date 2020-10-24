import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js'
import { UrlConfig } from 'src/app/config/url-config';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { LocationService } from 'src/app/services/location.service';

declare const $: any

@Component({
  selector: 'app-candidate-cv',
  templateUrl: './candidate-cv.component.html',
  styleUrls: ['./candidate-cv.component.css']
})
export class CandidateCvComponent implements OnInit {

  candiateResume: any = null
  imageAvatar: any
  private urlConfig = new UrlConfig()
  pathAvatar: string ="assets/images/avatar_120x160.png"
  provice: any
  district: any
  ward: any

  constructor(
    private locationService: LocationService,
    private candidateCVService: CandidateCvService,
    private decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  private async initData() {
    if (this.decodeJwtService.getDecodedAccessToken() == null) { return }

    let accountId = this.decodeJwtService.getDecodedAccessToken().id;
    await this.candidateCVService.getCandidateResume(accountId).subscribe(
      res => {
        console.log(res)
        this.candiateResume = res
        this.imageAvatar = this.candiateResume.accountDTO.imageDTOs.find(imageDTO => imageDTO.avatar)
        if(this.imageAvatar != null) {
          this.pathAvatar = this.urlConfig.urlImage + "/" + this.imageAvatar.imageName
        }
        this.setLocation()
        $("#cvo-objective-objective").html(this.candiateResume?.jobObjective)
        $("#content-foreign-language").html(this.candiateResume?.foreignLanguage)
        $("#content-achievement").html(this.candiateResume?.achievement)
      },
      error => {
        console.log(error)
      }
    )
  }

  private setLocation() {
    let provices = this.locationService.readData();
    this.provice = provices.find(province => province.id == this.candiateResume?.accountDTO?.addressEntity?.province)
    this.district = this.provice?.districts.find(district => district.id == this.candiateResume?.accountDTO?.addressEntity?.district)
    this.ward = this.district?.wards.find(ward => ward.id == this.candiateResume?.accountDTO?.addressEntity?.ward)
  }

  downloadAsPDF() {
    var element = document.getElementById('cvo-document');
    var opt = {
      margin: [8, 0, 8, 4],
      filename: 'myCV.pdf',
      image: { type: 'jpg', quality: 0.98 },
      html2canvas: { scale: 3, y: 0,  scrollY: 0, useCORS: true},
      jsPDF: { format: 'A4' },
    };
    html2pdf().from(element).set(opt).save();
  }
}
