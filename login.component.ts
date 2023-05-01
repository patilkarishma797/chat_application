import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';


import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngZone: any;
  toastr: any;
  public stform: FormGroup;
  constructor(public chatservices: ChatService, public formBuilder: FormBuilder, private router: Router, public fireservices: AngularFirestore) {
  }
  users: any = [];
  userDetails: any;
  
  dataModel :any = {
     
  }


  ngOnInit(): void {
    this.chatservices.loginUser("dipak@gmail.com", " dipak@gmail.com",).subscribe((res) => {
      if (res) {

        console.log(res);
      }
    })


  }

  login() {
    console.log('datamodel :',this.dataModel);
    this.chatservices.setUserStatus(true)
     this.chatservices.loginUser(this.dataModel.email,this.dataModel.password).subscribe(
      (res:any)=>{
        console.log(this.dataModel);
        if(res && res.length){
          let data =res.map(e => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),    
             
            }
          
          })
         
          console.log("Login success",data);
          localStorage.setItem('loginUser',JSON.stringify(Object.assign(data[0].data,{
            id:data[0].id
          })))
        
          this.router.navigate(['/addlist']);
         
        }else{
          console.log("Wrong user email and pwd");
        }
      }
    );

    
    

  }

  logout() {
    this.chatservices.logOutUser();  
    this.router.navigate(['/addlist']); 
    this.chatservices.setUserStatus(false);
  }

  






}
