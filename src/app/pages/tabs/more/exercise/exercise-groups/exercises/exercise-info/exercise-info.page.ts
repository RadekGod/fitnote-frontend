import { Component, OnInit } from '@angular/core';
import {UrlService} from "../../../../../../../commons/services/url/url.service";

@Component({
  selector: 'app-exercise-info',
  templateUrl: './exercise-info.page.html',
  styleUrls: ['./exercise-info.page.scss'],
})
export class ExerciseInfoPage implements OnInit {

  previousUrl: string = '';
  segmentValue: string = 'description';
  constructor(private urlService: UrlService) { }
  ngOnInit(){
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }


  changeSegmentValue(value: string) {
    this.segmentValue = value;
  }
}
