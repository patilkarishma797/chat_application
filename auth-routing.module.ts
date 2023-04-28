import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  LoginComponent } from "../auth/login/login.component";
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from "../authentication.guard";
const routes: Routes = [
  {
    path:'',component:AuthComponent},
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
 