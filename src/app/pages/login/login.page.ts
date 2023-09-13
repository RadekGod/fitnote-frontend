import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {User} from "../../commons/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userDetails = new User();

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  validateUser(loginForm: FormGroup) {
    console.log(loginForm);
      // this.router.navigate(['tabs', 'body']);
    this.loginService.validateLoginDetails(loginForm.value).subscribe(responseData => {
      console.log('responseData', responseData);
      window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
      this.userDetails = <any>responseData.body;
      this.userDetails.authenticated = true;
      window.sessionStorage.setItem("userDetails", JSON.stringify(this.userDetails));
      this.router.navigate(['tabs', 'plans']);
    });
  }

}
