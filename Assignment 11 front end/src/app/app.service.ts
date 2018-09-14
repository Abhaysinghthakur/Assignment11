import { Injectable } from '@angular/core';
//OBSERVABLE IMPORTING
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
//TOASTR IMPORTING
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()

export class AppService {
  private url = 'http://localhost:3000';

  constructor(private toastr: ToastrService, public http: HttpClient) {
  }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }// getUserInfoFromLocalStorage end here

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }// setUserInfoFromLocalStorage end here

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/assignment11/users/signup`, params);

  }// signupFunction end 

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/assignment11/users/login`, params);
  }// signinFunction end 

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))

    return this.http.post(`${this.url}/api/assignment11/users/logout`, params);

  } // end logout function

  public resetMail = (email)=>{
    const params = new HttpParams()
    .set('email',email)
    .set('authToken', Cookie.get('authtoken'));
    return this.http.post(`${this.url}/api/assignment11/resetPassword`,params)
  }

  public getUserDetails = (userId)=>{
    return this.http.get(`${this.url}/api/assignment11/users/${userId}?authToken=${Cookie.get('authtoken')}`)
  }

  public updateUser = (email,password)=>{
    const params = new HttpParams()
    .set('email',email)
    .set('password',password);
    return this.http.post(`${this.url}/api/assignment11/users/updateUser`,params)
  }

}//appService class end here
