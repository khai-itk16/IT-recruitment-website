import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlConfig } from 'src/app/config/url-config';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { JobPositionService } from 'src/app/services/job-position.service';
import { JobPostService } from 'src/app/services/job-post.service';
import { LocationService } from 'src/app/services/location.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

declare const $: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  provinces: Array<any>
  isEmployer: boolean = false
  urlConfig = new UrlConfig()
  account: any
  positions: Array<any>

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    public authService: AuthService,
    private router: Router,
    public decodeJwtService: DecodeJwtService,
    public accountService: AccountService,
    private jobPositionService: JobPositionService,
    private jobPostService: JobPostService,
    private dataTransferService: DataTransferService
  ) {}

  ngOnInit(): void {
    this.accountInfo()
    this.getAllJobPositions()
    this.provinces = this.locationService.readData()
  }

  accountInfo() {
    if(this.authService.loggedIn()) {
      const tokenDecode = this.decodeJwtService.getDecodedAccessToken()
      this.isEmployer = (tokenDecode?.roles == "ROLE_EMPLOYER") ? true : false
      const accountId = tokenDecode?.id
      this.accountService.getAccount(accountId).subscribe(
        res => {
          this.account = res
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  getAllJobPositions() {
    this.jobPositionService.getAllJobPositions().subscribe(
      res => {
        this.positions = res
      },
      error => {
        console.log(error)
      }
    )
  }

  search(keySearch) {
    let provinceSearch = $("#provinceSearch").val()
    let positionSearch = $("#positionSearch").val()
    
    let params = new Object()
    params['keySearch'] = keySearch
    if(typeof(provinceSearch) !== "undefined" && provinceSearch !== "") {
      params['provinceId'] = provinceSearch
    }
    if(typeof(positionSearch) !== "undefined" && positionSearch !== "") {
      params['positionId'] = positionSearch
    }
    this.jobPostService.searchJobPosts(params).subscribe(
      res => {
        this.dataTransferService.setpreviewdata(res)
        if(this.isEmployer) {
          this.router.navigate(["/home-employer"], { queryParams: { search: true } })
        } else {
          this.router.navigate(["/home-candidate"], { queryParams: { search: true } })
        }
      },
      error => { console.log(error) }
    )
  }

  getImage() {
    let logoImage = this.account?.imageDTOs?.find(imageDTO => imageDTO?.avatar)
    return (logoImage !== null && logoImage !== undefined) ? this.urlConfig.urlImage+'/'+logoImage?.imageName : "/assets/images/profile.png"
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
      this.accountInfo()
      this.toastrService.success('Đăng nhập thành công', 'SUCCESS', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      });
      this.router.navigateByUrl('/home-candidate', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home'])
      })
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
  }
}
