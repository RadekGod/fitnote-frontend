import {Component, OnInit} from '@angular/core';
import {UrlService} from "../../../../../../../commons/services/url/url.service";
import {ExerciseService} from "../../../exercise.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../../../../environments/environment";
import {Exercise} from "../../../../../../../commons/models/exercise.model";
import {ImageService} from "../../../../../../../commons/services/file/image.service";

@Component({
  selector: 'app-exercise-info',
  templateUrl: './exercise-info.page.html',
  styleUrls: ['./exercise-info.page.scss'],
})
export class ExerciseInfoPage implements OnInit {

  previousUrl: string = '';
  segmentValue: string = 'description';
  exercise?: Exercise;
  exerciseCategories?: string;

  constructor(private urlService: UrlService,
              private route: ActivatedRoute,
              private imageService: ImageService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
    this.fetchExercise();
  }

  fetchExercise() {
    let exerciseId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseService.getExercise(exerciseId).subscribe(async response => {
      console.log(response);
      this.exercise = {
        ...response,
        image: response.applicationFile ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, response.applicationFile) : undefined
      };
      this.exerciseCategories = response.exerciseCategoryGroups.map(category => category.categoryName).join(', ');
    });
  }


  changeSegmentValue(value: string) {
    this.segmentValue = value;
  }
}
