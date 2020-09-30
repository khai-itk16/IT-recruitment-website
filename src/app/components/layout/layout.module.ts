import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DetailRecruitmentComponent } from './detail-recruitment/detail-recruitment.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';


@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    HomeComponent, 
    DetailRecruitmentComponent, 
    ModalLoginComponent, 
    ModalRegisterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModalLoginComponent, 
    ModalRegisterComponent
  ]
})
export class LayoutModule { }
