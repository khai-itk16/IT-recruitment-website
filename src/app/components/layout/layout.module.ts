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
import { HomeEmployerComponent } from './home-employer/home-employer.component';
import { HomeCandidateComponent } from './home-candidate/home-candidate.component';
import { IntroduceEmployerComponent } from './introduce-employer/introduce-employer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    HomeComponent, 
    DetailRecruitmentComponent, 
    ModalLoginComponent, 
    ModalRegisterComponent, HomeEmployerComponent, HomeCandidateComponent, IntroduceEmployerComponent, ChangePasswordComponent
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
