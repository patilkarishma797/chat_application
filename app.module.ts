import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from "../assets/environment/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignInComponent } from './sign/sign-in/sign-in.component';
import { AddlistComponent } from './add/addlist/addlist.component';
import {HttpClientModule  } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './services/chat.service';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import  {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './auth/login/login.component';
import { AuthenticationGuard } from './authentication.guard';


const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };
@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    SignInComponent,
    AddlistComponent,
    RegisterComponent,
    AuthComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
