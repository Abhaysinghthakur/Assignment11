import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//FORM
import {FormsModule} from '@angular/forms';
// ROUTER IMPORTING
import { RouterModule, Routes } from '@angular/router';
//TOASTR IMPORTING
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResetComponent } from './reset/reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forChild([
      {path:'sign-up', component:SignupComponent},
      {path:'resetPassword/:userId',component:ResetComponent},
      {path:'forgotPassword',component:ForgotPasswordComponent}
    ])
  ],
  declarations: [LoginComponent, SignupComponent, ResetComponent,ForgotPasswordComponent]
})
export class UserModule { }
