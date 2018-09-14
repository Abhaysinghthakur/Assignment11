import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// ROUTER IMPORTING
import {RouterModule, Routes} from '@angular/router';
//MODULES CREATED
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { LoginComponent } from './user/login/login.component';
//TOASTR IMPORTING
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//SERVICE COMPONENT
import { AppService } from 'src/app/app.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatModule,
    UserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
      {path:'login', component:LoginComponent, pathMatch:'full'},
      {path:'', component:LoginComponent},
      {path:'*', component:LoginComponent},
      {path:'**', component:LoginComponent}
    ])

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
