import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {authConfig} from "../../parameters/auth-config";
import jwt_decode from "jwt-decode";
import {FitNoteUserRole} from "../../commons/models/user-roles";
import {options} from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _userRoles: FitNoteUserRole[] = [];

  constructor(private oauthService: OAuthService, private router: Router) {
    console.log('test');
  }

  ngOnInit(): void {

  }

  public login(): void {
    this.oauthService.initCodeFlow();
  }

  public logout(): void {
    this.oauthService.revokeTokenAndLogout()
      .then(() => {
        this._userRoles = [];
      })
      .catch(error => {
        console.error("revokeTokenAndLogout", error);
      });
  }


  public loadUserRoles(): void {
    const accessToken = jwt_decode<any>(this.oauthService.getAccessToken());
    console.log('decoded accessToken', accessToken);
    this._userRoles = accessToken['realm_access']['roles'];
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  isAdmin(): boolean {
    return this.userRoles.includes(FitNoteUserRole.ADMIN);
  }

  isStandardUser(): boolean {
    return this.userRoles.includes(FitNoteUserRole.STANDARD_USER);
  }

  get userRoles() {
    return this._userRoles;
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  get idToken() {
    return this.oauthService.getIdToken();
  }
}
