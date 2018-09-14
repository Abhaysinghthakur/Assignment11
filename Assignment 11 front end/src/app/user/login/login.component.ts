import { Component, OnInit } from '@angular/core';
//ROUTER IMPORTING
import { Router } from '@angular/router'
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';
//FORM
import { FormsModule } from '@angular/forms';
//Http SERVICE IMPORTING
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: any;
  private password: any;
  constructor(private router:Router, private appService: AppService, private toastr:ToastrService) { }

  ngOnInit() {
  }

  public goToSignUp: any = ()=>{
    this.router.navigate(['/sign-up']);
  }//goToSignIn

  public signinFunction: any = ()=>{
    if(!this.email){
      this.toastr.warning("Enter the email");
    }else if(!this.password){
      this.toastr.warning("Enter the password");
    }else{
      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signinFunction(data)
      .subscribe((apiResponse) =>{
        if(apiResponse.status ===200){
          console.log(apiResponse)
          //setting the cokies here 
          Cookie.set('authtoken', apiResponse.data.authToken);
          Cookie.set('receiverId', apiResponse.data.userDetails.userId);
          Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
          this.toastr.success(apiResponse.message,'Login Sucessful')
          this.router.navigate(['/chat'])
        } else{
          this.toastr.error(apiResponse.message)
        }
      },(err)=>{
        if(err.status===500){
        this.toastr.error('Invalid Password');
        }
      })

    }
  }//signInFunction end here

  public forgotPasswordFunction = () =>{
    this.router.navigate(['/forgotPassword'])
  }
}
 