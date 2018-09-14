import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public email: String;
  public password: String;
  public apiResponse:any;
  constructor(private appService: AppService, private _route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.userDetails();
  }

  public userDetails = () => {
    let userId = this._route.snapshot.paramMap.get('userId');
    this.appService.getUserDetails(userId).subscribe(
      (response) => {
        console.log("here response")
        console.log(response)
        this.email = response['data']['email'];
      },
      (err) => {
        console.log("here error")
        console.log(err.errorMessage)
      }
    )
  }

  public resetPassword = () => {
    this.appService.updateUser(this.email, this.password).subscribe(
      (Response) => {
        if (Response['status'] === 200) {
          console.log(Response)
          //setting the cokies here 
          this.toastr.success('Password reset sucessfully')
          setTimeout(()=>{
            this.router.navigate(['/login'])
          },1000)

        } else {
          this.toastr.error(Response["message"])
        }
      }, (err) => {
        this.toastr.error('some error occured');
      }
    )
  }
}
