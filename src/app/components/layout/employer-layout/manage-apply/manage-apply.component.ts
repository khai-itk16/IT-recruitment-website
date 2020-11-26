import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlConfig } from 'src/app/config/url-config';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JobApplyService } from 'src/app/services/job-apply.service';
import { JobPostService } from 'src/app/services/job-post.service';
import Swal from 'sweetalert2'

declare const $: any

@Component({
  selector: 'app-manage-apply',
  templateUrl: './manage-apply.component.html',
  styleUrls: ['./manage-apply.component.css']
})
export class ManageApplyComponent implements OnInit {
  private jobPostId: string
  isShowJobPostRequire = true
  isShowPageFilter = true
  statusSwitch: number
  candidateApplies: Array<any>
  private urlConfig = new UrlConfig()

  constructor(
    private jobPostService: JobPostService,
    private jobApplyService: JobApplyService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.jobPostId = this.route.snapshot.paramMap.get('jobPostId');
    this.getAllCandidateAppliesByStatus(5)
    $(document).ready(function() {
      $(window).scroll(function() {
        if($(window).scrollTop() > 100) {
          $(".left").addClass("left-fixed")
        } else {
         $(".left").removeClass("left-fixed")
        }
      })
    })
  }

  showJobPostRequire() {
    this.isShowJobPostRequire = true
    this.candidateApplies = null
    $(".left a").removeClass("active-item-category")
    $("#show_detail_job").addClass("active-item-category")
    this.jobPostService.getJobPostById(this.jobPostId).subscribe(
      res => {
        $("#job_description").html(res.jobDescription)
        $("#skills_experience").html(res.jobRequire)
      },
      error => { console.log(error) }
    )
  }

  getAllCandidateAppliesByStatus(statusId) {
    this.isShowJobPostRequire = false
    if(statusId == 5) {
      this.isShowPageFilter = true
    } else {
      this.isShowPageFilter = false
      if(statusId == 6) {
        this.statusSwitch = 7
      }

      if(statusId == 7) {
        this.statusSwitch = 6
      }
    }
    $(".left a").removeClass("active-item-category")
    $("#status_"+statusId).addClass("active-item-category")
    this.jobApplyService.getAllCandidateAppliesByStatus(this.jobPostId, statusId).subscribe(
      res => {
        this.candidateApplies = res
      },
      error => {
        console.log(error)
      }
    )
  }

  filterResume() {
    this.jobApplyService.filterResume(this.jobPostId).subscribe(
      res => {
        console.log(res)
        this.candidateApplies = []
        this.toastrService.success("Lọc các hồ sơ thành công", "SUSCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      },
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình lọc hồ sơ", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      }
    )
  }

  getImage(candidateApply) {
    let avartarImage = candidateApply?.accountDTO?.imageDTOs?.find(imageDTO => imageDTO.avatar)
    return this.urlConfig.urlImage+'/'+avartarImage.imageName
  }

  viewCV(candidateApply) {
    this.dataTransferService.setpreviewdata(candidateApply)
    this.router.navigate(["/employer/view-cv-detail"])
  }

  changeStatusJobApply(jobApplyId, statusId) {
    this.jobApplyService.changeStatusJobApply(jobApplyId, statusId).subscribe(
      res => {
        this.candidateApplies.splice(
          this.candidateApplies.findIndex(candidateApply => candidateApply.jobApplyId == jobApplyId), 1)
        
        this.toastrService.success("Chuyển đổi trạng thái thành công", "SUSCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      }, 
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình chuyển đổi trạng thái", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      }
    )
  }

  deleteJobApply(jobApplyId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa hồ sơ ứng tuyển này không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobApplyService.deleteJobApply(jobApplyId).subscribe(
          res => {
            this.candidateApplies.splice(
              this.candidateApplies.findIndex(candidateApply => candidateApply.jobApplyId == jobApplyId), 1)
            
            this.toastrService.success("Xóa hồ sơ ứng tuyển thành công", "SUSCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }, 
          error => {
            console.log(error)
            this.toastrService.error("Có lỗi trong quá trình xóa hồ sơ ứng tuyển", "ERROR", {
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

}
