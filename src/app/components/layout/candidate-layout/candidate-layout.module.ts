import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateLayoutRoutingModule } from './candidate-layout-routing.module';
import { CandidateLayoutComponent } from './candidate-layout.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';


@NgModule({
  declarations: [CandidateLayoutComponent, CandidateProfileComponent],
  imports: [
    CommonModule,
    CandidateLayoutRoutingModule
  ]
})
export class CandidateLayoutModule { }
