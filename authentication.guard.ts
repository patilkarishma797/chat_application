import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(public chatservices: ChatService, private router: Router, public afAuth: AngularFireAuth) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let status: boolean = false;

  if (!this.chatservices.gettoken()) {

      this.router.navigateByUrl('auth/login');
    

    } 
    
     return this.chatservices.gettoken();

    


  



  }





}
