import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {UserRole} from "../../app-routing.module";
import {CanMatchFn} from "@angular/router";

export const canMatch = (requiredRoles: UserRole[], permissionService = inject(FitNoteAuthGuard)) => {
  permissionService.isAccessAllowed(requiredRoles);
}

export function authenticationGuard(requiredRoles: UserRole[]): CanMatchFn {
  return () => {
    const authService: AuthService = inject(AuthService);

    console.log('isAuthenticated', authService.isLoggedIn());

    if (authService.isLoggedIn()) {
      console.log('this.authService.realmRoles', authService.realmRoles);

      if (requiredRoles.length === 0) {
        console.log('No permissions required');
        return true;
      }
    } else {
      authService.login();
    }
    console.log('Required permissions: ', requiredRoles);
    const userRoles = authService.realmRoles;
    console.log('User permissions: ', userRoles);
    console.log('Czy wystarczające uprawnienia: ', requiredRoles.some((role) => userRoles.includes(role)))
    return requiredRoles.some((permission) => userRoles.includes(permission));
  };
}

@Injectable({
  providedIn: 'root'
})
export class FitNoteAuthGuard {

  constructor(private authService: AuthService) {

  }

  public isAccessAllowed(requiredRoles: UserRole[]): boolean {
    console.log('isAuthenticated', this.authService.isLoggedIn());

    if (this.authService.isLoggedIn()) {
      console.log('this.authService.realmRoles', this.authService.realmRoles);

      if (requiredRoles.length === 0) {
        console.log('No permissions required');
        return true;
      }
    } else {
      this.authService.login();
    }
    console.log('Required permissions: ', requiredRoles);
    const userRoles = this.authService.realmRoles;
    console.log('User permissions: ', userRoles);
    console.log('Czy wystarczające uprawnienia: ', requiredRoles.some((role) => userRoles.includes(role)))
    return false;
    // return requiredPermissions.some((permission) => userRoles.includes(permission));
  }
}
