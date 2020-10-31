import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CandidateCvService } from '../services/candidate-cv.service';
import { DecodeJwtService } from '../services/decode-jwt.service';
import { EmployerService } from '../services/employer.service';

@Injectable({
  providedIn: 'root'
})
export class CompleteInfoGuard implements CanActivate {

  constructor(
    private decodeJwtService: DecodeJwtService,
    private toastrService: ToastrService,
    private candidateService: CandidateCvService,
    private employerService: EmployerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkCondition()
  }

  async checkCondition() {
    const decodeToken = this.decodeJwtService.getDecodedAccessToken()
    let isSuccess = true
    if (decodeToken.roles == 'ROLE_CANDIDATE') {
      await this.candidateService.getCandidateResume(decodeToken.id).toPromise().then(
        res => {
          let isCompleteFieldMandatory = true
          let avatar = res?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
          if(avatar == null) { isCompleteFieldMandatory = false }

          if(res?.candidateName == null) { isCompleteFieldMandatory = false }
  
          if(res?.jobObjective == null && res?.jobObjective == "") { isCompleteFieldMandatory = false }
  
          if(res.jobPositionEntity == null) { isCompleteFieldMandatory = false }
  
          if(res?.experienceDTOs.length  == 0) { isCompleteFieldMandatory = false }
  
          if(res?.educationDTOs.length  == 0) { isCompleteFieldMandatory = false }
  
          if(res?.skillDTOs.length  == 0) { isCompleteFieldMandatory = false }

          if(!isCompleteFieldMandatory) {
            this.toastrService.error("Bạn phải hoàn thành thông tin CV mới được phép dùng chức năng này", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
            isSuccess = false;
          }
        }
      ).catch(error => {
        console.log(error)
        isSuccess = false
      })
    }

    if (decodeToken.roles == 'ROLE_EMPLOYER') {
      await this.employerService.getEmployerById(decodeToken.id).toPromise().then(
        res => {
          let isCompleteFieldMandatory = true
          let logo = res?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
          let banner = res?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.banner)
          if(logo == null) { isCompleteFieldMandatory = false }
          
          if(banner == null) { isCompleteFieldMandatory = false }

          if(res?.employerName == null) { isCompleteFieldMandatory = false }
  
          if(res?.numMember == null && res?.numMember == "") { isCompleteFieldMandatory = false }
          
          if(res?.workTime == null && res?.workTime == "") { isCompleteFieldMandatory = false }
          
          if(res?.description == null && res?.description == "") { isCompleteFieldMandatory = false }
        
          if(!isCompleteFieldMandatory) {
            this.toastrService.error("Bạn phải hoàn thành thông tin về công ty, tổ chức mới được phép dùng chức năng này", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
            isSuccess = false;
          }
      }).catch(error => {
        console.log(error)
        isSuccess = false
      })
    }
    return isSuccess;
  }
}
