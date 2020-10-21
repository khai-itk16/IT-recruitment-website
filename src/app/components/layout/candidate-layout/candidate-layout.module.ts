import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CandidateLayoutRoutingModule } from './candidate-layout-routing.module';
import { CandidateLayoutComponent } from './candidate-layout.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateMakeCVComponent } from './candidate-make-cv/candidate-make-cv.component';
import { ModalSelfInforComponent } from './modal-self-infor/modal-self-infor.component';
import { ModalGoalComponent } from './modal-goal/modal-goal.component';
import { ModalExpectJobComponent } from './modal-expect-job/modal-expect-job.component';
import { ModalExperienceComponent } from './modal-experience/modal-experience.component';
import { ModalReferencesComponent } from './modal-references/modal-references.component';
import { ModalAchievementComponent } from './modal-achievement/modal-achievement.component';
import { ModalSkillComponent } from './modal-skill/modal-skill.component';
import { ModalEducationComponent } from './modal-education/modal-education.component';
import { CandidateCvComponent } from './candidate-cv/candidate-cv.component';
import { ModalForeignLangugeComponent } from './modal-foreign-languge/modal-foreign-languge.component';



@NgModule({
  declarations: [
    CandidateLayoutComponent, 
    CandidateProfileComponent, 
    CandidateMakeCVComponent, 
    ModalSelfInforComponent,
    ModalGoalComponent,
    ModalExpectJobComponent,
    ModalExperienceComponent,
    ModalReferencesComponent,
    ModalAchievementComponent,
    ModalSkillComponent,
    ModalEducationComponent,
    CandidateCvComponent,
    ModalForeignLangugeComponent
  ],
  imports: [
    CommonModule,
    CandidateLayoutRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  entryComponents: [
    ModalSelfInforComponent,
    ModalGoalComponent,
    ModalExpectJobComponent,
    ModalExperienceComponent,
    ModalEducationComponent,
    ModalSkillComponent,
    ModalAchievementComponent,
    ModalReferencesComponent,
    ModalForeignLangugeComponent
  ]
})
export class CandidateLayoutModule { }
