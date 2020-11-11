import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DetailRecruitmentComponent } from './detail-recruitment/detail-recruitment.component';
import { HomeCandidateComponent } from './home-candidate/home-candidate.component';
import { HomeEmployerComponent } from './home-employer/home-employer.component';
import { HomeComponent } from './home/home.component';
import { IntroduceEmployerComponent } from './introduce-employer/introduce-employer.component';

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
        path: "home-candidate",
        component: HomeCandidateComponent
      },
      {
        path: "home-employer",
        component: HomeEmployerComponent
      },
      {
        path: "detail-recruitment/:id",
        component: DetailRecruitmentComponent
      },
      {
        path: "introduce-employer/:id",
        component: IntroduceEmployerComponent
      },
      {
        path: "user/change-password",
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "candidate",
        loadChildren: () => import("./candidate-layout/candidate-layout.module").then(m => m.CandidateLayoutModule),
        canActivate: [AuthGuard]
      },
      {
        path: "employer",
        loadChildren: () => import("./employer-layout/employer-layout.module").then(m => m.EmployerLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
