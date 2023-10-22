import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TrainingPlanDto} from "./model/training-plan-dto.model";
import {Subscription} from "rxjs";
import {TrainingPlanService} from "./training-plan.service";

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.page.html',
  styleUrls: ['./training-plans.page.scss'],
})
export class TrainingPlansPage implements OnInit {

  trainingPlans: TrainingPlanDto[] = [];
  private trainingPlansSubscription!: Subscription;

  constructor(private router : Router,
              private trainingPlanService: TrainingPlanService) {
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
    this.trainingPlanService.deleteTrainingPlan(trainingPlan.id).subscribe(response => {
      this.trainingPlanService.notifyAboutTrainingPlanChange();
    });
  }

  async editTrainingPlan(trainingPlan: TrainingPlanDto) {
    // this.trainingPlanService.deleteTrainingPlan(trainingPlan.id).subscribe(response => {
    //   this.trainingPlanService.notifyAboutTrainingPlanChange();
    // });
  }


}
