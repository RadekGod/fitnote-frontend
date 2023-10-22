import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../commons/services/user/user.service";

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {


  constructor(private router : Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.deleteUserDetailsAndJWTFromSession();
    this.router.navigate(['/login']);
  }
}
