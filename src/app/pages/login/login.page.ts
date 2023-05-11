import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hasValidAccessToken: boolean;

  constructor(private oauthService: OAuthService) {
    this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
  }

  ngOnInit(): void {
    // this.authService.loadUserProfile();
    // console.log()
    // console.log(this.authService.hasValidAccessToken);
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin()
    // this.authService.login();
  }

}
