import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {


  public stform: FormGroup;
  name: string;
  email: string;
  userDetails: any;
  studentid = null;
  student: string;
  Name: string;
  Email: string;
  number: Number;
  cpassword: string;
  password: string;
  message: string;
  studentdata: any = [];

  constructor(public chatservices: ChatService, private activatedRouter: ActivatedRoute, public formBuilder: FormBuilder) {
    this.stform = this.formBuilder.group({
      Name: [''],
      Email: [''],
      password: [''],
      cpassword: ['']
    })
  }


  ngOnInit(): void {
    if (this.activatedRouter.snapshot.params['id']) {
      this.getUserDetails();
      this.chatservices.setUserStatus(true)
    }
    this.chatservices.loginUser("dipak@gmail.com", "users /").subscribe((res) => {
      console.log(res);
    });

  }





  getUserDetails() {
    const userId = this.activatedRouter.snapshot.params['id']
    this.chatservices.getUserDetails(userId).subscribe((res: any) => {

      this.userDetails = res.payload.data();

      this.Name = this.userDetails.name;
      this.Email = this.userDetails.email;
      this.number = this.userDetails.number;
    })
  }


  logout() {
    // perform logout logic
    this.chatservices.setUserStatus(false);
  }


  submit() {
    this.chatservices.setUserStatus(true)
    let record = {};
    record['name'] = this.Name;
    record['number'] = this.number;
    record['email'] = this.Email;
    record['password'] = this.password;
    record['cpassword'] = this.cpassword;

    const id = this.activatedRouter.snapshot.params['id'];

    if (id) {
      this.chatservices.updateuser(record, id).then(res => {
        this.Name = "";
        this.number = 0;
        this.Email = "";
        this.password = "";
        this.cpassword = "";

        console.log(res);
      }).catch(error => {
        console.log(error);
      });
    } else{
      this.chatservices.create_user(record).then(res => {
        this.Name = "";
        this.number = 0;
        this.Email = "";
        this.password = "";
        this.cpassword = "";
        this.chatservices.setUserStatus(true)
        console.log('registeruser', record);
        localStorage.setItem('registeruser', JSON.stringify(record))

      })
    }
  }




}
