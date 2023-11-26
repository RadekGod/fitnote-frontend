import {Component, OnInit} from '@angular/core';
import {TrainingPlanExerciseDto} from "../../model/training-plan-exercise-dto.model";
import {environment} from "../../../../../../environments/environment";
import {TrainingPlanDto} from "../../model/training-plan-dto.model";
import {from, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageService} from "../../../../../commons/services/file/image.service";
import {TrainingPlanService} from "../../training-plan.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";
import {ApplicationFile} from "../../../../../commons/models/application-file.model";
import {TrainingDto} from "./model/training-dto.model";
import {TrainingService} from "../training.service";
import {TrainingExerciseDto} from "./model/training-exercise-dto.model";
import {ExerciseSetDto} from "../../model/exercise-set-dto.model";
import {ToastService} from "../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  trainingPlan!: TrainingPlanDto;
  trainingStartDate: Date = new Date(Date.now());
  trainingPlanId = Number(this.route.snapshot.paramMap.get('trainingPlanId'));
  private trainingPlansSubscription!: Subscription;
  setsCount: number = 1;
  currentExerciseIndex: number = 0;
  weightUnitShortcut!: string;
  private measurementUnitsSubscription!: Subscription;

  get currentTrainingPlanExercise() {
    return this.trainingPlan.trainingPlanExercises[this.currentExerciseIndex];
  }


  trainingForm = this.formBuilder.group({
    exercises: this.formBuilder.array([this.formBuilder.group({
      note: [''],
      exerciseSets: this.formBuilder.array([this.formBuilder.group({
        weight: [10],
        repeats: [1],
        completed: [false]
      }), Validators.required])
    })])
  });


  getExercises(): FormArray {
    return this.trainingForm?.get('exercises') as FormArray;
  }

  getExerciseDetails(exerciseNumber: number): FormArray {
    return this.getExercises().at(exerciseNumber) as FormArray;
  }

  getExerciseSets(exerciseNumber: number): FormArray {
    return this.getExerciseDetails(exerciseNumber).get('exerciseSets') as FormArray;
  }

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private imageService: ImageService,
              private measurementUnitsService: MeasurementUnitsService,
              private trainingPlanService: TrainingPlanService,
              private toastService: ToastService,
              private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.initializeTrainingPlan();
    this.initializeMeasurementUnitsShortcuts();
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
      console.log('fetchTrainingPlan', response.trainingPlanExercises);
      console.log('fetchTrainingPlan length', response.trainingPlanExercises.length);

      let trainingPlanExercises: TrainingPlanExerciseDto[] = [];

      response.trainingPlanExercises.forEach(trainingPlanExercise => {

        trainingPlanExercises.push({
          ...trainingPlanExercise,
          exercise: {
            ...trainingPlanExercise.exercise
          }
        } as TrainingPlanExerciseDto);


      });

      this.trainingPlan = {
        ...response,
        trainingPlanExercises: trainingPlanExercises
      };

      this.trainingPlan.trainingPlanExercises.map(async trainingPlanExercise => {
        trainingPlanExercise.exercise.image = trainingPlanExercise.exercise.applicationFile
          ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, trainingPlanExercise.exercise.applicationFile)
          : undefined
      });

      console.log('trainingPlanExercises', trainingPlanExercises);
      console.log('this.trainingPlan', this.trainingPlan);
      this.fillFormFields(this.trainingPlan);
    });
  }

  private fillFormFields(trainingPlanDto: TrainingPlanDto) {
    this.getExercises().clear();
    trainingPlanDto.trainingPlanExercises.forEach((trainingPlanExercise, index) => {
      console.log('index: ', index);
      this.getExercises().push(this.formBuilder.group({
        note: [trainingPlanExercise.note],
        exerciseSets: this.formBuilder.array([this.formBuilder.group({
          weight: [10],
          repeats: [1],
          completed: [false]
        })])
      }));
      this.getExerciseSets(index).clear();
      trainingPlanExercise.exerciseSets.forEach(exerciseSet => {
        this.getExerciseSets(index).push(this.formBuilder.group({
          weight: [exerciseSet.weight],
          repeats: [exerciseSet.repeats],
          completed: [false]
        }));
      });
    });

    this.reassignSetsCount();
  }

  validateAndSaveTraining(trainingForm: FormGroup) {
    if (this.trainingForm.valid) {
      console.log(trainingForm.value);

      let trainingExercises: TrainingExerciseDto[] = [];

      this.trainingPlan.trainingPlanExercises.forEach((trainingPlanExercise, index) => {
        let exerciseSets = this.getExerciseSets(index).value as ExerciseSetDto[];
        // exerciseSets = exerciseSets.filter(exerciseSet => exerciseSet.completed);
        console.log(exerciseSets);
        if (exerciseSets.some(exerciseSet => exerciseSet.completed)) {
          trainingExercises.push({
            ...trainingPlanExercise,
            exerciseSets: exerciseSets.filter(exerciseSet => exerciseSet.completed)
          });
        }
      });

      let trainingToSend: TrainingDto = {
        name: this.trainingPlan.name,
        trainingExercises: trainingExercises,
        startTime: this.trainingStartDate,
        finishTime: new Date(Date.now())
      };

      console.log('Dto do wysłania: ', trainingToSend);
      this.trainingService.createTraining(trainingToSend).subscribe(async (trainingId) => {
        this.trainingService.notifyAboutTrainingsChange();
        await this.router.navigate(['tabs', 'history', trainingId]);
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.TRAINING_ADD_SUCCESS');

      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.TRAINING_ADD_ERROR');
      });
    }
  }

  reassignSetsCount() {
    this.setsCount = this.getExerciseSets(this.currentExerciseIndex).length;
  }

  removeSet() {
    if (this.setsCount > 1) {
      this.setsCount--;
      this.getExerciseSets(this.currentExerciseIndex).removeAt(this.setsCount);
    }
  }

  addSet() {
    this.setsCount++;
    this.getExerciseSets(this.currentExerciseIndex).push(this.formBuilder.group({
      weight: [10],
      repeats: [1],
      completed: [false]
    }));
  }

  addRepeat(setIndex: number) {
    let currentRepeats = this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('repeats')?.value;
    this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('repeats')?.patchValue(currentRepeats + 1);
  }

  subtractRepeat(setIndex: number) {
    let currentRepeats = this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('repeats')?.value;
    if (currentRepeats > 1) {
      this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('repeats')?.patchValue(currentRepeats - 1);
    }
  }

  addWeight(setIndex: number) {
    let currentWeight = this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('weight')?.value;
    this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('weight')?.patchValue(currentWeight + 1);
  }

  subtractWeight(setIndex: number) {
    let currentWeight = this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('weight')?.value;
    if (currentWeight > 1) {
      this.getExerciseSets(this.currentExerciseIndex).at(setIndex).get('weight')?.patchValue(currentWeight - 1);
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

  previousExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.reassignSetsCount();
    }
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.getExercises().length - 1) {
      this.currentExerciseIndex++;
      this.reassignSetsCount();
    }
  }

}
