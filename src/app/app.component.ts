import {Component} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userProfile: any;
  public hasValidAccessToken = false;
  public realmRoles: string[] = [];


  constructor(private authService: AuthService, private router: Router) {
    this.authService.initializeAuth();
  }

  ngOnInit(): void {
  }

}
