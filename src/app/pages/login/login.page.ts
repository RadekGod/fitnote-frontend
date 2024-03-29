import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../../commons/models/user.model";
import {UserService} from "../../commons/services/user/user.service";
import {Language} from "../../configuration/translations/language";
import {TranslationConfiguration} from "../../configuration/translations/translation-configuration";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  languageOptions = this.translationConfiguration.languageOptions;
  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  constructor(private loginService: LoginService,
              private router: Router, private formBuilder: FormBuilder,
              private translationConfiguration: TranslationConfiguration) {
  }

  ngOnInit(): void {

  }

  changeLanguage(language: string) {
    this.translationConfiguration.changeLanguage(language as Language);
  }

  validateUser(loginForm: FormGroup) {
      // this.router.navigate(['tabs', 'body']);
    // this.router.navigate(['tabs', 'training-plans']);
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
