import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerLayoutRoutingModule } from './employer-layout-routing.module';
import { EmployerLayoutComponent } from './employer-layout.component';


@NgModule({
  declarations: [
    EmployerLayoutComponent
  ],
  imports: [
    CommonModule,
    EmployerLayoutRoutingModule
  ]
})
export class EmployerLayoutModule { }
