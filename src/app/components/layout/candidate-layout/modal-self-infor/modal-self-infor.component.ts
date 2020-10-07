import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-modal-self-infor',
  templateUrl: './modal-self-infor.component.html',
  styleUrls: ['./modal-self-infor.component.css']
})
export class ModalSelfInforComponent implements OnInit {

  provinces: Array<any>
  provinceIdSelected: any
  districts: any

  constructor(
    private dialogRef: MatDialogRef<ModalSelfInforComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationService.readData().subscribe(data => {
      this.provinces = data
    })
  }

  selectProvince(provinceIdSelected) {
    this.provinceIdSelected = provinceIdSelected
    this.selectDistrict()
  }

  selectDistrict() {
    if(this.provinceIdSelected == 0) {
      this.districts = null
    } else {
      this.districts = this.provinces.find(province => province.id === this.provinceIdSelected).districts
    }
  }

  save() {
    this.dialogRef.close("this.form.value");
  }

  close() {
      this.dialogRef.close();
  }
}
