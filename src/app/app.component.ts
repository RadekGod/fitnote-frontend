import {Component} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {filter} from "rxjs";
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


  constructor(private oauthService: OAuthService, private router: Router) {
      this.configureWeb();
  }

  ngOnInit(): void {
    /**
     * Load discovery document when the app inits
     */
    this.oauthService.loadDiscoveryDocument()
      .then(loadDiscoveryDocumentResult => {
        console.log("loadDiscoveryDocument", loadDiscoveryDocumentResult);

        /**
         * Do we have a valid access token? -> User does not need to log in
         */

        this.hasValidAccessToken = this.oauthService.hasValidAccessToken();

        /**
         * Always call tryLogin after the app and discovery document loaded, because we could come back from Keycloak login page.
         * The library needs this as a trigger to parse the query parameters we got from Keycloak.
         */
        this.oauthService.tryLogin().then(tryLoginResult => {
          console.log("tryLogin", tryLoginResult);
          console.log("hasValidAccessToken", this.hasValidAccessToken);
          if (this.hasValidAccessToken){
            this.loadUserProfile();
            this.realmRoles = this.getRealmRoles();
            console.log("realmRoles", this.realmRoles);
            console.log("AccessToken", this.oauthService.getAccessToken());
          }
        });

      })
      .catch(error => {
        console.error("loadDiscoveryDocument", error);
      });

    /**
     * The library offers a bunch of events.
     * It would be better to filter out the events which are unrelated to access token - trying to keep this example small.
     */
    this.oauthService.events.subscribe(eventResult => {
      console.debug("LibEvent", eventResult);
      this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
    })
  }

  /**
   * Calls the library loadDiscoveryDocumentAndLogin() method.
   */
  public login(): void {
    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(loadDiscoveryDocumentAndLoginResult => {
        console.log("loadDiscoveryDocumentAndLogin", loadDiscoveryDocumentAndLoginResult);
      })
      .catch(error => {
        console.error("loadDiscoveryDocumentAndLogin", error);
      });
  }

  /**
   * Calls the library revokeTokenAndLogout() method.
   */
  public logout(): void {
    this.oauthService.revokeTokenAndLogout()
      .then(revokeTokenAndLogoutResult => {
        console.log("revokeTokenAndLogout", revokeTokenAndLogoutResult);
        this.userProfile = null;
        this.realmRoles = [];
      })
      .catch(error => {
        console.error("revokeTokenAndLogout", error);
      });
  }

  /**
   * Calls the library loadUserProfile() method and sets the result in this.userProfile.
   */
  public loadUserProfile(): void {
    this.oauthService.loadUserProfile()
      .then(loadUserProfileResult => {
        console.log("loadUserProfile", loadUserProfileResult);
        this.userProfile = loadUserProfileResult;
      })
      .catch(error => {
        console.error("loadUserProfile", error);
      });
  }

  /**
   *  Use this method only when an id token is available.
   *  This requires a specific mapper setup in Keycloak. (See README file)
   *
   *  Parses realm roles from identity claims.
   */
  public getRealmRoles(): string[] {
    let idClaims = this.oauthService.getIdentityClaims()
    console.log('idClaims', idClaims);
    if (!idClaims){
      console.error("Couldn't get identity claims, make sure the user is signed in.")
      return [];
    }
    if (!idClaims.hasOwnProperty("realm_access")){
      console.error("Keycloak didn't provide realm_roles in the token. Have you configured the predefined mapper realm roles correct?")
      return [];
    }

    let realmRoles = idClaims['realm_access']['roles'];
    return realmRoles ?? [];
  }


  // public getRealmRoles(): string[] {
  //   let idClaims = this.oauthService.getIdentityClaims()
  //   console.log('idClaims', idClaims);
  //   if (!idClaims){
  //     console.error("Couldn't get identity claims, make sure the user is signed in.")
  //     return [];
  //   }
  //   if (!idClaims.hasOwnProperty("realm_roles")){
  //     console.error("Keycloak didn't provide realm_roles in the token. Have you configured the predefined mapper realm roles correct?")
  //     return [];
  //   }
  //
  //   let realmRoles = idClaims["realm_roles"]
  //   return realmRoles ?? [];
  // }

  /**
   * Configures the app for web deployment
   * @private
   */
  private configureWeb(): void {
    console.log("Using web configuration")
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }
}
