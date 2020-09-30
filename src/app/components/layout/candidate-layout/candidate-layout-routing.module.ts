import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateLayoutComponent } from './candidate-layout.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';


const routes: Routes = [
  {
    path: "",
    component: CandidateLayoutComponent,
    children: [
      {
        path: "profile",
        component: CandidateProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateLayoutRoutingModule { }
