import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../commons/services/user/user.service";
import {TrainingPlanDto} from "../training-plans/model/training-plan-dto.model";
import {TrainingDto} from "../training-plans/training-plan/training/model/training-dto.model";
import {TrainingService} from "../training-plans/training-plan/training.service";
import {TrainingPlanExerciseDto} from "../training-plans/model/training-plan-exercise-dto.model";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs";
import {ToastService} from "../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  trainings!: TrainingDto[];
  private trainingsSubscription!: Subscription;

  constructor(private toastService: ToastService,
              private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.initializeTrainings();
  }

  getTrainingDuration(training: TrainingDto) {
    return this.trainingService.calculateTrainingDuration(training);
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

  deleteTraining(trainingId: number) {
    this.trainingService.deleteTraining(trainingId).subscribe(async () => {
      this.trainingService.notifyAboutTrainingsChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.TRAINING_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.TRAINING_DELETE_ERROR');
    });
  }

}
