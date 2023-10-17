import {Component, OnInit} from '@angular/core';
import {User} from "../../commons/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";
import {TranslationConfiguration} from "../../configuration/translations/translation-configuration";
import {Language} from "../../configuration/translations/language";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  languageOptions = this.translationConfiguration.languageOptions;

  registerForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  });

  constructor(private registerService: RegisterService, private router: Router, private formBuilder: FormBuilder,
              private translationConfiguration: TranslationConfiguration) {

  }

  ngOnInit(): void {

  }

  registerUser(registerForm: FormGroup) {
    this.registerService.registerUser(registerForm.value).subscribe(responseData => {
      console.log('responseData', responseData);
      // window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
      // this.model = <any>responseData.body;
      // this.model.authStatus = 'AUTH';
      // window.sessionStorage.setItem("userDetails", JSON.stringify(this.model));
      // let xsrf = responseData.headers.get('XSRF-TOKEN')!;
      // window.sessionStorage.setItem("XSRF-TOKEN", xsrf);
      // this.router.navigate(['tabs', 'plans']);
    });
  }

  changeLanguage(language: string) {
    this.translationConfiguration.changeLanguage(language as Language);
  }

}
