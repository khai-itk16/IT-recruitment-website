import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerLayoutComponent } from './employer-layout.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';


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
        component: EmployerProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerLayoutRoutingModule { }
