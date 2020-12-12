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
  jobPost = null;

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
    await this.jobPositionService.getAllJobPositions()
      .toPromise()
      .then(res => {
        this.jobPositions = res
      })
      .catch(error => console.log(error))

    await this.jobTypeService.getAllJobTypes()
      .toPromise()
      .then(res => {
        this.jobTypes = res
      })
      .catch(error => console.log(error))

    this.dataTransferService.getpreviewMessage().subscribe(
      res => {
        this.jobPost = res
        if(this.jobPost != null) {
          this.form = this.fb.group({
            jobCode: [this.jobPost?.jobCode, [Validators.required]],
            jobTitle: [this.jobPost?.jobTitle, [Validators.required]],
            jobPositionId: [this.jobPost?.jobPositionEntity?.jobPositionId, [Validators.required]],
            jobTypeId: [this.jobPost?.jobTypeEntity?.jobTypeId, [Validators.required]],
            numYearExperience: [this.jobPost?.numYearExperience, [Validators.required, Validators.min(0), Validators.max(60)]],
            expirePostTime: [this.jobPost?.expirePostTime, [Validators.required]],
            jobDescription: [this.jobPost?.jobDescription, [Validators.required]],
            jobRequire: [this.jobPost?.jobRequire, [Validators.required]]
          })
        }
      },
      error => {console.log(error)}
    )
  }

  get formControl() { return this.form.controls; }

  save() {
    let formValue = this.form.value
    let accountId = this.decodeJwtService.getDecodedAccessToken().id
    this.jobPost = {
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

    this.dataTransferService.setpreviewdata(this.jobPost)
    this.router.navigate(['/employer/review-job-post'])
  }

}
