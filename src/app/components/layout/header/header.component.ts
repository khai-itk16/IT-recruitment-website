import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  locations: Array<any>

  constructor(
    private locationService: LocationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationService.readData().subscribe(data =>{
      this.locations = data
      console.log(data)
    })
  }

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "350px";
    dialogConfig.width = "400px";
    this.dialog.open(ModalLoginComponent, dialogConfig);
  }

  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "350px";
    dialogConfig.width = "400px";
    this.dialog.open(ModalRegisterComponent, dialogConfig);
  }
}
