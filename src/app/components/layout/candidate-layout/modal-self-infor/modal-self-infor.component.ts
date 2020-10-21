import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CandidateCvService } from 'src/app/services/candidate-cv.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-modal-self-infor',
  templateUrl: './modal-self-infor.component.html',
  styleUrls: ['./modal-self-infor.component.css']
})
export class ModalSelfInforComponent implements OnInit, AfterViewInit {

  form: FormGroup
  provinces: Array<any>
  provinceIdSelected: any
  districts: any
  wards: any

  constructor(
    private dialogRef: MatDialogRef<ModalSelfInforComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private locationService: LocationService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private candidateCvService: CandidateCvService
  ) { }

  ngAfterViewInit(): void {
    if(this.data != null || this.data != "undefined") {
      this.form = this.fb.group({
        candidateName: [this.data?.candidateName, [Validators.required]],
        sex: [this.data.sex+"", [Validators.required]],
        birthday: [this.data?.birthday, [Validators.required]],
        phone: [this.data?.phone, [Validators.required]],
        email: [this.data?.accountDTO?.email, [Validators.required, Validators.email]],
        province: [this.data?.accountDTO?.addressEntity?.province, [Validators.required]],
        district: [this.data?.accountDTO?.addressEntity?.district, [Validators.required]],
        ward: [this.data?.accountDTO?.addressEntity?.ward, [Validators.required]],
        street: [this.data.accountDTO?.addressEntity?.street, [Validators.required]]
      });
      if (this.data?.accountDTO?.addressEntity?.province) {
        this.provinceIdSelected = this.data?.accountDTO?.addressEntity?.province
        this.selectDistrict(this.data?.accountDTO?.addressEntity?.district)
      }
    }
  }

  ngOnInit(): void {
    this.provinces = this.locationService.readData()
    this.form = this.fb.group({
      candidateName: ["", [Validators.required]],
      sex: ["true", [Validators.required]],
      birthday: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      province: ["0", [Validators.required]],
      district: ["0", [Validators.required]],
      ward: ["0", [Validators.required]],
      street: ["", [Validators.required]]
    });
  }
  
  
  selectProvince(provinceIdSelected) {
    this.provinceIdSelected = provinceIdSelected
    this.selectDistrict(0)
  }

  selectDistrict(districtIdSelected) {
    console.log(districtIdSelected)
    if(this.provinceIdSelected == 0) {
      this.districts = null
      this.wards = null;
    } else {
      this.districts = this.provinces.find(province => province.id === this.provinceIdSelected).districts
      if(districtIdSelected == 0) {
        this.wards = null;
      } else {
        this.wards = this.districts.find(district => district.id === districtIdSelected).wards
      }
    }
  }

  save() {
    const formValue = this.form.value
    this.data.candidateName = formValue.candidateName
    if(this.data.accountDTO.addressEntity == null) {
      this.data.accountDTO.addressEntity = new Object()
    }
    this.data.accountDTO.addressEntity.province = formValue.province
    this.data.accountDTO.addressEntity.district = formValue.district
    this.data.accountDTO.addressEntity.ward = formValue.ward
    this.data.accountDTO.addressEntity.street = formValue.street
    this.data.sex = (formValue.sex == "true")? true : false
    this.data.birthday = formValue.birthday
    this.data.phone = formValue.phone;

    console.log(this.data)

    this.candidateCvService.updateCandidateSelfInfor(this.data).subscribe(
      res => {
        console.log(res)
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
