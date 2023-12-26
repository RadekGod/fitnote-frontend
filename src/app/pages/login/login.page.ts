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

  incorrectFormData: boolean = false;
  languageOptions = this.translationConfiguration.languageOptions;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(private loginService: LoginService,
              private userService: UserService,
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

    if (loginForm.valid) {
      this.loginService.loginUser(loginForm.value).subscribe((response) => {
          this.incorrectFormData = false;

          window.sessionStorage.setItem('Authorization', response.headers.get('Authorization')!);

          let userDetails: User;
          userDetails = <User>response.body;
          userDetails.authenticated = true;
          this.userService.saveUserDetailsInSession(userDetails);
          this.router.navigate(['tabs', 'training-plans']);
        },
        (error) => {
          this.incorrectFormData = true;
        });
    }
  }
}
