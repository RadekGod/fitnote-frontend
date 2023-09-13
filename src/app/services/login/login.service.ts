import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../commons/models/user.model";
import {AppConstants} from "../../parameters/app.constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  validateLoginDetails(loginForm: User) {
    console.log('loginForm: ', loginForm);
    window.sessionStorage.setItem("userDetails",JSON.stringify(loginForm));
    return this.http.get<User>(environment.rooturl + AppConstants.LOGIN_API_URL, { observe: 'response', withCredentials: true });
  }
}
