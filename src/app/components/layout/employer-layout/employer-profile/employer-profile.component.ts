import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DecodeJwtService } from 'src/app/services/decode-jwt.service';
import { EmployerService } from 'src/app/services/employer.service';
import { ImageService } from 'src/app/services/image.service';
import { LocationService } from 'src/app/services/location.service';
import { ModalEmployerInfoComponent } from '../modal-employer-info/modal-employer-info.component';
import { ModalEmployerOverviewComponent } from '../modal-employer-overview/modal-employer-overview.component';
import { ModalWorkBenifitComponent } from '../modal-work-benifit/modal-work-benifit.component';
import Swal from 'sweetalert2'
import { UrlConfig } from 'src/app/config/url-config';

declare const $:any

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

  accountId: number
  employerResume: any
  provice: any
  district: any
  ward: any
  indexImageLogo: any
  indexImageBanner: any
  private urlConfig = new UrlConfig()

  constructor(
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private locationService: LocationService,
    private employerService: EmployerService,
    private decodeJwtService: DecodeJwtService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  private async initData() {
    this.accountId = this.decodeJwtService.getDecodedAccessToken().id
    await this.employerService.getEmployerById(this.accountId).subscribe(
      res => {
        this.employerResume = res
        this.indexImageLogo = this.employerResume?.accountDTO?.imageDTOs?.findIndex(imageDTO => imageDTO.avatar);
        this.indexImageBanner = this.employerResume?.accountDTO?.imageDTOs?.findIndex(imageDTO => imageDTO.banner);
        $("#overview").html(this.employerResume?.overview)
        $("#work-reason").html(this.employerResume?.description)
      },
      error => {
        console.log(error)
      }
    )
  }

  getAddress() {
    let addressObj = this.employerResume?.accountDTO?.addressEntity
    let provices = this.locationService.readData();
    let proviceObj = provices.find(province => province.id == addressObj?.province)
    let districtObj = proviceObj?.districts.find(district => district.id == addressObj?.district)
    let wardObj = districtObj?.wards.find(ward => ward.id == addressObj?.ward)
    if (addressObj == null) { return "" }
    return addressObj?.street +", "+ wardObj?.name +", "+ districtObj?.name +", "+ proviceObj?.name
  }

  addLogo(files) {
    let images: any = new Object()
    images.files = files;
    images.imageDTOs = new Array<any>()
    if(this.indexImageLogo != -1) {
      this.employerResume.accountDTO.imageDTOs[this.indexImageLogo].accountDTO = { accountId: this.accountId }
      images.imageDTOs.push(this.employerResume?.accountDTO?.imageDTOs[this.indexImageLogo])
    } else {
      images.imageDTOs.push(
        {
          accountDTO: {
            accountId: this.accountId
          },
          avatar: true,
          imageId: 0,
          imageUrl: "",
          banner: false,
          thumbnail: false
        }
      )
    }

    Swal.fire({
      title: 'Bạn có chắc chắn muốn cập nhật logo không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.addImages(images).subscribe(
          res => { 
            console.log(res)
            const indexLogoRes = res.findIndex(imageDTO => imageDTO.avatar)
            if(this.indexImageLogo != -1) {
              this.employerResume.accountDTO.imageDTOs[this.indexImageLogo].imageUrl = res[indexLogoRes].imageUrl
            } else {
              this.employerResume.accountDTO.imageDTOs.push(res[indexLogoRes])
              this.indexImageLogo = this.employerResume.accountDTO.imageDTOs.length-1;
            }
            this.toastrService.success("Cập nhật logo thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => { 
            console.log(error) 
            this.toastrService.error("Cập nhật logo thất bại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  addBanner(files) {
    let images: any = new Object()
    images.files = files;
    images.imageDTOs = new Array<any>()
    if(this.indexImageBanner !== -1) {
      this.employerResume.accountDTO.imageDTOs[this.indexImageBanner].accountDTO = { accountId: this.accountId }
      images.imageDTOs.push(this.employerResume?.accountDTO?.imageDTOs[this.indexImageBanner])
    } else {
      images.imageDTOs.push(
        {
          accountDTO: {
            accountId: this.accountId
          },
          avatar: false,
          imageId: 0,
          imageUrl: "",
          banner: true,
          thumbnail: false
        }
      )
    }

    Swal.fire({
      title: 'Bạn có chắc chắn muốn cập nhật banner không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.addImages(images).subscribe(
          res => { 
            const indexBannerRes = res.findIndex(imageDTO => imageDTO.banner);
            if(this.indexImageBanner != -1) {
              this.employerResume.accountDTO.imageDTOs[this.indexImageBanner].imageUrl = res[indexBannerRes].imageUrl
            } else {
              this.employerResume.accountDTO.imageDTOs.push(res[indexBannerRes])
              this.indexImageBanner = this.employerResume.accountDTO.imageDTOs.length-1;
            }
            this.toastrService.success("Cập nhật banner thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => { 
            console.log(error) 
            this.toastrService.error("Cập nhật banner thất bại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  deleteLogo() {
    if(this.indexImageLogo == -1) {
      this.toastrService.error("Logo của bạn chưa cập nhật", "ERROR", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
      return
    }

    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa logo không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.deleteImage(this.employerResume.accountDTO.imageDTOs[this.indexImageLogo]).subscribe(
          res => { 
            this.employerResume.accountDTO.imageDTOs.splice(this.indexImageLogo, 1)
            this.indexImageLogo = -1
            this.toastrService.success("Xóa logo thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => { 
            console.log(error) 
            this.toastrService.error("Xóa logo thất bại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  deleteBanner() {
    if(this.indexImageBanner == -1) {
      this.toastrService.error("Ảnh bìa của bạn chưa cập nhật", "ERROR", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
      return
    }

    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa ảnh bìa không?',
      text: "Bạn không thể khôi phục lại nếu đã nhấn nút đồng ý",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.deleteImage(this.employerResume.accountDTO.imageDTOs[this.indexImageBanner]).subscribe(
          res => { 
            this.employerResume.accountDTO.imageDTOs.splice(this.indexImageBanner, 1)
            this.indexImageBanner = -1
            this.toastrService.success("Xóa ảnh bìa thành công", "SUCCESS", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          },
          error => { 
            console.log(error) 
            this.toastrService.error("Xóa ảnh bìa thất bại", "ERROR", {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false
            })
          }
        )
      }
    })
  }

  openDialog(component, width, height, data) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    if(data !== null || data !== "undefined") { dialogConfig.data = data }
    dialogConfig.height = height
    dialogConfig.width = width
    return this.dialog.open(component, dialogConfig)
  }

  getInfor() {
    const dialogRef = this.openDialog(ModalEmployerInfoComponent, "800px", "540px", this.employerResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  getOverview() {
    const dialogRef = this.openDialog(ModalEmployerOverviewComponent, "800px", "540px", this.employerResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      $("#overview").html(this.employerResume?.overview)
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

  getReason() {
    const dialogRef = this.openDialog(ModalWorkBenifitComponent, "800px", "540px", this.employerResume)
    dialogRef.afterClosed().subscribe(data => {
      if (data == null) return
      $("#work-reason").html(this.employerResume?.description)
      this.toastrService.success("Chỉnh sửa thành công", "SUCCESS", {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: false
      })
    })
  }

}
