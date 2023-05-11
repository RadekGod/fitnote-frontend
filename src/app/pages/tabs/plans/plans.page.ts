import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  userProfile: any;
  hasValidAccessToken: boolean;

  constructor(private oauthService: OAuthService) {
    this.userProfile = this.oauthService.loadUserProfile();
    this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
  }

  ngOnInit(): void {

  }


  logout() {
    this.oauthService.revokeTokenAndLogout()
      .then(revokeTokenAndLogoutResult => {
        console.log("revokeTokenAndLogout", revokeTokenAndLogoutResult);
        this.userProfile = null;
      })
      .catch(error => {
        console.error("revokeTokenAndLogout", error);
      });
  }

}
