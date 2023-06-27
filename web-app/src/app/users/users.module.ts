import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/material.module";
import { UsersRoutingModule } from "./users-routing.modules";
import { UsersComponent } from "./users.component";
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { UtilitiesService } from '../utilities.service';

@NgModule({
    declarations: [
        UsersComponent,
        UsersListComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        DataService,
        UtilitiesService
    ]
  })
  export class UsersModule { }