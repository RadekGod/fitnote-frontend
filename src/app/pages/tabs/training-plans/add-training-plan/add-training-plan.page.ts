import { Component, OnInit } from '@angular/core';
import {ExerciseType} from "../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../commons/enums/muscles.enum";
import {CreateExerciseCategoryGroups} from "../../../../commons/enums/create-exercise-category-groups.enum";
import {AlertOptions} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../../environments/environment";
import {TrainingPlanService} from "../training-plan.service";
import {WeekDay} from "../../../../commons/enums/week-days.enum";
import {GeneralMeasurementDto} from "../../body/model/general-measurement-dto.model";
import {TrainingPlanDto} from "../model/training-plan-dto.model";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-add-training-plan',
  templateUrl: './add-training-plan.page.html',
  styleUrls: ['./add-training-plan.page.scss'],
})
export class AddTrainingPlanPage implements OnInit {

  trainingDays = WeekDay;
  trainingDaysOptions: AlertOptions = {
    header: this.translate.instant('ADD_TRAINING_PLAN.ALERTS.TRAINING_DAYS.HEADER'),
    subHeader: this.translate.instant('ADD_TRAINING_PLAN.ALERTS.TRAINING_DAYS.SUBHEADER')
  };

  createTrainingPlanForm = this.formBuilder.group({
    name: ['', Validators.required],
    trainingDays: [['']]
  });

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private trainingPlanService: TrainingPlanService
  ) { }

  ngOnInit() {
  }

  validateAndCreateTrainingPlan(createTrainingPlanForm: FormGroup) {
    if (createTrainingPlanForm.valid) {
      let trainingPlan: TrainingPlanDto = createTrainingPlanForm.value;
        this.trainingPlanService.createTrainingPlan(trainingPlan).subscribe(async () => {
          this.trainingPlanService.notifyAboutTrainingPlanChange();
          await this.router.navigate(['tabs', 'training-plans']);
        });
    }
  }

  originalOrder (a: KeyValue<string, string>, b: KeyValue<string, string>): number  {
    return 0;
  }
}
