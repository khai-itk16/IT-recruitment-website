import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-modal-education',
  templateUrl: './modal-education.component.html',
  styleUrls: ['./modal-education.component.css']
})
export class ModalEducationComponent implements OnInit {

  form: FormGroup
  isDegree: boolean = true

  constructor(
    private dialogRef: MatDialogRef<ModalEducationComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private educationService: EducationService,
    private decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.form = this.fb.group({
      school: ["", [Validators.required]],
      description: ["", [Validators.required]],
      degreeTime: ["", [Validators.required]],
      degree: [!this.isDegree, [Validators.required]],
    })

    if (this.data != null) {
      this.isDegree = this.data.degree
      this.initData()
    }
  }

  initData() {
    this.form = this.fb.group({
      school: [this.data.school, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      degreeTime: [this.data.degreeTime, [Validators.required]],
      degree: [!this.data.degree, [Validators.required]],
    })
  }

  statusDegree() {
    this.isDegree = !this.isDegree
    console.log(this.isDegree)
    if (this.isDegree == false) {
      this.form.controls.degreeTime.setValue(null)
      this.form.controls.degreeTime.disable()
    } else {
      this.form.controls.degreeTime.enable()
    }
  }

  save() {
    this.data = this.form.value
    this.data.degree = !this.data.degree
    this.data.candidateDTO = { accountId: this.decodeJwtService.getDecodedAccessToken().id }
    this.data.educationId = 0
    console.log(this.data)
    this.educationService.addEducation(this.data).subscribe(
      res => {
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
      },
      () => {
        this.dialogRef.close(true);
      }
    )
  }

  close() {
    this.dialogRef.close()
  }

}
