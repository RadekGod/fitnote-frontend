import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ItemReorderEventDetail} from "@ionic/angular";
import {Subscription} from "rxjs";
import {TrainingPlanService} from "../training-plan.service";
import {TrainingPlanDto} from "../model/training-plan-dto.model";
import {TrainingPlanExerciseDto} from "../model/training-plan-exercise-dto.model";
import {ExerciseDto} from "../model/exercise-dto.model";
import {environment} from "../../../../../environments/environment";
import {ImageService} from "../../../../commons/services/file/image.service";
import {ToastService} from "../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.page.html',
  styleUrls: ['./training-plan.page.scss'],
})
export class TrainingPlanPage implements OnInit, OnDestroy {

  trainingPlan!: TrainingPlanDto;
  trainingPlanId = Number(this.route.snapshot.paramMap.get('trainingPlanId'));
  private trainingPlansSubscription!: Subscription;

  constructor(private toastService: ToastService,
              private route: ActivatedRoute,
              private imageService: ImageService,
              private trainingPlanService: TrainingPlanService) {
  }

  ngOnInit(): void {
    this.initializeTrainingPlan();
  }

  initializeTrainingPlan() {
    this.fetchTrainingPlan();
    this.trainingPlansSubscription = this.listenForTrainingPlanChange();
  }

  listenForTrainingPlanChange() {
    return this.trainingPlanService.trainingPlanChange.subscribe(() => {
      this.fetchTrainingPlan();
    });
  }

  fetchTrainingPlan() {
    this.trainingPlanService.getTrainingPlan(this.trainingPlanId).subscribe(response => {
      let trainingPlanExercises: TrainingPlanExerciseDto[] = [];
      response.trainingPlanExercises.forEach(async trainingPlanExercise => {
        trainingPlanExercises.push({
          ...trainingPlanExercise,
          exercise: {
            ...trainingPlanExercise.exercise,
            image: trainingPlanExercise.exercise.applicationFile
              ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, trainingPlanExercise.exercise.applicationFile)
              : undefined
          }
        });
      });
      this.trainingPlan = {
        ...response,
        trainingPlanExercises: trainingPlanExercises
      };
      console.log(this.trainingPlan);
    });
  }

  deleteExerciseFromTrainingPlan(exercise: TrainingPlanExerciseDto) {
    this.trainingPlanService.deleteExerciseFromTrainingPlan(this.trainingPlanId, exercise.id).subscribe(async response => {
      this.trainingPlanService.notifyAboutTrainingPlanChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.TRAINING_PLAN_EXERCISE_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.TRAINING_PLAN_EXERCISE_DELETE_ERROR');
    });
  }


  ngOnDestroy() {
    this.trainingPlansSubscription.unsubscribe();
  }

}
