import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {authConfig} from "../../parameters/auth-config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _userProfile: any;
  public _realmRoles: string[] = [];

  constructor(private oauthService: OAuthService, private router: Router) {
    // this.configureAuthForWeb();
    console.log('test');
  }

  ngOnInit(): void {

  }

  initializeAuth() {
      this.oauthService.configure(authConfig);
      this.oauthService.setupAutomaticSilentRefresh();
      this.oauthService.setStorage(sessionStorage);
      this.oauthService.loadDiscoveryDocumentAndLogin().then(tryLoginResult => {
        console.log("AuthService tryLogin", tryLoginResult);
        console.log("AuthService hasValidAccessToken", this.oauthService.hasValidAccessToken());
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
          // this.loadUserProfile();
          // this._realmRoles = this.getRealmRoles();
          // console.log("realmRoles", this._realmRoles);
          // console.log("AccessToken", this.oauthService.getAccessToken());
        } else {
          //Do usunięcia jeśli chcę widzieć własną stronę logowania
          this.oauthService.initCodeFlow();
          return Promise.resolve();
        }
      }).catch(error => {
          console.error("loadDiscoveryDocument", error);
        });

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
        // console.log("revokeTokenAndLogout", revokeTokenAndLogoutResult);
        this._userProfile = null;
        this._realmRoles = [];
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
        this._userProfile = loadUserProfileResult;
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
    // console.log('idClaims', idClaims);
    if (!idClaims) {
      console.error("Couldn't get identity claims, make sure the user is signed in.")
      return [];
    }
    if (!idClaims.hasOwnProperty("realm_access")) {
      console.error("Keycloak didn't provide realm_roles in the token. Have you configured the predefined mapper realm roles correct?")
      return [];
    }

    let realmRoles = idClaims['realm_access']['roles'];
    return realmRoles ?? [];
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get userProfile() {
    return this._userProfile;
  }

  get realmRoles() {
    return this._realmRoles;
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }
}
