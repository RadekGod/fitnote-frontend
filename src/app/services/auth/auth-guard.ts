import { Injectable } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      this.oauthService.initLoginFlow();
      return false;
    }
  }
}
