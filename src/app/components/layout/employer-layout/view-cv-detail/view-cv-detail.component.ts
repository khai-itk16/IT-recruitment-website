import { Component, OnInit } from '@angular/core';
import { UrlConfig } from 'src/app/config/url-config';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { LocationService } from 'src/app/services/location.service';
import html2pdf from 'html2pdf.js'

declare const $: any

@Component({
  selector: 'app-view-cv-detail',
  templateUrl: './view-cv-detail.component.html',
  styleUrls: ['./view-cv-detail.component.css']
})
export class ViewCvDetailComponent implements OnInit {

  candidateApply: any
  private urlConfig = new UrlConfig()
  provice: any
  district: any
  ward: any

  constructor(
    private locationService: LocationService,
    private dataTransferService: DataTransferService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  private initData() {
    this.dataTransferService.getpreviewMessage().subscribe(
      res => {
        this.candidateApply = res
        this.setLocation()
        $("#cvo-objective-objective").html(this.candidateApply?.jobObjective)
      },
      error => {
        console.log(error)
      }
    )
  }

  isLanguageExist() {
    if(this.candidateApply?.foreignLanguage != null && this.candidateApply?.foreignLanguage != '') {
      $("#content-foreign-language").html(this.candidateApply?.foreignLanguage)
      return true
    } 
    return false
  }

  isAchievementExist() {
    if(this.candidateApply?.achievement != null && this.candidateApply?.achievement != '') {
      $("#content-achievement").html(this.candidateApply?.achievement)
      return true
    } 
    return false
  }

  getImage() {
    let avartarImage = this.candidateApply?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
    return this.urlConfig.urlImage+'/'+avartarImage.imageName
  }

  private setLocation() {
    let provices = this.locationService.readData();
    this.provice = provices.find(province => province.id == this.candidateApply?.accountDTO?.addressEntity?.province)
    this.district = this.provice?.districts.find(district => district.id == this.candidateApply?.accountDTO?.addressEntity?.district)
    this.ward = this.district?.wards.find(ward => ward.id == this.candidateApply?.accountDTO?.addressEntity?.ward)
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
