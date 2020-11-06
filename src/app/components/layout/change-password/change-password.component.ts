import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { MustMatch } from 'src/app/utils/custom-validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private decodeJwtService: DecodeJwtService,
    private accountService: AccountService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    },{
      validators: MustMatch('newPassword', 'confirmPassword')
    })
  }

  get formControl() { return this.form.controls; }

  save() {
    let formValue = this.form.value
    let passwordDTO = {
      accountId: this.decodeJwtService.getDecodedAccessToken()?.id,
      oldPassword: formValue.oldPassword,
      newPassword: formValue.newPassword
    }
    this.accountService.changePassword(passwordDTO).subscribe(
      res => {
        console.log(res)
        this.toastrService.success("Cập nhật mật khẩu thành công", "SUCCESS", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      },
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình cập nhật mật khẩu. Vui lòng kiểm tra lại định dạng của mật khẩu", "ERROR", {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false
        })
      }
    )
  }

}
