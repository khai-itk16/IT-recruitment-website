import { Component, OnInit } from '@angular/core';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobApplyService } from 'src/app/services/job-apply.service';
import Swal from 'sweetalert2'

declare const $: any

@Component({
  selector: 'app-candidate-job-apply',
  templateUrl: './candidate-job-apply.component.html',
  styleUrls: ['./candidate-job-apply.component.css']
})
export class CandidateJobApplyComponent implements OnInit {

  jobPosts: Array<any>
  accountId: number

  constructor(
    private jobApplyService: JobApplyService,
    private decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.accountId = this.decodeJwtService?.getDecodedAccessToken()?.id
    this.getAllJobAppliesByStatusId(5)
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

  getAllJobAppliesByStatusId(statusId) {
    $(".left a").removeClass("active-item-category")
    $("#status_"+statusId).addClass("active-item-category")
    this.jobApplyService.getAllJobPostByCandidateIdAndStatusId(this.accountId, statusId).subscribe(
      res => {
        this.jobPosts = res
      },
      error => {
        console.log(error)
      }
    )
  }

}
