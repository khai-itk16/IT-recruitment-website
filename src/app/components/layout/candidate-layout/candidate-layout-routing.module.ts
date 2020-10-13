import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateCvComponent } from './candidate-cv/candidate-cv.component';
import { CandidateLayoutComponent } from './candidate-layout.component';
import { CandidateMakeCVComponent } from './candidate-make-cv/candidate-make-cv.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';


const routes: Routes = [
  {
    path: "",
    component: CandidateLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full"
      },
      {
        path: "profile",
        component: CandidateProfileComponent
      },
      {
        path: "view-cv",
        component: CandidateCvComponent
      },
      {
        path: "make-cv",
        component: CandidateMakeCVComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateLayoutRoutingModule { }
