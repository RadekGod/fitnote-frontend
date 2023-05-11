import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
})
export class DietPage implements OnInit {

  userProfile: any;
  hasValidAccessToken: boolean;

  constructor(private authService: AuthService) {
    this.userProfile = this.authService._userProfile;
    this.hasValidAccessToken = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('Diet realmRoles', this.authService.realmRoles);
    console.log('Diet hasValidAccessToken', this.hasValidAccessToken);
  }

}
