import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConfig } from 'src/app/config/url-config';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { JobApplyService } from 'src/app/services/job-apply.service';
import { JobPostService } from 'src/app/services/job-post.service';

declare const $: any

@Component({
  selector: 'app-manage-apply',
  templateUrl: './manage-apply.component.html',
  styleUrls: ['./manage-apply.component.css']
})
export class ManageApplyComponent implements OnInit {
  private jobPostId: string
  isShowJobPostRequire = true
  candidateApplies: Array<any>
  private urlConfig = new UrlConfig()

  constructor(
    private jobPostService: JobPostService,
    private jobApplyService: JobApplyService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jobPostId = this.route.snapshot.paramMap.get('jobPostId');
    this.showJobPostRequire()
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
    $(".left a").removeClass("active-item-category")
    $("#status_"+statusId).addClass("active-item-category")
    this.jobApplyService.getAllCandidateAppliesByStatus(this.jobPostId, statusId).subscribe(
      res => {
        console.log(res)
        this.candidateApplies = res
      },
      error => {
        console.log(error)
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

}
