import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from "../../exercise.service";
import {UrlService} from "../../../../../../commons/services/url/url.service";
import {Exercise} from "../../../../../../commons/models/exercise.model";
import {ImageService} from "../../../../../../commons/services/file/image.service";
import {environment} from "../../../../../../../environments/environment";
import {Subscription} from "rxjs";
import {ToastService} from "../../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  previousUrl: string = '';
  category!: string;
  exercises: Exercise[] = [];
  private exercisesSubscription!: Subscription;
  trainingPlanId = Number(this.route.snapshot.paramMap.get('trainingPlanId'));


  constructor(private activatedRoute: ActivatedRoute,
              private exerciseService: ExerciseService,
              private urlService: UrlService,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
    this.category = this.activatedRoute.snapshot.params['category'];
    this.initializeExercises();
  }

  initializeExercises() {
    this.fetchAllExercisesFromCategory();
    this.exercisesSubscription = this.listenForExerciseChange();
  }

  fetchAllExercisesFromCategory() {
    this.exercises = [];
    this.exerciseService.getAllExercisesFromCategory(this.category).subscribe(async response => {
      for (const responseEntry of response) {
        this.exercises.push({
          ...responseEntry,
          image: responseEntry.applicationFile ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, responseEntry.applicationFile) : undefined
        });
      }
      console.log(this.exercises);
    });
  }

  listenForExerciseChange() {
    return this.exerciseService.exercisesChange.subscribe(() => {
      this.fetchAllExercisesFromCategory();
    });
  }


  async deleteExercise(exercise: Exercise) {
    this.exerciseService.deleteCustomExercise(exercise.id).subscribe(async response => {
      if (exercise.image) {
        await this.imageService.deleteImageFromDevice(environment.customExercisesDirectory, exercise.image.fileName);
      }
      this.exerciseService.notifyAboutExercisesChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.EXERCISE_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.EXERCISE_DELETE_ERROR');
    });
  }
}
