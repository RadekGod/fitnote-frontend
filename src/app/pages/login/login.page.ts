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

  constructor(private authService: AuthService, private oauth: OAuthService) {
    this.hasValidAccessToken = this.authService.hasValidAccessToken;
  }

  ngOnInit(): void {
    this.authService.loadUserProfile();
    // console.log()
    console.log(this.authService.hasValidAccessToken);
  }

  login() {
    // this.oauth.initImplicitFlow();
    this.authService.login();
  }

}
