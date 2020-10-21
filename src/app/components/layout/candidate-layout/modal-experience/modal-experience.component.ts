import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-modal-experience',
  templateUrl: './modal-experience.component.html',
  styleUrls: ['./modal-experience.component.css']
})
export class ModalExperienceComponent implements OnInit {

  form: FormGroup
  private isAddExperience: boolean = true;
  isChecked: boolean = false

  constructor(
    private dialogRef: MatDialogRef<ModalExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private experienceService: ExperienceService,
    private decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      experienceName: ["", [Validators.required]],
      monthStart: ["", [Validators.required]],
      yearStart: ["", [Validators.required]],
      monthEnd: ["", [Validators.required]],
      yearEnd: ["", [Validators.required]],
      description: ["", [Validators.required]]
    })

    if(this.data != null) {
      this.isAddExperience = false
      this.initData()
    }
  }

  private initData() {
    let startTimeArr = this.data.startTime.split("/")
    if(this.data.endTime == "hiện tại") {
      this.isChecked = true
      this.form = this.fb.group({
        experienceName: [this.data.experienceName, [Validators.required]],
        monthStart: [startTimeArr[0], [Validators.required]],
        yearStart: [startTimeArr[1], [Validators.required]],
        monthEnd: [{ value: "", disabled: true }, [Validators.required]],
        yearEnd: [{ value: "", disabled: true }, [Validators.required]],
        description: [this.data.description, [Validators.required]]
      })
    } else {
      let endTimeArr = this.data.endTime.split("/")
      this.form = this.fb.group({
        experienceName: [this.data.experienceName, [Validators.required]],
        monthStart: [startTimeArr[0], [Validators.required]],
        yearStart: [startTimeArr[1], [Validators.required]],
        monthEnd: [endTimeArr[0], [Validators.required]],
        yearEnd: [endTimeArr[1], [Validators.required]],
        description: [this.data.description, [Validators.required]]
      })
    }
  }

  setPresent() {
    this.isChecked = !this.isChecked
    if(this.isChecked == true) {
      this.form.controls.monthEnd.setValue("")
      this.form.controls.monthEnd.disable()
      this.form.controls.yearEnd.setValue("")
      this.form.controls.yearEnd.disable()
    } else {
      this.form.controls.monthEnd.enable()
      this.form.controls.yearEnd.enable()
    }
    
  }

  private addExperience() {
    this.data = new Object()
    let formValue = this.form.value
    let startTime = formValue.monthStart + "/" + formValue.yearStart
    let endTime = formValue.monthEnd + "/" + formValue.yearEnd
    if(!formValue?.monthEnd && !formValue?.yearEnd) {
      endTime = "hiện tại"
    }
    this.data.experienceName = formValue.experienceName
    this.data.startTime = startTime
    this.data.endTime = endTime
    this.data.description = formValue.description
    this.data.experienceId = 0
    this.data.candidateDTO = { accountId: this.decodeJwtService.getDecodedAccessToken().id }

    this.experienceService.addExperience(this.data).subscribe(
      res => {
        this.dialogRef.close(res);
      },
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình thêm mới. Vui lòng kiểm tra lại", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      }
    )
  }

  private editExperience() {
    let formValue = this.form.value
    console.log(formValue)
    let startTime = formValue.monthStart + "/" + formValue.yearStart
    let endTime = formValue.monthEnd + "/" + formValue.yearEnd
    if(!formValue?.monthEnd && !formValue?.yearEnd) {
      endTime = "hiện tại"
    }
    this.data.experienceName = formValue.experienceName
    this.data.startTime = startTime
    this.data.endTime = endTime
    this.data.description = formValue.description
    this.data.candidateDTO = { accountId: this.decodeJwtService.getDecodedAccessToken().id }
    console.log(this.data)
    this.experienceService.editExperience(this.data).subscribe(
      res => {
        this.dialogRef.close(res);
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

  save() {
    if(this.isAddExperience == true) {
      this.addExperience()
    } else {
      this.editExperience()
    }
  }

  close() {
      this.dialogRef.close();
  }

}
