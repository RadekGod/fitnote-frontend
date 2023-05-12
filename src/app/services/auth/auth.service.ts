import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {authConfig} from "../../parameters/auth-config";
import jwt_decode from "jwt-decode";
import {FitNoteUserRole} from "../../models/user-roles";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _userProfile: any;
  public _userRoles: FitNoteUserRole[] = [];

  constructor(private oauthService: OAuthService, private router: Router) {
    // this.configureAuthForWeb();
    console.log('test');
  }

  ngOnInit(): void {

  }
//poniższy kod przenosi od razu do keycloaka
  // initializeAuth() {
  //     this.oauthService.configure(authConfig);
  //     this.oauthService.setupAutomaticSilentRefresh();
  //     this.oauthService.setStorage(sessionStorage);
  //     this.oauthService.loadDiscoveryDocumentAndLogin().then(tryLoginResult => {
  //       console.log("AuthService tryLogin", tryLoginResult);
  //       console.log("AuthService hasValidAccessToken", this.oauthService.hasValidAccessToken());
  //       if (this.oauthService.hasValidAccessToken()) {
  //         return Promise.resolve();
  //         // this.loadUserProfile();
  //         // this._realmRoles = this.getRealmRoles();
  //         // console.log("realmRoles", this._realmRoles);
  //         // console.log("AccessToken", this.oauthService.getAccessToken());
  //       } else {
  //         //Do usunięcia jeśli chcę widzieć własną stronę logowania
  //         this.oauthService.initCodeFlow();
  //         return Promise.resolve();
  //       }
  //     }).catch(error => {
  //         console.error("loadDiscoveryDocument", error);
  //       });
  //
  // }

  //poniższy kod pozwala wyświetlić stronę home
  initializeAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.setStorage(sessionStorage);

      /**
       * Load discovery document when the app inits
       */
      this.oauthService.loadDiscoveryDocument()
        .then(loadDiscoveryDocumentResult => {
          console.log("loadDiscoveryDocument", loadDiscoveryDocumentResult);
          if (!this.oauthService.hasValidAccessToken()) {
            /**
             * Do we have a valid access token? -> User does not need to log in
             */


            /**
             * Always call tryLogin after the app and discovery document loaded, because we could come back from Keycloak login page.
             * The library needs this as a trigger to parse the query parameters we got from Keycloak.
             */
            console.log('LOAD DISCOVERY DOCUMENT this.oauthService.hasValidAccessToken()', this.oauthService.hasValidAccessToken());
            this.oauthService.tryLogin().then(tryLoginResult => {
              console.log("tryLogin", tryLoginResult);
              if (this.oauthService.hasValidAccessToken()) {
                this.loadUserProfile();
                this.loadUserRoles();
                console.log("realmRoles", this.userRoles);
                console.log("AccessToken", this.oauthService.getAccessToken());
              }
            }).catch(error => {
              console.log('USER IS ALREADY LOGGED IN');
            });
          } else {
            this.loadUserProfile();
            this.loadUserRoles();
          }
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
      })
  }

  /**
   * Calls the library loadDiscoveryDocumentAndLogin() method.
   */
  public login(): void {
    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(loadDiscoveryDocumentAndLoginResult => {
        console.log("loadDiscoveryDocumentAndLogin", loadDiscoveryDocumentAndLoginResult);
        if (this.oauthService.hasValidAccessToken()) {
          this.loadUserProfile();
          this.loadUserRoles();
        }
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
        this._userRoles = [];
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
  public loadUserRoles(): void {
    const accessToken = jwt_decode<any>(this.oauthService.getAccessToken());
    console.log('decoded accessToken', accessToken);
    this._userRoles = accessToken['realm_access']['roles'];
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  isAdmin(): boolean {
    return this.userRoles.includes(FitNoteUserRole.ADMIN);
  }

  isStandardUser(): boolean {
    return this.userRoles.includes(FitNoteUserRole.STANDARD_USER);
  }

  get userProfile() {
    return this._userProfile;
  }

  get userRoles() {
    return this._userRoles;
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }
}
