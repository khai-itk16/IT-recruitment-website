import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { LocationService } from 'src/app/services/location.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  provinces: Array<any>
  isEmployer: boolean = false

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    public authService: AuthService,
    private router: Router,
    public decodeJwtService: DecodeJwtService
  ) { }

  ngOnInit(): void {
    this.provinces = this.locationService.readData()
  }

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.height = "350px"
    dialogConfig.width = "400px"
    const dialogRef = this.dialog.open(ModalLoginComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.toastrService.success('Đăng nhập thành công', 'SUCCESS', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      });
    })
  }

  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.height = "350px"
    dialogConfig.width = "400px"
    const dialogRef = this.dialog.open(ModalRegisterComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.toastrService.success('Đăng ký tài khoản thành công', 'SUCCESS', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      });
    })
  }

  logoutUser() {
    this.authService.logoutUser()
    this.router.navigate(['/home'])
  }
}
