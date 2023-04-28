import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';


@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent  {

  constructor(public chatservices: ChatService, private router: Router, private activatedRouter: ActivatedRoute) { }
  loginUserData: any = {}
  student: any = [];
  ismenu: boolean = false
  students: any = [];
  msg: string;
  model: string;
  public messagelist: any = [];
  public selectuser: any = [];
  dataModel: any = {};
  userChat: any = [];
  datachat: {}
  selectedChatUser;
  Name: string;
  userData: any;
  message = '';
  messages: any[] = [];
  usersList: any = [];
  senderId: any = [];
  id: any;
  receiverid: any;
  islogin: boolean = false;
  status = false;
  userid: any = []
  ispopbox:boolean=false
  ngOnInit(): void {
   
    this.checkUserLoggedIn();
    this.getAllUser();
    this.getuserdetails();
    this.sendMessage();
    this.userStatusMode()

  }

 userStatusMode(){
  this.chatservices.getUserStatus().subscribe(status => {
    this.status=status
     });
}


  sendChatMessage() {
    this.chatservices.sendMessage(this.message, this.id, this.receiverid);
    this.message = '';
    this.receiverid=''

  }



 

  sendMessage() {
   let loginUser: any = localStorage.getItem('loginUser')


    if (loginUser) {
      loginUser = JSON.parse(loginUser)
    }

    this.receiverid = this.selectedChatUser.id;
    this.id = this.loginUserData.id;

    this.sendChatMessage();

    console.log(this.selectedChatUser.id);

  }



  getAllChatMessage(senderId,receiverId) {
    this.chatservices.getMessages(senderId,receiverId).subscribe(messages => {
      this.messages = messages,
      this.chatservices.getSelectedUserMsg(senderId,receiverId).subscribe(
        (msg)=>{
          this.messages = this.messages.concat(msg);
          this.messages = [...new Set(this.messages)];
        }
      )
        console.log(messages);
       
    })
  }
 


  removeDuplicates(array) :any{
    return [...new Set(array)]
  }


  checkUserLoggedIn() {
    let userData: any = localStorage.getItem('loginUser');
    if (userData) {
      userData = JSON.parse(userData)
      
    }
    console.log(userData);
    this.loginUserData = userData;
  }




  getAllchat() {

    const chatId = this.activatedRouter.snapshot.params['id'];
    this.chatservices.getAllchat(chatId).subscribe((res: any) => {

      this.userData = res.payload.data();
      this.msg = this.userData.msg;
    })
  }



  getuserdetails() {
    this.chatservices.loginUser(this.dataModel.email, this.dataModel.password).subscribe((data: any) => {
      this.dataModel = data.map(e => {
        let val = localStorage.getItem(this.dataModel.email);
        console.log(val);

      })

    })
  }




  getAllUser() {
    this.chatservices.getallrecord().subscribe((data: any) => {
      this.students = data.map(e => {
        return {

          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        }
      })
      console.log("================", this.students);
    })
  }


 
 
 
  menu() {
    this.ismenu = true;
  }



  onClickChatUser(userDetails) {
    this.selectedChatUser = userDetails;
    console.log(userDetails);
   
      console.log(this.loginUserData);
      
     
   if(userDetails.id){
    this.islogin=true;
  console.log(userDetails);
    this.messages=[];
     this.getAllChatMessage(this.loginUserData.id,userDetails.id);
   }
    
  } 

  logOut(){
    this.chatservices.logOutUser(); 
    this.router.navigateByUrl('auth/login')  
    this.ispopbox = !this.ispopbox;
  }
  

}   
