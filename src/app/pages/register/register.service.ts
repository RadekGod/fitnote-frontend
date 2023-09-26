import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateUser} from "../../commons/models/user.model";
import {environment} from "../../../environments/environment";
import {AppConstants} from "../../configuration/app.constants";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {

  }

  registerUser(registerForm: CreateUser) {
    console.log('registerForm: ', registerForm);
    // window.sessionStorage.setItem("userDetails",JSON.stringify(registerForm));
    return this.httpClient.post(environment.rootUrl + AppConstants.REGISTER_API_URL, registerForm, { observe: 'response' });
  }
}
