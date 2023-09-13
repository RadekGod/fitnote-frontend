import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit  {



  constructor(private router : Router) {
  }

  ngOnInit(): void {
  }


  logout() {
    window.sessionStorage.setItem("userDetails","");
    window.sessionStorage.setItem("Authorization","");
    this.router.navigate(['/login']);
  }

}
