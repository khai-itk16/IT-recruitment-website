import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JobPostService } from 'src/app/services/job-post.service';
declare const $: any

@Component({
  selector: 'app-job-post-review',
  templateUrl: './job-post-review.component.html',
  styleUrls: ['./job-post-review.component.css']
})
export class JobPostReviewComponent implements OnInit {

  result: any = null

  constructor(
    private jobPostService: JobPostService,
    private toastrService: ToastrService,
    private router: Router,
    private dataTransferService: DataTransferService 
  ) { }

  ngOnInit(): void {
    this.dataTransferService.getpreviewMessage().subscribe(
      res => {
        this.result = res
        $("#job_description").html(this.result.jobDescription)
        $("#skills_experience").html(this.result.jobRequire)
      },
      error => { console.log(error) }
    )
  }

  save() {
    this.jobPostService.addJobPost(this.result).subscribe(
      res => {
        this.toastrService.success("Tạo bài đăng thành công", "SUSCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
        this.router.navigate(['/employer/complete-job-post'])
      },
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình tạo bài đăng. Vui lòng kiểm tra lại", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      }
    )
  }

  goBack() {
    window.history.back()
  }


}
