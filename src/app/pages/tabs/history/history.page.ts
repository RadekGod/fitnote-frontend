import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../commons/services/user/user.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(private router : Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.deleteUserDetailsAndJWTFromSession();
    this.router.navigate(['/login']);
  }

}
