import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-modal-skill',
  templateUrl: './modal-skill.component.html',
  styleUrls: ['./modal-skill.component.css']
})
export class ModalSkillComponent implements OnInit {

  form: FormGroup
  private isAddSkill: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ModalSkillComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private skillService: SkillService,
    private decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      skillName: ["", [Validators.required]],
      description: ["", [Validators.required]]
    })

    if(this.data != null) {
      this.isAddSkill = false
      this.initData()
    }
  }

  private initData() {
    this.form = this.fb.group({
      skillName: [this.data.skillName, [Validators.required]],
      description: [this.data.description, [Validators.required]]
    })
  }

  private addSkill() {
    this.data = this.form.value
    this.data.skillId = 0
    this.data.candidateDTO = { accountId: this.decodeJwtService.getDecodedAccessToken().id }
    this.skillService.addSkill(this.data).subscribe(
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

  private editSkill() {
    const formValue = this.form.value
    this.data.skillName = formValue.skillName
    this.data.description = formValue.description
    this.data.candidateDTO = { accountId: this.decodeJwtService.getDecodedAccessToken().id }
    console.log ("edit", this.data)
    this.skillService.editSkill(this.data).subscribe(
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
    if(this.isAddSkill == true) {
      this.addSkill()
    } else {
      this.editSkill()
    }
  }

  close() {
    this.dialogRef.close()
  }

}
