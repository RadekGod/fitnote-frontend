import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../commons/services/user/user.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit  {



  constructor(private router : Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }


  logout() {
    this.userService.deleteUserDetailsAndJWTFromSession();
    this.router.navigate(['/login']);
  }

}
