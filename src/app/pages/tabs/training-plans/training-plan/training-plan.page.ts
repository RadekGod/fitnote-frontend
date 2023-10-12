import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ItemReorderEventDetail} from "@ionic/angular";
import {Subscription} from "rxjs";
import {TrainingPlanService} from "../training-plan.service";
import {GeneralMeasurementDto} from "../../body/model/general-measurement-dto.model";
import {TrainingPlanDto} from "../model/training-plan-dto.model";

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.page.html',
  styleUrls: ['./training-plan.page.scss'],
})
export class TrainingPlanPage implements OnInit {

  trainingPlans!: TrainingPlanDto[];
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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }




}
