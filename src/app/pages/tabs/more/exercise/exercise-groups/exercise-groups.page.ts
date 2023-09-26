import { Component, OnInit } from '@angular/core';
import {UrlService} from "../../../../../commons/services/url/url.service";

@Component({
  selector: 'app-exercise-groups',
  templateUrl: './exercise-groups.page.html',
  styleUrls: ['./exercise-groups.page.scss'],
})
export class ExerciseGroupsPage implements OnInit {

  previousUrl: string = '';
  constructor(private urlService: UrlService) { }
  ngOnInit(){
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }
}
