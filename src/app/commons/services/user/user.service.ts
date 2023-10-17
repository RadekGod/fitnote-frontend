import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserSettings} from "../../models/user-settings.model";
import {environment} from "../../../../environments/environment";
import {AppConstants} from "../../../configuration/app.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userDetailsChange = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  saveUserDetailsInSession(userDetails: User) {
    window.sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    this.notifyAboutUserDetailsChange();
  }

  private notifyAboutUserDetailsChange(): void {
    this.userDetailsChange.next();
  }

  getUserDetailsFromSession(): User {
    return JSON.parse(window.sessionStorage.getItem('userDetails')!) as User;
  }
  deleteUserDetailsAndJWTFromSession() {
    window.sessionStorage.setItem("userDetails","");
    window.sessionStorage.setItem("Authorization","");
    // this.notifyAboutUserDetailsChange();
  }

  updateUser(userSettings: UserSettings) {
    return this.httpClient.put(environment.rootUrl + AppConstants.USER_SETTINGS_API_URL, userSettings, { withCredentials:true });
  }
}
