import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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
  formFailedValidation: boolean = false;

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')!.value;
    let confirmPassword = group.get('repeatPassword')!.value
    return password === confirmPassword ? null : {notSame: true}
  }

  registerForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  }, {validators: this.checkPasswords});

  constructor(private registerService: RegisterService, private router: Router, private formBuilder: FormBuilder,
              private translationConfiguration: TranslationConfiguration) {

  }

  ngOnInit(): void {

  }

  validateFormAndRegisterUser(registerForm: FormGroup) {
    if (registerForm.valid) {
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
    } else {
      this.formFailedValidation = true;
    }
  }

  changeLanguage(language: string) {
    this.translationConfiguration.changeLanguage(language as Language);
  }

}
