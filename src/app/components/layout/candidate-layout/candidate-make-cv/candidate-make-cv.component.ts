import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { LocationService } from 'src/app/services/location.service';
import { SkillService } from 'src/app/services/skill.service';
import { ModalAchievementComponent } from '../modal-achievement/modal-achievement.component';
import { ModalEducationComponent } from '../modal-education/modal-education.component';
import { ModalExpectJobComponent } from '../modal-expect-job/modal-expect-job.component';
import { ModalExperienceComponent } from '../modal-experience/modal-experience.component';
import { ModalForeignLangugeComponent } from '../modal-foreign-languge/modal-foreign-languge.component';
import { ModalGoalComponent } from '../modal-goal/modal-goal.component';
import { ModalReferencesComponent } from '../modal-references/modal-references.component';
import { ModalSelfInforComponent } from '../modal-self-infor/modal-self-infor.component';
import { ModalSkillComponent } from '../modal-skill/modal-skill.component';

import Swal from 'sweetalert2'
import { ImageService } from 'src/app/services/image.service';
import { UrlConfig } from 'src/app/config/url-config';

declare const $: any

@Component({
  selector: 'app-candidate-make-cv',
  templateUrl: './candidate-make-cv.component.html',
  styleUrls: ['./candidate-make-cv.component.css']
})
export class CandidateMakeCVComponent implements OnInit {

  candiateResume: {
    accountDTO: {
      accountId: 0,
      addressEntity: {
        addressId: 0,
        district: "0",
        province: "0",
        street: "",
        ward: "0"
      },
      imageDTOs: [
        {
          imageId: 0,
          imageName: "",
          banner: false,
          avatar: false,
          thumbnail: false
        }
      ],
      email: "",
      roleEntities: [
        {
          roleId: 0,
          roleName: ""
        }
      ],
      status: "",
      username: ""
    },
    accountId: 0,
    achievement: string,
    birthday: "",
    candidateName: "",
    educationDTOs: [
      {
        degree: true,
        degreeTime: "",
        description: "",
        educationId: 0,
        school: ""
      }
    ],
    experienceDTOs: [
      {
        description: "",
        endTime: "",
        experienceId: 0,
        experienceName: "",
        startTime: ""
      }
    ],
    foreignLanguage: "",
    jobObjective: "",
    jobPositionEntity: {
      jobPositionId: 0,
      jobPositionName: ""
    },
    jobTypeEntity: {
      jobTypeId: 0,
      jobTypeName: ""
    },
    numYearExperience: 0,
    phone: "",
    salaryExpect: 0,
    sex: true,
    skillDTOs: [
      {
        description: "",
        skillId: 0,
        skillName: ""
      }
    ]
  }
  provice: any
  district: any
  ward: any
  accountId: any
  isChangeNumYearExperience: boolean = false
  images: any = new Object()
  pathAvatar: String = "assets/images/avatar_120x160.png"
  urlConfig = new UrlConfig()
  imageAvatar: any

  constructor(
    private dialog: MatDialog,
    private candidateCVService: CandidateCvService,
    private decodeJwtService: DecodeJwtService,
    private toastrService: ToastrService,
    private locationService: LocationService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private skillService: SkillService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initAction()
    this.initData()
  }

  private initAction() {
   $(document).ready(function() {
     $(window).scroll(function() {
       if($(window).scrollTop() > 100 && $(window).scrollTop() < $("#achievement-section").offset().top) {
         $(".elementscroll").addClass("elementscroll-fixed")
       } else {
        $(".elementscroll").removeClass("elementscroll-fixed")
       }

       if($(window).scrollTop() >= $("#self-info-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-self-info-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#target-job-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-target-job-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#job-infor-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-job-infor-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#experience-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-experience-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#education-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-education-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#skill-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-skill-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#foreign-language-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-foreign-language-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

       if($(window).scrollTop() >= $("#achievement-section").offset().top){
        $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
        $("#link-achievement-section").addClass("tabmenulink-active").children().addClass("link-active")
       }

      //  if($(window).scrollTop() >= $("#references-section").offset().top){
      //   $(".tabmenulinks .tabmenulink-active").removeClass("tabmenulink-active").children().removeClass("link-active")
      //   $("#link-references-section").addClass("tabmenulink-active").children().addClass("link-active")
      //  }
     })
   })
  }

  private initData() {
    if (this.decodeJwtService.getDecodedAccessToken() == null) {
      this.candiateResume = null
      return
    }

    this.accountId = this.decodeJwtService.getDecodedAccessToken().id;
    this.candidateCVService.getCandidateResume(this.accountId).subscribe(
      res => {
        console.log(res)
        this.candiateResume = res
        this.imageAvatar = this.candiateResume.accountDTO.imageDTOs.find(imageDTO => imageDTO.avatar)
        if(this.imageAvatar != null) {
          this.pathAvatar = this.urlConfig.urlImage + "/" + this.imageAvatar.imageName
        }
        this.setLocation()
        $(".job-target .content-job-target").html(this.candiateResume.jobObjective)
        $(".foreign-language .content-foreign-language").html(this.candiateResume.foreignLanguage)
        $(".job-achievement .content-job-achievement").html(this.candiateResume.achievement)
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

  addAvatar(files) {
    this.images.files = files;
    if(this.imageAvatar != null) {
      this.images.imageDTOs = [ this.imageAvatar ]
      this.images.imageDTOs[0].accountDTO = { accountId: this.accountId }
    } else {
      this.images.imageDTOs = [
        {
          accountDTO: {
            accountId: this.accountId
          },
          avatar: true,
          imageId: 0,
          imageName: "",
          banner: false,
          thumbnail: false
        }
      ]
    }

    console.log(this.images)
    Swal.fire({
      title: 'Bạn có chắc chắn muốn cập nhật avatar không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.addImages(this.images).subscribe(
          res => { 
            if(this.imageAvatar != null) {
              this.imageAvatar.imageName = res[0].imageName
            } else {
              this.candiateResume.accountDTO.imageDTOs.push(res[0])
              this.imageAvatar = res[0]
            }
            this.pathAvatar = this.urlConfig.urlImage + "/" + this.imageAvatar.imageName
            this.toastrService.success("Cập nhật avatar thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => { 
            console.log(error) 
            this.toastrService.error("Cập nhật avatar thất bại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
    
  }

  deleteAvater() {
    if(this.imageAvatar == null) {
      this.toastrService.error("Avatar của bạn chưa cập nhật", "ERROR", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
      return
    }

    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa avatar không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.deleteImage(this.imageAvatar).subscribe(
          res => { 
            const index = this.candiateResume.accountDTO.imageDTOs.findIndex(imageDTO => imageDTO.avatar);
            this.candiateResume.experienceDTOs.splice(index, 1)
            this.pathAvatar = "assets/images/avatar_120x160.png"
            this.toastrService.success("Xóa avatar thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => { 
            console.log(error) 
            this.toastrService.error("Xóa avatar thất bại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  editNumYearExperience(isChange, numYearExperience?:any) {
    this.isChangeNumYearExperience = isChange;
    if(numYearExperience != null) {
      this.candiateResume.numYearExperience = numYearExperience
      this.candidateCVService.updateCandidateResume(this.candiateResume).subscribe(
        res => {
          this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        },
        error => {
          console.log(error)
          this.toastrService.error("Có lỗi trong quá trình chỉnh sửa. Vui lòng kiểm tra lại", "ERROR", {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            tapToDismiss: false
          })
        }
      )
    }
  }

  openDialog(component, width, height, data) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    if(data !== null || data !== "undefined")
      dialogConfig.data = data
    dialogConfig.height = height
    dialogConfig.width = width
    return this.dialog.open(component, dialogConfig)
  }

  getSelfInfor() {
    const dialogRef = this.openDialog(ModalSelfInforComponent, "800px", "540px", this.candiateResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.setLocation()
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  getTarget() {
    const dialogRef = this.openDialog(ModalGoalComponent, "800px", "500px", this.candiateResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      $(".job-target .content-job-target").html(this.candiateResume.jobObjective)
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  getExpectJob() {
    const dialogRef = this.openDialog(ModalExpectJobComponent, "650px", "320px", this.candiateResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      console.log(data)
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  addExperience() {
    const dialogRef = this.openDialog(ModalExperienceComponent, "800px", "450px", null)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.candiateResume.experienceDTOs.push(data)
      this.toastrService.success("Thêm mới thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  editExperience(experienceId) {
    let experience = this.candiateResume.experienceDTOs.find(experience => experience.experienceId == experienceId)
    const dialogRef = this.openDialog(ModalExperienceComponent, "800px", "450px", experience)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  deleteExperience(experienceId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienceService.deleteExperience(experienceId).subscribe(
          res => {
            const index = this.candiateResume.experienceDTOs.findIndex(experience => experience.experienceId == experienceId);
            this.candiateResume.experienceDTOs.splice(index, 1);
            this.toastrService.success("Xóa thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => {
            console.log(error)
            this.toastrService.error("Có lỗi trong quá trình xóa. Vui lòng thực hiện lại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  addEducation() {
    const dialogRef = this.openDialog(ModalEducationComponent, "800px", "380px", null)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.candiateResume.educationDTOs.push(data)
      this.toastrService.success("Thêm mới thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  editEducation(educationId) {
    let education = this.candiateResume.educationDTOs.find(education => education.educationId == educationId)
    const dialogRef = this.openDialog(ModalEducationComponent, "800px", "380px", education)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  deleteEducation(educationId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.educationService.deleteEducation(educationId).subscribe(
          res => {
            const index = this.candiateResume.educationDTOs.findIndex(education => education.educationId == educationId);
            this.candiateResume.educationDTOs.splice(index, 1);
            this.toastrService.success("Xóa thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => {
            console.log(error)
            this.toastrService.error("Có lỗi trong quá trình xóa. Vui lòng thực hiện lại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  addSkill() {
    const dialogRef = this.openDialog(ModalSkillComponent, "650px", "285px", null)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.candiateResume.skillDTOs.push(data)
      this.toastrService.success("Thêm mới thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  editSkill(skillId) {
    let skill = this.candiateResume.skillDTOs.find(skill => skill.skillId == skillId)
    const dialogRef = this.openDialog(ModalSkillComponent, "650px", "285px", skill)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  deleteSkill(skillId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(skillId).subscribe(
          res => {
            const index = this.candiateResume.skillDTOs.findIndex(skill => skill.skillId == skillId);
            this.candiateResume.skillDTOs.splice(index, 1);
            this.toastrService.success("Xóa thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => {
            console.log(error)
            this.toastrService.error("Có lỗi trong quá trình xóa. Vui lòng thực hiện lại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  getForeignLanguage() {
    const dialogRef = this.openDialog(ModalForeignLangugeComponent, "800px", "500px", this.candiateResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      $(".foreign-language .content-foreign-language").html(this.candiateResume.foreignLanguage)
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })

    })
  }

  getAchievement() {
    const dialogRef = this.openDialog(ModalAchievementComponent, "800px", "500px", this.candiateResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      $(".job-achievement .content-job-achievement").html(this.candiateResume.achievement)
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })

    })
  }

  // getReferences() {
  //   const dialogRef = this.openDialog(ModalReferencesComponent, "800px", "400px", {})
  //   dialogRef.afterClosed().subscribe(data => {
  //     if (data == null) return
  //     this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
  //       timeOut: 3000,
  //       closeButton: true,
  //       progressBar: true,
  //       progressAnimation: 'increasing',
  //       tapToDismiss: false
  //     })
  //   })
  // }

}
