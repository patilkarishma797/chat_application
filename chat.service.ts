import { Injectable, OnInit } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject,Observable } from 'rxjs';
import { io } from 'socket.io-client';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
const config: SocketIoConfig = {
  url: 'http://localhost:4200',
  options: {
    autoConnect: false
  }
};


@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket implements OnInit {

  user$: Observable<any>;
  constructor(private socket: Socket, public fireservices: AngularFirestore,  public router:Router,public afAuth:AngularFireAuth) {
    super(config)

  }


  message = '';
  text: string;
  isdelete: boolean;
  students: any = [];
  loginUserdata: any = []
  ngOnInit(): void {
    const userId='ad66ZWpcubVON7KbjUeT';
    this.user$ = this.fireservices
      .doc(`item/${userId}`)
      .valueChanges();

  }
  socketConnet() {

  }

  sendmsg(msg: string) {
    this.socket.emit('message', msg);
    console.log(msg);
  }

  getmsg() {
    /* return new Observable((observer: Observer<any>) => {
       this.socket.on('message', (message: string) => {
         observer.next(message);
 
       });
       return () => {
         this.socket.disconnect();
       }
     })*/

  }
  gettoken(){  
    return !!localStorage.getItem('loginUser');  
    }  
   
   




  private userStatus = new BehaviorSubject<boolean>(false);


  setUserStatus(status: boolean) {
     this.userStatus.next(status);
  }

getUserStatus(){
  return this.userStatus.asObservable();
}



  create_user(record) {
    return this.fireservices.collection('users').add(record) 
    
  }



  getAllchat(message) {
    return this.fireservices.collection('chat').snapshotChanges()
  }


  getallrecord() {
    return this.fireservices.collection('users').snapshotChanges();

  }



  getMessages(senderId,receiverId) {
    return this.fireservices.collection('chat', ref => ref.where("receiverid", "==", receiverId).where("id", "==", senderId)).valueChanges();
  }

  getSelectedUserMsg(senderId,receiverId) {
    return this.fireservices.collection('chat', ref => ref.where("receiverid", "==", senderId).where("id", "==", receiverId)).valueChanges();
  }



  sendMessage(message, id, receiverid) {
    return this.fireservices.collection('chat').add({
      text: message,
      date: new Date().getTime(),
      id: id,
      receiverid: receiverid
    });
    this.message = ''
  }



  getUserDetails(docId) {
    return this.fireservices.collection('users').doc(docId).snapshotChanges();
  }



  updateuser(record, docId) {
    return this.fireservices.collection('users').doc(docId).update(docId)
  }


  loginUser(email, password) {
    return this.fireservices.collection('users', ref => ref.where("email", "==", email).where("password", "==", password)).snapshotChanges();
  }
  logOutUser(){
    return     localStorage.clear() 
    
  }

}
