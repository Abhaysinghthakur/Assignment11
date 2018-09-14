import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//ROUTER IMPORTING
import { Router } from '@angular/router'
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';
//FORM
import { FormsModule } from '@angular/forms';
//Http SERVICE IMPORTING
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from '../../socket.service';
import { FirstCharComponent } from '../../shared/first-char/first-char.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe',{read:ElementRef})
  public scrollMe: ElementRef;


  public authToken: any;
  public userInfo: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  public scrollToChatTop: boolean = false;

  public receiverId: any;
  public receiverName: any;
  public previousChatList: any = [];
  public messageText: any;
  public messageList: any = []; // stores the current message list display in chat box
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;
  public chatRoomList: any;

  public roomTitle: String;
  public roomDescription: String;
  public chatRoomTitle: String;
  public selectedChatRoomId: String;
  public chatRoomUserList: any[];

  public typingName: String = "";
  public temp;
  // public authToken: any;
  // public userInfo: any;
  // public receiverId: any;
  // public receiverName: any;
  // public userList = [];
  // public disconnectedSocket: boolean;
  constructor(
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    public SocketService: SocketService,
    private cdRef: ChangeDetectorRef
  ) {
    this.cdRef.detectChanges;
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
  }//chatBoxComponent constructor end

  ngOnInit() {
    this.authToken = Cookie.get('authtoken');
    this.userInfo = this.appService.getUserInfoFromLocalStorage();
    this.checkStatus();
    this.verifyUserConnection();
    this.getAllChatRoom();
  }// ngOnInit end here

  public checkStatus: any = () => {
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(['chat']);
      return false;
    } else {
      return true;
    }
  }//end chekstatus

  public verifyUserConnection: any = () => {
    this.SocketService.verifyUser()
      .subscribe((data) => {
        this.disconnectedSocket = false;
        this.SocketService.setUser(this.authToken);
      });
  }//end verifyUserConnection

  public getOnlineUserList: any = () => {
    this.SocketService.onlineUserList()
      .subscribe((userList) => {
        this.userList = [];
        for (let x in userList) {
          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };
          this.userList.push(temp);
        }
      });
  }//end getOnlineUserList


  public getPreviousChatInChatRoom: any = () => {
    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : []);

    this.SocketService.getChat(this.selectedChatRoomId, this.pageValue * 10)
      .subscribe((apiResponse) => {
        if (apiResponse.status == 200) {
          this.messageList = apiResponse.data.concat(previousData);
        } else {
          this.messageList = previousData;
          this.toastr.warning('No Messages available')
        }
        this.loadingPreviousChat = false;
      }, (err) => {
        this.toastr.error('some error occured')
      });
  }// end get previous chat with any user



  public loadEarlierPageOfChat: any = () => {

    this.loadingPreviousChat = true;

    this.pageValue++;
    this.scrollToChatTop = true;

    this.getPreviousChatInChatRoom()

  } // end loadPreviousChat

  public getLiveChat = () => {
    this.SocketService.liveChat(this.selectedChatRoomId).subscribe(
      (response) => {
        if (response["senderId"] != this.userInfo.userId) {
          this.messageList.push(response);
        }
      },
      (err) => {
        console.log("error while getting liveChat");
      }
    )
  }

  public setChatRoomUsers = (id) => {

    this.SocketService.getChatRoomUser(id);

    this.SocketService.setChatRoomUsers().subscribe(
      (response) => {
        this.chatRoomUserList = response;
        this.userInfo.isIn = this.isIn(this.userInfo.userId)
      },
      (err) => {
        console.log('Error while setting user list for ChatRoom')
      }
    )
  }
  public chatRoomSelectedToChat: any = (id, name) => {
    // setting that user to chatting true
    this.SocketService.getChatRoomUser(id);
    this.setChatRoomUsers(id);
    this.chatRoomList.map((chatRoom) => {
      if (chatRoom.chatRoomId == id) {
        chatRoom.chatting = true;
        this.roomTitle = chatRoom.title;
        this.roomDescription = chatRoom.description;
      }
      else {
        chatRoom.chatting = false;
      }
    })

    this.selectedChatRoomId = id;

    this.messageList = [];

    this.pageValue = 0;

    this.getPreviousChatInChatRoom();
    this.getLiveChat();
    this.typingSomeone(this.selectedChatRoomId);
  } // end userBtnClick function


  public sendMessage: any = () => {
    if (this.userInfo.isIn) {
      if (this.messageText) {
        let chatMsgObject = {
          senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
          senderId: this.userInfo.userId,
          chatRoomId: this.selectedChatRoomId,
          message: this.messageText,
          createdOn: new Date()
        }//chatMsgObject
        this.SocketService.SendChatMessage(chatMsgObject)
        this.pushToChatWindow(chatMsgObject)
      }
      else {
        this.toastr.warning('text message not be empty')
      }
    } else {
      this.toastr.warning('You must join this room to send msg')
    }
  }//sendMessage end

  public pushToChatWindow: any = (data) => {
    this.messageText = "";
    this.messageList.push(data);
    this.scrollToChatTop = false;

  }//pushToChatWindow

  public logout: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          Cookie.delete('authtoken');

          Cookie.delete('receiverId');

          Cookie.delete('receiverName');

          this.SocketService.exitSocket()

          this.router.navigate(['/']);

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')


      });

  } // end logout

  // handle the output from a child component 

  public showUserName = (name: string) => {

    this.toastr.success("You are chatting with " + name)

  }

  public getAllChatRoom = () => {
    this.SocketService.chatRooms().subscribe(
      (response) => {
        this.chatRoomList = response['data'];
      },
      (err) => {
        this.toastr.error(err, 'errorwhile fetching chatRoom')
      }
    )
  }

  public createRoom = () => {
    if (this.roomDescription == "" || this.roomDescription == "") {
      this.toastr.error('Title or description missing');
    } else {
      let chatRoomData = {
        'title': this.roomTitle,
        'description': this.roomDescription
      }
      this.SocketService.saveChatRoom(chatRoomData);
      this.getAllChatRoom();
    }
  }

  public editRoom = () => {
    let chatRoomData = {
      'chatRoomId': this.selectedChatRoomId,
      'title': this.roomTitle,
      'description': this.roomDescription
    }
    this.SocketService.editChatRoom(chatRoomData);
    this.getAllChatRoom();
  }

  public deleteRoom = () => {
    let chatRoomData = {
      'chatRoomId': this.selectedChatRoomId,
      'title': this.roomTitle,
      'description': this.roomDescription
    }
    this.SocketService.deleteChatRoom(chatRoomData);
    this.selectedChatRoomId = "";
    this.roomDescription = "";
    this.roomTitle = "";
    this.getAllChatRoom();
  }

  public joinRoom() {

    let chatRoomData = {
      chatRoomId: this.selectedChatRoomId,
      userId: this.userInfo.userId,
      firstName: this.userInfo.firstName
    }
    this.SocketService.joinChatRoom(chatRoomData);
    this.userInfo.isIn = true;
    this.setChatRoomUsers(this.selectedChatRoomId);
  }

  public leaveRoom() {
    let chatRoomData = {
      chatRoomId: this.selectedChatRoomId,
      userId: this.userInfo.userId,
    }
    this.SocketService.leaveChatRoom(chatRoomData);
    this.userInfo.isIn = false;
    this.setChatRoomUsers(this.selectedChatRoomId);
  }

  public isIn = (id) => {
    for (let x in this.chatRoomUserList) {
      if (x === id) {
        this.temp = "leave";
        return true;
      }
    }
    this.temp = "join";
    return false;
  }

  public toggle = ()=>{
    if(this.temp == "join"){
      this.joinRoom();
      this.temp = "leave";
    }else if(this.temp == "leave"){
      this.leaveRoom();
      this.temp = "join";
    }
  }
  public sendMessageUsingKeypress: any = (event: any) => {
    if (event.keyCode === 13) { // 13 is key code of enter
      this.sendMessage();
    }

    if (event.keyCode) {
      let chatData = {
        chatRoomId: this.selectedChatRoomId,
        userId: this.userInfo.userId,
        name: this.userInfo.firstName
      }
      this.SocketService.typingEvent(chatData);
    }
  }//sendMessageUsingKeypress



  public typingSomeone = (data) => {
    this.SocketService.whoIsTyping(data).subscribe(
      (response) => {
        if (this.userInfo.userId != response.userId && this.selectedChatRoomId == response.chatRoomId) {
          this.typingName = response.name;
          setTimeout(() => {
            this.typingName = "";
          }, 1000)
        }
      },
      (err) => {
        console.log('err in TypingSomeOne')
      }
    )
  }

}// class end

