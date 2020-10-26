import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerLayoutRoutingModule } from './employer-layout-routing.module';
import { EmployerLayoutComponent } from './employer-layout.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { ModalEmployerInfoComponent } from './modal-employer-info/modal-employer-info.component';
import { ModalEmployerOverviewComponent } from './modal-employer-overview/modal-employer-overview.component';
import { ModalWorkBenifitComponent } from './modal-work-benifit/modal-work-benifit.component';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    EmployerLayoutComponent,
    EmployerProfileComponent,
    ModalEmployerInfoComponent,
    ModalEmployerOverviewComponent,
    ModalWorkBenifitComponent
  ],
  imports: [
    CommonModule,
    EmployerLayoutRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  entryComponents: [
    ModalEmployerInfoComponent,
    ModalEmployerOverviewComponent,
    ModalWorkBenifitComponent
  ]
})
export class EmployerLayoutModule { }
