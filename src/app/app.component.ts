import {Component} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./parameters/auth-config";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userProfile: any;
  public hasValidAccessToken = false;
  public realmRoles: string[] = [];


  constructor(private authService: AuthService, private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();


    this.oauthService.loadDiscoveryDocument()
      .then(() => {
        if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
          this.authService.loadUserRoles();
        } else {
          this.oauthService.tryLoginCodeFlow().then(() => {
            if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
              this.authService.loadUserRoles();
            }
          });
        }
      });
  }

  ngOnInit(): void {
  }

}
