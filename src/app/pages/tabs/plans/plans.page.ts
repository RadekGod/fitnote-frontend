import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit  {

  idToken: string;
  hasValidAccessToken: boolean;
  accessToken: string;

  constructor(private authService: AuthService) {
    this.idToken = this.authService.idToken;
    this.hasValidAccessToken = this.authService.isLoggedIn();
    this.accessToken = this.authService.accessToken;
  }

  ngOnInit(): void {
    console.log('Plans realmRoles', this.authService.userRoles);
    console.log('Plans hasValidAccessToken', this.hasValidAccessToken);
  }

  ionViewWillEnter() {
    console.log('Plans ionViewWillEnter realmRoles', this.authService.userRoles);
    console.log('Plans ionViewWillEnter typeOf realmRoles', this.authService.userRoles);
    console.log('Plans ionViewWillEnter hasValidAccessToken', this.hasValidAccessToken);
  }


  logout() {
    this.authService.logout();
  }

}
