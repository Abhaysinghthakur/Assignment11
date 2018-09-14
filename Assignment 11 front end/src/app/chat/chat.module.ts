import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
// ROUTER IMPORTING
import { RouterModule, Routes } from '@angular/router';
//TOASTR IMPORTING
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//SHARED MODULE
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from '../shared/user-details/user-details.component';
import { RemoveSpecialCharPipe } from './../shared/pipe/remove-special-char.pipe';
import { CreateRoomComponent } from './create-room/create-room.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forChild([
      {path:'chat', component:ChatBoxComponent},
      {path:'createRoom',component:CreateRoomComponent}
    ]),
    SharedModule
  ],
  declarations: [ChatBoxComponent,RemoveSpecialCharPipe,CreateRoomComponent]
})
export class ChatModule { }
