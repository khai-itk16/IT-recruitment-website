import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobPositionService } from 'src/app/services/job-position.service';
import { JobTypeService } from 'src/app/services/job-type.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {

  editor = ClassicEditor
  contentEditorDescription = ""
  contentEditorRequire = ""
  editorConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'underline',
        'bulletedList',
        'numberedList',
        '|',
        'undo',
        'redo',
      ]
    }
  }

  jobPositions: Array<any>
  jobTypes: Array<any>
  form: FormGroup

  constructor(
    private jobPositionService: JobPositionService,
    private jobTypeService: JobTypeService,
    private fb: FormBuilder,
    private decodeJwtService: DecodeJwtService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      jobCode: ["", [Validators.required]],
      jobTitle: ["", [Validators.required]],
      jobPositionId: ["", [Validators.required]],
      jobTypeId: [2, [Validators.required]],
      numYearExperience: [0, [Validators.required, Validators.min(0), Validators.max(60)]],
      expirePostTime: ["", [Validators.required]],
      jobDescription: ["", [Validators.required]],
      jobRequire: ["", [Validators.required]]
    })
    this.initData()
  }

  private async initData() {
    await this.jobPositionService.getAllJobPositions().subscribe(
      res => {
        this.jobPositions = res
      },
      error => {
        console.log(error)
      }
    )

    await this.jobTypeService.getAllJobTypes().subscribe(
      res => {
        this.jobTypes = res
      },
      error => {
        console.log(error)
      }
    )
  }

  get formControl() { return this.form.controls; }

  save() {
    let formValue = this.form.value
    let accountId = this.decodeJwtService.getDecodedAccessToken().id
    let jobPost = {
      createPostTime: "",
      employerResumeDTO: {
        accountId: accountId
      },
      expirePostTime: formValue.expirePostTime,
      jobDescription: formValue.jobDescription,
      jobPositionEntity: {
        jobPositionId: Number(formValue.jobPositionId)
      },
      jobPostId: 0,
      jobCode: formValue.jobCode,
      jobRequire: formValue.jobRequire,
      jobTitle: formValue.jobTitle,
      jobTypeEntity: {
        jobTypeId: Number(formValue.jobTypeId)
      },
      numYearExperience: formValue.numYearExperience,
      statusEntity: {
        statusId: 1
      }
    }

    this.dataTransferService.setpreviewdata(jobPost)
    this.router.navigate(['/employer/review-job-post'])
  }

}
