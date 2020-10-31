import { Component, OnInit } from '@angular/core';
import { UrlConfig } from 'src/app/config/url-config';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';

declare const $: any

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  candiateResume: any = null
  levelComplete: number = 0
  isCompleteFieldMandatory: boolean = true
  imageAvatar: any
  private urlConfig = new UrlConfig()
  pathAvatar: String ="assets/images/avatar_120x160.png"

  constructor(
    private candidateCVService: CandidateCvService,
    private decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  private async initData() {
    if (this.decodeJwtService.getDecodedAccessToken() == null) {
      return
    }

    let accountId = this.decodeJwtService.getDecodedAccessToken().id;
    await this.candidateCVService.getCandidateResume(accountId).subscribe(
      res => {
        this.candiateResume = res
        this.imageAvatar = this.candiateResume.accountDTO.imageDTOs.find(imageDTO => imageDTO.avatar)
        if(this.imageAvatar != null) {
          this.pathAvatar = this.urlConfig.urlImage + "/" + this.imageAvatar.imageName
          this.levelComplete++
        }
        if(this.candiateResume?.candidateName != null) { this.levelComplete++ }
        else { this.isCompleteFieldMandatory = false }

        if(this.candiateResume?.jobObjective != null &&
          this.candiateResume?.jobObjective != "") { this.levelComplete++ }
        else { this.isCompleteFieldMandatory = false }

        if(this.candiateResume?.jobPositionEntity != null) { this.levelComplete++ }
        else { this.isCompleteFieldMandatory = false }

        if(this.candiateResume?.experienceDTOs.length  != 0) { this.levelComplete++ }
        else { this.isCompleteFieldMandatory = false }

        if(this.candiateResume?.educationDTOs.length  != 0) { this.levelComplete++ }
        else { this.isCompleteFieldMandatory = false }

        if(this.candiateResume?.skillDTOs.length  != 0) { this.levelComplete++ }
        else { this.isCompleteFieldMandatory = false }

        if(this.candiateResume?.achievement != null &&
          this.candiateResume?.achievement != "") { this.levelComplete++ }
          
        if(this.candiateResume?.foreignLanguage != null &&
          this.candiateResume?.foreignLanguage != "") { this.levelComplete++ }

        for(let i = 1; i <= this.levelComplete; i++) {
          $(`#level-${ i }`).addClass("active")
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
