import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'agency',
    loadChildren: () => import('./agency/agency.module').then(m => m.AgencyModule)
  },
  {
    path:'guide',
    loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
  },
  {
    path:'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
