import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRecruitmentComponent } from './detail-recruitment/detail-recruitment.component';
import { HomeComponent } from './home/home.component';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "detail-recruitment",
        component: DetailRecruitmentComponent
      },
      {
        path: "candidate",
        loadChildren: () => import("./candidate-layout/candidate-layout.module").then(m => m.CandidateLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
