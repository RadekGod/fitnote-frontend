import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {CanActivateFn, CanMatchFn, Router} from "@angular/router";
import {FitNoteUserRole} from "../../commons/models/user-roles";



export function userRoleGuard(requiredRoles: FitNoteUserRole[]): CanMatchFn {
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


export function loggedInGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    console.log('isAuthenticated', authService.isLoggedIn());

    if (authService.isLoggedIn()) {
        return true;
      } else {
      authService.login();
      return false;
    }
  };
}
