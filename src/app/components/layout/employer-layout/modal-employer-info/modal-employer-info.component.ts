import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EmployerService } from 'src/app/services/employer.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-modal-employer-info',
  templateUrl: './modal-employer-info.component.html',
  styleUrls: ['./modal-employer-info.component.css']
})
export class ModalEmployerInfoComponent implements OnInit {

  form: FormGroup
  provinces: Array<any>
  provinceIdSelected: any
  districts: any
  wards: any

  constructor(
    private dialogRef: MatDialogRef<ModalEmployerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private locationService: LocationService,
    private employerService: EmployerService
  ) { }

  ngOnInit(): void {
    this.provinces = this.locationService.readData()
    let workTime = this.data?.workTime?.split(" - ")
    if(workTime == null) {
      workTime = ["Thứ 2", "Thứ 6"]
    }

    this.form = this.fb.group({
      employerName: [this.data?.employerName, [Validators.required]],
      numMember: [this.data?.numMember, [Validators.required]],
      dayStart: [workTime[0], [Validators.required]],
      dayEnd: [workTime[1], [Validators.required]],
      province: [this.data?.accountDTO?.addressEntity?.province, [Validators.required]],
      district: [this.data?.accountDTO?.addressEntity?.district, [Validators.required]],
      ward: [this.data?.accountDTO?.addressEntity?.ward, [Validators.required]],
      street: [this.data?.accountDTO?.addressEntity?.street, [Validators.required]]
    })

    if (this.data?.accountDTO?.addressEntity?.province) {
      this.provinceIdSelected = this.data?.accountDTO?.addressEntity?.province
      this.selectDistrict(this.data?.accountDTO?.addressEntity?.district)
    }
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
    if(this.data?.accountDTO?.addressEntity == null) { 
      this.data.accountDTO.addressEntity = new Object() 
      this.data.accountDTO.addressEntity.addressId = 0
    }

    this.data.accountDTO.addressEntity.province = formValue.province
    this.data.accountDTO.addressEntity.district = formValue.district
    this.data.accountDTO.addressEntity.ward = formValue.ward
    this.data.accountDTO.addressEntity.street = formValue.street
    this.data.employerName = formValue.employerName
    this.data.numMember = formValue.numMember
    this.data.workTime = `${formValue.dayStart} - ${formValue.dayEnd}`

    this.employerService.updateEmployer(this.data).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
        this.toastrService.error("Có lỗi trong quá trình cập nhật. Vui lòng kiểm tra lại", "ERROR", {
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
