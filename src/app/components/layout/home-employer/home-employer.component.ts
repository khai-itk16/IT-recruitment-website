import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobPostService } from 'src/app/services/job-post.service';
import Swal from 'sweetalert2'

declare const $: any

@Component({
  selector: 'app-home-employer',
  templateUrl: './home-employer.component.html',
  styleUrls: ['./home-employer.component.css']
})
export class HomeEmployerComponent implements OnInit {
  jobPosts: Array<any>
  isSearch: any

  constructor(
    private toastrService: ToastrService,
    private jobPostService: JobPostService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private decodeService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.isSearch = this.route.snapshot.queryParamMap.get('search');
    if(this.isSearch == null) {
      this.getAllJobPostsByStatus(2)
    } else {
      this.dataTransferService.getpreviewMessage().subscribe(
        res => { 
          $(document).ready(function() {
            $(".left a").removeClass("active-item-category")
            $("#status_2").addClass("active-item-category")
          })
          let accountId = this.decodeService?.getDecodedAccessToken()?.id
          this.jobPosts = res?.filter(jobPost => jobPost?.employerResumeDTO?.accountId == accountId)
        },
        error => { console.log(error) }
      )
    }
    
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

  getAllJobPostsByStatus(statusId) {
    $(document).ready(function() {
      $(".left a").removeClass("active-item-category")
      $("#status_"+statusId).addClass("active-item-category")
    })
    this.jobPostService.getAllJobPostsByAccountAndStatus(statusId).subscribe(
      res => {
        this.jobPosts = res
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteJobPost(jobPostId) {
    if(jobPostId !== null || jobPostId !== "undefined") {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa bài đăng không?',
        text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.isConfirmed) {
          this.jobPostService.deleteJobPost(jobPostId).subscribe(
            res => {
              let index = this.jobPosts.findIndex(jobPost => jobPost.jobPostId == jobPostId)
              if (index == -1) {
                this.toastrService.error("Bài đăng không tồn tại", "ERROR", {
                  timeOut: 3000,
                  closeButton: true,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  tapToDismiss: false
                })
                return
              }
              console.log(this.jobPosts)
              this.jobPosts.splice(index, 1)
              console.log(this.jobPosts)
              this.toastrService.success("Xóa bài đăng thành công", "SUCCESS", {
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'increasing',
                tapToDismiss: false
              })
            },
            error => { 
              console.log(error) 
              this.toastrService.error("Xóa bài đăng thất bại", "ERROR", {
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

}
