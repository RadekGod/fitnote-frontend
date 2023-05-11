import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-login',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePage implements OnInit {

  hasValidAccessToken: boolean;

  constructor(private authService: AuthService) {
    this.hasValidAccessToken = this.authService.isLoggedIn();
    console.log('this.hasValidAccessToken', this.hasValidAccessToken);
  }

  ngOnInit(): void {
    console.log('realmRoles', this.authService.realmRoles);
    console.log(this.authService.isLoggedIn());
  }

  login() {
    this.authService.login();
  }

}
