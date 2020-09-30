import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { 
    path: "",
    loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    }  
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
