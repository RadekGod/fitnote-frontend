import {Component, OnInit} from '@angular/core';
import {AlertOptions} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {TrainingPlanService} from "../training-plan.service";
import {WeekDay} from "../../../../commons/enums/week-days.enum";
import {TrainingPlanDto} from "../model/training-plan-dto.model";
import {KeyValue} from "@angular/common";
import {ToastService} from "../../../../commons/services/toast/toast.service";

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
    private toastService: ToastService,
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
          await this.toastService.presentToast('success', 'TOAST_MESSAGES.TRAINING_PLAN_ADD_SUCCESS');
        }, async () => {
          await this.toastService.presentToast('error', 'TOAST_MESSAGES.TRAINING_PLAN_ADD_ERROR');
        });
    }
  }

  originalOrder (a: KeyValue<string, string>, b: KeyValue<string, string>): number  {
    return 0;
  }
}
