import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlistComponent } from './add/addlist/addlist.component';
import { AuthenticationGuard } from "../app/authentication.guard";
import { SignInComponent } from './sign/sign-in/sign-in.component';

const routes: Routes = [
  {path:'',redirectTo:'addlist', pathMatch:'full'},
  {path:'signin',component:SignInComponent},
  {path:'addlist',component:AddlistComponent, canActivate: [AuthenticationGuard]},
  {path:'auth',  loadChildren: () => import('../../src/app/auth/auth-routing.module').then(m => m.AuthRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 