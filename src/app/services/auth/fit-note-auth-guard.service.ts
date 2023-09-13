import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../../commons/models/user.model";


@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
  user = new User();

  constructor(private router: Router){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if(sessionStorage.getItem('userDetails')){
      this.user = JSON.parse(sessionStorage.getItem('userDetails')!);
    }
    if(!this.user){
      this.router.navigate(['login']);
    }
    return !!this.user;
  }
}
