import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../commons/services/user/user.service";
import {TrainingPlanDto} from "../training-plans/model/training-plan-dto.model";
import {TrainingDto} from "../training-plans/training-plan/training/model/training-dto.model";
import {TrainingService} from "../training-plans/training-plan/training.service";
import {TrainingPlanExerciseDto} from "../training-plans/model/training-plan-exercise-dto.model";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  trainings!: TrainingDto[];
  private trainingsSubscription!: Subscription;
  constructor(private router : Router, private userService: UserService,
              private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.initializeTrainings();
  }

  calculateTrainingDuration(training: TrainingDto) {
    let startTime = new Date(training.startTime!).getTime();
    let finishTime = new Date(training.finishTime!).getTime();
    let timeDifferenceInMinutes = Math.floor((finishTime - startTime) / (1000 * 60));
    return Math.floor(timeDifferenceInMinutes / 60) + 'h ' + (timeDifferenceInMinutes % 60) + 'min';
  }

  initializeTrainings() {
    this.fetchTrainings();
    this.trainingsSubscription = this.listenForTrainingsChange();
  }

  listenForTrainingsChange() {
    return this.trainingService.trainingChange.subscribe(() => {
      this.fetchTrainings();
    });
  }

  fetchTrainings() {
    this.trainingService.getAllTrainings().subscribe(response => {
      this.trainings = response;
    });
  }

}
