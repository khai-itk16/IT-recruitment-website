import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteInfoGuard } from 'src/app/guard/complete-info.guard';
import { RoleGuard } from 'src/app/guard/role.guard';
import { EmployerLayoutComponent } from './employer-layout.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { JobPostCompleteComponent } from './job-post-complete/job-post-complete.component';
import { JobPostReviewComponent } from './job-post-review/job-post-review.component';
import { JobPostComponent } from './job-post/job-post.component';
import { ManageApplyComponent } from './manage-apply/manage-apply.component';
import { ViewCvDetailComponent } from './view-cv-detail/view-cv-detail.component';


const routes: Routes = [
  {
    path: "",
    component: EmployerLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full"
      },
      {
        path: "profile",
        component: EmployerProfileComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'ROLE_EMPLOYER'
        } 
      },
      {
        path: "job-post",
        component: JobPostComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'ROLE_EMPLOYER'
        } 
      },
      {
        path: "review-job-post",
        component: JobPostReviewComponent,
        canActivate: [RoleGuard, CompleteInfoGuard], 
        data: { 
          expectedRole: 'ROLE_EMPLOYER'
        } 
      },
      {
        path: "complete-job-post",
        component: JobPostCompleteComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'ROLE_EMPLOYER'
        } 
      },
      {
        path: "manage-apply/:jobPostId",
        component: ManageApplyComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'ROLE_EMPLOYER'
        } 
      },
      {
        path: "view-cv-detail",
        component: ViewCvDetailComponent,
        canActivate: [RoleGuard], 
        data: { 
          expectedRole: 'ROLE_EMPLOYER'
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerLayoutRoutingModule { }
