import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../../commons/models/user.model";
import {UserService} from "../../commons/services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(private loginService: LoginService,
              private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  validateUser(loginForm: FormGroup) {
    console.log(loginForm);
      // this.router.navigate(['tabs', 'body']);
    //TODO przeanalizować  i poprawić sposob zapisywania userDetails
    this.loginService.loginUser(loginForm.value);
      // .subscribe(() => {
      // let userDetails: User;
      // window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
      //
      //
      // userDetails = <User>responseData.body;
      // userDetails.authenticated = true;
      // this.userService.saveUserDetailsInSession(userDetails);

      // window.sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      // this.router.navigate(['tabs', 'plans']);
    // });
  }

}
