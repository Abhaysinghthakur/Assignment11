import { Component, OnInit } from '@angular/core';
//ROUTER IMPORTING
import { Router } from '@angular/router'
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';
//FORM
import { FormsModule } from '@angular/forms';
//Http SERVICE IMPORTING
import { AppService } from './../../app.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;

  constructor(    private toastr: ToastrService,
    private appService: AppService,
    private router: Router){}

  ngOnInit() {
  }

  public goToSignIn: any = () => {
    this.router.navigate(['/']);
  }//goToSignIn end here

  public signupFunction: any = ()=> {
    if (!this.firstName) {
      this.toastr.warning('Enter first Name')
    } else if (!this.lastName) {
      this.toastr.warning('Enter Last Name')
    } else if (!this.mobile) {
      this.toastr.warning('Enter Mobile No')
    } else if (!this.email) {
      this.toastr.warning('Enter Email')
    } else if (!this.password) {
      this.toastr.warning('Enter Password')
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password
      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup Successful');

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);
          } else {
            this.toastr.error(apiResponse.message);
          }
        }, (err) => {
          console.log(err.message+','+err)
          this.toastr.error('Some error occured');
        });
    }
  }//signupFunction end here

}
