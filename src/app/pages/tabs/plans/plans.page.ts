import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  userProfile: any;
  realmRoles: any;
  hasValidAccessToken: boolean;

  constructor(private authService: AuthService) {
    this.userProfile = this.authService.userProfile;
    this.realmRoles = this.authService.realmRoles;
    this.hasValidAccessToken = this.authService.hasValidAccessToken;
    console.log(this.userProfile);
    console.log(this.realmRoles);
    console.log(this.hasValidAccessToken);
  }

  ngOnInit(): void {

  }


  logout() {
    this.authService.logout();
  }

}
