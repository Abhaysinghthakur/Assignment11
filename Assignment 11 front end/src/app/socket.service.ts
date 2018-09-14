import { Injectable } from '@angular/core';
//OBSERVABLE IMPORTING
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import * as io from 'socket.io-client';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;


  constructor(private toastr: ToastrService, private http: HttpClient) {
    //here socket connection is started or handshake 
    this.socket = io(this.url);
  }//constructor end here

  //event to be listened

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      })//end socket
    })//end observable
  }//verifyUser

  public chatRooms = () => {
    return Observable.create((observer) => {
      this.socket.on('chatRoom', (chatRoomList) => {
        observer.next(chatRoomList);
      })
    })
  }

  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on("online-user-list", (userList) => {
        observer.next(userList);
      })//end socket
    })//end observable
  }//onlineUserList end here

  public setChatRoomUsers = () => {
    return Observable.create((observer) => {
      this.socket.on('setChatRoomUsers', (chatRoomUser) => {
        observer.next(chatRoomUser);
      })
    })
  }

  public liveChat = (id) => {
    return Observable.create((observer) => {
      this.socket.on(id.toString(), (data) => {
        observer.next(data);
      })
    })
  }

  public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on("disconnect", () => {
        observer.next();
      })//end socket
    })//end observable
  }//disconnectedSocket end here

  public getChat(chatRoomId, skip): Observable<any> {
    return this.http.get(`${this.url}/api/assignment11/getChatRoomChat/${chatRoomId}?skip=${skip}&authToken=${Cookie.get('authtoken')}`);
  }// get chat

  public chatByUserId = (userId) => {
    return Observable.create((observer) => {
      this.socket.on("userId", (data) => {
        observer.next(data);
      })//end socket
    })// end observable
  }// end chatByUserId



  // EVENT TO BE EMMITED
  public setUser = (authToken) => {
    this.socket.emit("setUser", authToken);
    return Observable.create((observer) => {
      this.socket.on("online-user-list", (userList) => {
        observer.next(userList);
      })//end socket
    })//end observable
  }//setUser

  public whoIsTyping = (data) => {
    return Observable.create((observer) => {
      this.socket.on(data+"typing", (data) => {
        observer.next(data);
      })
    })
  }

  public SendChatMessage = (chatMsgObject) => {
    this.socket.emit('chatMsg', chatMsgObject)
  }//sendChatMessage

  public exitSocket = () => {
    this.socket.disconnect();
  }// end exit socket

  /*
  chatRoom emits -------------------> 
  */
  public saveChatRoom = (chatRoomData) => {
    this.socket.emit('createChatRoom', chatRoomData)
  }

  public editChatRoom = (chatRoomData) => {
    this.socket.emit('editChatRoom', chatRoomData)
  }

  public deleteChatRoom = (chatRoomData) => {
    this.socket.emit('deleteChatRoom', chatRoomData)
  }

  public joinChatRoom = (chatRoomData) => {
    this.socket.emit('joinRoom', chatRoomData)
  }

  public leaveChatRoom = (chatRoomData) => {
    this.socket.emit('leaveRoom', chatRoomData)
  }

  public getChatRoomUser = (chatRoomData) => {
    this.socket.emit('getChatRoomUsers', chatRoomData)
  }

  public typingEvent = (data) => {
    this.socket.emit('typing', data)
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An Error Occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
    }
  }

}//socketService end here
