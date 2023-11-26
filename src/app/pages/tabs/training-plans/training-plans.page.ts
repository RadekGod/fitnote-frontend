import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TrainingPlanDto} from "./model/training-plan-dto.model";
import {Subscription} from "rxjs";
import {TrainingPlanService} from "./training-plan.service";
import {ToastService} from "../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.page.html',
  styleUrls: ['./training-plans.page.scss'],
})
export class TrainingPlansPage implements OnInit {

  trainingPlans: TrainingPlanDto[] = [];
  private trainingPlansSubscription!: Subscription;

  constructor(private trainingPlanService: TrainingPlanService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initializeTrainingPlans();
  }

  initializeTrainingPlans() {
    this.fetchTrainingPlans();
    this.trainingPlansSubscription = this.listenForTrainingPlansChange();
  }

  listenForTrainingPlansChange() {
    return this.trainingPlanService.trainingPlanChange.subscribe(() => {
      this.fetchTrainingPlans();
    });
  }

  fetchTrainingPlans() {
    this.trainingPlanService.getAllTrainingPlans().subscribe(response => {
      console.log(response);
      this.trainingPlans = response;
    });
  }

  async deleteTrainingPlan(trainingPlan: TrainingPlanDto) {
    this.trainingPlanService.deleteTrainingPlan(trainingPlan.id).subscribe(async response => {
      this.trainingPlanService.notifyAboutTrainingPlanChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.TRAINING_PLAN_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.TRAINING_PLAN_DELETE_ERROR');
    });
  }
}
