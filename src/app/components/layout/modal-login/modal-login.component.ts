import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef < ModalLoginComponent > ,
    @Inject(MAT_DIALOG_DATA) data,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  save() {
    this.authService.loginUser(this.form.value).subscribe(
        res => {
            localStorage.setItem('token', res.token)
            this.router.navigate(['/home'])
        },
        error => { 
          console.log(error)
          if(error.status == 401) {
            this.toastrService.error(
              `Đăng nhập tài khoản không thành công. 
              Vui lòng kiểm tra lại mật khẩu, mật khẩu phải có độ dài lớn hơn hoặc bằng 8 ký tự và
               bao gồm ký tự hoa chữ cái đặc biệt`, 'ERROR', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }

          if(error.status == 403) {
            this.toastrService.warning(
              `Đăng nhập tài khoản không thành công. 
              Tài khoản của bạn đã bị khóa. Bạn không thể truy cập vào hệ thống`, 'WARNING', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        },
        () => { this.dialogRef.close(true) }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
