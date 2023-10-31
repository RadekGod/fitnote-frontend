import { Component, OnInit } from '@angular/core';
import {WeekDay} from "../../../../commons/enums/week-days.enum";
import {AlertOptions} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingPlanService} from "../training-plan.service";
import {TrainingPlanDto} from "../model/training-plan-dto.model";
import {KeyValue} from "@angular/common";
import {ExerciseDto} from "../model/exercise-dto.model";
import {environment} from "../../../../../environments/environment";
import {IMAGE_FORMAT_PREFIX} from "../../../../commons/constants/constants";

@Component({
  selector: 'app-edit-training-plan',
  templateUrl: './edit-training-plan.page.html',
  styleUrls: ['./edit-training-plan.page.scss'],
})
export class EditTrainingPlanPage implements OnInit {

  trainingDays = WeekDay;
  trainingPlanId = Number(this.route.snapshot.paramMap.get('trainingPlanId'));
  trainingDaysOptions: AlertOptions = {
    header: this.translate.instant('ADD_TRAINING_PLAN.ALERTS.TRAINING_DAYS.HEADER'),
    subHeader: this.translate.instant('ADD_TRAINING_PLAN.ALERTS.TRAINING_DAYS.SUBHEADER')
  };

  editTrainingPlanForm = this.formBuilder.group({
    name: ['', Validators.required],
    trainingDays: [['']]
  });

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private trainingPlanService: TrainingPlanService
  ) { }

  ngOnInit() {
    this.fetchTrainingPlan();
  }

  fetchTrainingPlan() {
    this.trainingPlanService.getTrainingPlan(this.trainingPlanId).subscribe(response => {
      this.fillFormFields(response);
    });
  }

  private fillFormFields(trainingPlanDto: TrainingPlanDto) {
    this.editTrainingPlanForm.patchValue({
      name: trainingPlanDto?.name ?? '',
      trainingDays: trainingPlanDto.trainingDays ?? ['']
    });
  }

  validateAndUpdateTrainingPlan(createTrainingPlanForm: FormGroup) {
    if (createTrainingPlanForm.valid) {
      let trainingPlan: TrainingPlanDto = createTrainingPlanForm.value;
      this.trainingPlanService.updateTrainingPlan(this.trainingPlanId, trainingPlan).subscribe(async () => {
        this.trainingPlanService.notifyAboutTrainingPlanChange();
        await this.router.navigate(['tabs', 'training-plans']);
      });
    }
  }

  originalOrder (a: KeyValue<string, string>, b: KeyValue<string, string>): number  {
    return 0;
  }

}
