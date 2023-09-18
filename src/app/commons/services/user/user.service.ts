import { Injectable } from '@angular/core';
import {User} from "../../models/user.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userDetailsChange = new Subject<void>();

  constructor() { }

  saveUserDetailsInSession(userDetails: User) {
    window.sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    this.notifyAboutUserDetailsChange();
  }

  private notifyAboutUserDetailsChange(): void {
    this.userDetailsChange.next();
  }

  getUserDetailsFromSession() {
    return JSON.parse(window.sessionStorage.getItem('userDetails')!) as User;
  }
  deleteUserDetailsAndJWTFromSession() {
    window.sessionStorage.setItem("userDetails","");
    window.sessionStorage.setItem("Authorization","");
    // this.notifyAboutUserDetailsChange();
  }
}
