import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {CanMatchFn} from "@angular/router";
import {FitNoteUserRole} from "../../models/user-roles";



export function authenticationGuard(requiredRoles: FitNoteUserRole[]): CanMatchFn {
  return () => {
    const authService: AuthService = inject(AuthService);

    console.log('isAuthenticated', authService.isLoggedIn());

    if (authService.isLoggedIn()) {
      console.log('this.authService.realmRoles', authService.userRoles);

      if (requiredRoles.length === 0) {
        console.log('No permissions required');
        return true;
      }
    } else {
      authService.login();
    }
    console.log('Required permissions: ', requiredRoles);
    const userRoles = authService.userRoles;
    console.log('User permissions: ', userRoles);
    console.log('Czy wystarczające uprawnienia: ', requiredRoles.some((role) => userRoles.includes(role)))
    return requiredRoles.some((permission) => userRoles.includes(permission));
  };
}
export const canMatch = (requiredRoles: FitNoteUserRole[], permissionService = inject(FitNoteAuthGuard)) => {
  permissionService.isAccessAllowed(requiredRoles);
}
@Injectable({
  providedIn: 'root'
})
export class FitNoteAuthGuard {

  constructor(private authService: AuthService) {

  }

  public isAccessAllowed(requiredRoles: FitNoteUserRole[]): boolean {
    console.log('isAuthenticated', this.authService.isLoggedIn());

    if (this.authService.isLoggedIn()) {
      console.log('this.authService.realmRoles', this.authService.userRoles);

      if (requiredRoles.length === 0) {
        console.log('No permissions required');
        return true;
      }
    } else {
      this.authService.login();
    }
    console.log('Required permissions: ', requiredRoles);
    const userRoles = this.authService.userRoles;
    console.log('User permissions: ', userRoles);
    console.log('Czy wystarczające uprawnienia: ', requiredRoles.some((role) => userRoles.includes(role)))
    return false;
    // return requiredPermissions.some((permission) => userRoles.includes(permission));
  }
}
