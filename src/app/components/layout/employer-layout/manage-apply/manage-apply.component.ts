import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostService } from 'src/app/services/job-post.service';

declare const $: any

@Component({
  selector: 'app-manage-apply',
  templateUrl: './manage-apply.component.html',
  styleUrls: ['./manage-apply.component.css']
})
export class ManageApplyComponent implements OnInit {
  private jobPostId: string

  constructor(
    private jobPostService: JobPostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.jobPostId = this.route.snapshot.paramMap.get('jobPostId');
    this.initData()
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

  initData() {
    this.jobPostService.getJobPostById(this.jobPostId).subscribe(
      res => {
        $("#job_description").html(res.jobDescription)
        $("#skills_experience").html(res.jobRequire)
      },
      error => { console.log(error) }
    )
  }

}
