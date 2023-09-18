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

  constructor(private http: HttpClient, private router: Router,
              private userService: UserService) {

  }

  loginUser(loginForm: User) {
    console.log('loginForm: ', loginForm);
    window.sessionStorage.setItem('userDetails',JSON.stringify(loginForm));
    return this.http.get<User>(environment.rooturl + AppConstants.LOGIN_API_URL, { observe: 'response', withCredentials: true })
      .subscribe(responseData => {
        window.sessionStorage.setItem('Authorization', responseData.headers.get('Authorization')!);

        let userDetails: User;
        userDetails = <User>responseData.body;
        userDetails.authenticated = true;
        this.userService.saveUserDetailsInSession(userDetails);
        this.router.navigate(['tabs', 'plans']);
      });
  }
}
