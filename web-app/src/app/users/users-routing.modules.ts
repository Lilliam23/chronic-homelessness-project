import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    {
      path: '',
      component: UsersComponent
    },
    {
      path:'list',
      component: UsersListComponent
    },
    {
      path:':id/edit',
      component: UsersComponent,
      pathMatch: 'full'
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }