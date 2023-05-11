import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit  {

  userProfile: any;
  hasValidAccessToken: boolean;
  accessToken: string;

  constructor(private authService: AuthService) {
    this.userProfile = this.authService._userProfile;
    this.hasValidAccessToken = this.authService.isLoggedIn();
    this.accessToken = this.authService.accessToken;
  }

  ngOnInit(): void {
    console.log('Plans realmRoles', this.authService.realmRoles);
    console.log('Plans hasValidAccessToken', this.hasValidAccessToken);
  }

  ionViewWillEnter() {
    console.log('Plans ionViewWillEnter realmRoles', this.authService.realmRoles);
    console.log('Plans ionViewWillEnter hasValidAccessToken', this.hasValidAccessToken);
  }


  logout() {
    this.authService.logout();
  }

}
