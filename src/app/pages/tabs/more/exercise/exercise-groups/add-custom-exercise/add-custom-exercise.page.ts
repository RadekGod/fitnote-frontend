import { Component, OnInit } from '@angular/core';
import {UrlService} from "../../../../../../commons/services/url/url.service";

@Component({
  selector: 'app-add-custom-exercise',
  templateUrl: './add-custom-exercise.page.html',
  styleUrls: ['./add-custom-exercise.page.scss'],
})
export class AddCustomExercisePage implements OnInit {

  previousUrl: string = '';
  constructor(private urlService: UrlService) { }
  ngOnInit(){
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }

}
