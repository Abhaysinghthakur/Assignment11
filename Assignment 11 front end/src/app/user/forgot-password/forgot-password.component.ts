import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email:String;

  constructor(private appService:AppService,private toaster:ToastrService) { }

  ngOnInit() {
  }


  public sendResetMail = () =>{
    console.log(this.email)
    this.appService.resetMail(this.email).subscribe(
      (response)=>{
        console.log(response)
        if(response['status']==200){
          this.toaster.success('reset link send to your mail')
        }else{
          this.toaster.error('some error occures')
        }
      },
      (err)=>{
        this.toaster.error(err.errorMessage)
      }
    )
  }
}
