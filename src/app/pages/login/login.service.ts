import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../commons/models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../../commons/services/user/user.service";
import {AppConstants} from "../../configuration/app.constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {

  }

  loginUser(loginForm: User) {
    window.sessionStorage.setItem('userDetails',JSON.stringify(loginForm));
    return this.http.get<User>(environment.rootUrl + AppConstants.LOGIN_API_URL, { observe: 'response', withCredentials: true });
  }
}
