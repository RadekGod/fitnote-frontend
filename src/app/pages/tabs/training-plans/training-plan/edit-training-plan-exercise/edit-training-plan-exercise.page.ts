import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UrlService} from "../../../../../commons/services/url/url.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingPlanService} from "../../training-plan.service";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";
import {ImageService} from "../../../../../commons/services/file/image.service";
import {environment} from "../../../../../../environments/environment";
import {TrainingPlanExerciseDto} from "../../model/training-plan-exercise-dto.model";
import {ToastService} from "../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-edit-exercise-in-training-plan',
  templateUrl: './edit-training-plan-exercise.page.html',
  styleUrls: ['./edit-training-plan-exercise.page.scss'],
})
export class EditTrainingPlanExercisePage implements OnInit {
  trainingPlanId = Number(this.route.snapshot.paramMap.get('trainingPlanId'));
  trainingPlanExerciseId = Number(this.route.snapshot.paramMap.get('trainingPlanExerciseId'));
  trainingPlanExercise?: TrainingPlanExerciseDto;
  previousUrl: string = '';
  setsCount: number = 1;
  weightUnitShortcut!: string;
  private measurementUnitsSubscription!: Subscription;


  editTrainingPlanExerciseForm = this.formBuilder.group({
    note: [''],
    exerciseSets: this.formBuilder.array([this.formBuilder.group({
      weight: [10, Validators.required],
      repeats: [1, Validators.required]
    })])
  });

  get exerciseSets(): FormArray {
    return this.editTrainingPlanExerciseForm?.get('exerciseSets') as FormArray;
  }

  constructor(private urlService: UrlService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private trainingPlanService: TrainingPlanService,
              private toastService: ToastService,
              private measurementUnitsService: MeasurementUnitsService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
    this.fetchTrainingPlanExercise();

    this.initializeMeasurementUnitsShortcuts();
  }

  fetchTrainingPlanExercise() {
    this.trainingPlanService.getTrainingPlanExercise(this.trainingPlanId, this.trainingPlanExerciseId).subscribe(async response => {
      console.log(response);
      this.trainingPlanExercise = {
        ...response,
        exercise: {
          ...response.exercise,
          image: response.exercise.applicationFile ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, response.exercise.applicationFile) : undefined
        }
      };
      this.fillFormFields(response);
    });
  }

  private fillFormFields(trainingPlanExercise: TrainingPlanExerciseDto) {

    this.editTrainingPlanExerciseForm.patchValue({
      note: trainingPlanExercise?.note?.toString() ?? '',
    });
    this.exerciseSets.clear();
    trainingPlanExercise.exerciseSets.forEach(exerciseSet => {
      this.exerciseSets.push(this.formBuilder.group({
        weight: [exerciseSet.weight],
        repeats: [exerciseSet.repeats]
      }));
    });
    this.setsCount = this.exerciseSets.length;
  }

  validateAndUpdateTrainingPlanExercise(editTrainingPlanExerciseForm: FormGroup) {
    if (this.editTrainingPlanExerciseForm.valid) {
      console.log(editTrainingPlanExerciseForm.value);

      let trainingPlanExerciseToSend = this.trainingPlanExercise!;
      trainingPlanExerciseToSend.exerciseSets = editTrainingPlanExerciseForm.get('exerciseSets')?.value;
      trainingPlanExerciseToSend.note = editTrainingPlanExerciseForm.get('note')?.value;
      console.log('Test: ',trainingPlanExerciseToSend);
      this.trainingPlanService.updateTrainingPlanExercise(this.trainingPlanId, this.trainingPlanExerciseId, trainingPlanExerciseToSend).subscribe(async () => {
        this.trainingPlanService.notifyAboutTrainingPlanChange();
        await this.router.navigate(['tabs', 'training-plans', this.trainingPlanId]);
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.TRAINING_PLAN_EXERCISE_UPDATE_SUCCESS');
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.TRAINING_PLAN_EXERCISE_UPDATE_ERROR');
      });
    }
  }

  removeSet() {
    if (this.setsCount > 1) {
      this.setsCount--;
      this.exerciseSets.removeAt(this.setsCount);
    }
  }
  addSet() {
    this.setsCount++;
    this.exerciseSets.push(this.formBuilder.group({
      weight: [10],
      repeats: [1]
    }));
    console.log(this.editTrainingPlanExerciseForm.value);
  }

  addRepeat(setIndex: number) {
    let currentRepeats = this.exerciseSets.at(setIndex).get('repeats')?.value;
    this.exerciseSets.at(setIndex).get('repeats')?.patchValue( currentRepeats + 1);
  }

  subtractRepeat(setIndex: number) {
    let currentRepeats = this.exerciseSets.at(setIndex).get('repeats')?.value;
    if (currentRepeats > 1) {
      this.exerciseSets.at(setIndex).get('repeats')?.patchValue(currentRepeats - 1);
    }
  }

  addWeight(setIndex: number) {
    let currentWeight = this.exerciseSets.at(setIndex).get('weight')?.value;
    this.exerciseSets.at(setIndex).get('weight')?.patchValue( currentWeight + 1);
  }

  subtractWeight(setIndex: number) {
    let currentWeight = this.exerciseSets.at(setIndex).get('weight')?.value;
    if (currentWeight > 1) {
      this.exerciseSets.at(setIndex).get('weight')?.patchValue(currentWeight - 1);
    }
  }

  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
    });
  }

  getMeasurementUnitsShortcuts() {
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }
}
