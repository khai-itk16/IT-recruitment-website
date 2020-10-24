import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';
import { JobPositionService } from 'src/app/services/job-position.service';
import { JobTypeService } from 'src/app/services/job-type.service';

@Component({
  selector: 'app-modal-expect-job',
  templateUrl: './modal-expect-job.component.html',
  styleUrls: ['./modal-expect-job.component.css']
})
export class ModalExpectJobComponent implements OnInit {

  jobPositions: Array<any>
  jobTypes: Array<any>
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalExpectJobComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private jobPositionService: JobPositionService,
    private jobTypeService: JobTypeService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private candidateCvService: CandidateCvService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      jobPositionId: [0, [Validators.required]],
      salaryExpect: [0, [Validators.required, Validators.max(200000000), Validators.min(0)]],
      jobTypeId: [0, [Validators.required]],
    });
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
        this.form = this.fb.group({
          jobPositionId: [this.data?.jobPositionEntity?.jobPositionId, [Validators.required]],
          salaryExpect: [this.data?.salaryExpect, [Validators.required, Validators.max(200000000), Validators.min(0)]],
          jobTypeId: [this.data?.jobTypeEntity?.jobTypeId, [Validators.required]],
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  save() {
    const formValue = this.form.value

    if(this.data.jobPositionEntity == null) {
      this.data.jobPositionEntity  = new Object()
    }
    this.data.jobPositionEntity.jobPositionId = formValue.jobPositionId
    this.data.jobPositionEntity.jobPositionName = 
      this.jobPositions.find(jobPosition => jobPosition.jobPositionId == formValue.jobPositionId).jobPositionName

    if(this.data.jobTypeEntity == null) {
      this.data.jobTypeEntity  = new Object()
    }
    this.data.jobTypeEntity.jobTypeId = formValue.jobTypeId
    this.data.jobTypeEntity.jobTypeName = 
    this.jobTypes.find(jobType => jobType.jobTypeId == formValue.jobTypeId).jobTypeName

    this.data.salaryExpect = formValue.salaryExpect

    this.candidateCvService.updateCandidateResume(this.data).subscribe(
      res => {
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
      },
      () => {
        this.dialogRef.close(true);
      }
    )
  }

  close() {
      this.dialogRef.close();
  }

}
