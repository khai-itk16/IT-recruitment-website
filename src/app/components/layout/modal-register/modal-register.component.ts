import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

  form: FormGroup;
  description:string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ModalRegisterComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private authService: AuthService,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        role: ['role_candidate']
        });
    }

    save() {
    let registerUser = this.form.value

    if (registerUser.role == "role_candidate") {
        delete registerUser.role
        registerUser.roleEntities = [
            { roleId: 3, roleName: "ROLE_CANDIDATE" }
        ]
    }

    if (registerUser.role == "role_employer") {
        delete registerUser.role
        registerUser.roleEntities = [
            { roleId: 4, roleName: "ROLE_EMPLOYER" }
        ]
    }

    console.log(registerUser)
    this.authService.registerUser(registerUser).subscribe(
        res => {
            console.log(res)
        },
        error => { 
            console.log(error)
            if (error.status == 409) {
                this.toastrService.error(
                    `Đăng ký tài khoản không thành công. 
                    Username đã tồn tại vui lòng chọn username khác.`, 'ERROR', {
                    timeOut: 3000,
                    closeButton: true,
                    progressBar: true,
                    progressAnimation: 'increasing',
                    tapToDismiss: false
                })
            } else {
                this.toastrService.error(
                    `Đăng ký tài khoản không thành công. 
                    Vui lòng kiểm tra lại định dạng email, 
                    mật khẩu phải có độ dài lớn hơn hoặc bằng 8 ký tự và
                     bao gồm ký tự hoa chữ cái đặc biệt`, 'ERROR', {
                    timeOut: 3000,
                    closeButton: true,
                    progressBar: true,
                    progressAnimation: 'increasing',
                    tapToDismiss: false
                })
            }
         },
        () => { this.dialogRef.close(true) }
    )}

    close() {
        this.dialogRef.close();
    }

}
