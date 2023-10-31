import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
import {ExerciseService} from "../../../more/exercise/exercise.service";
import {Exercise} from "../../../../../commons/models/exercise.model";
import {ImageService} from "../../../../../commons/services/file/image.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {TrainingPlanService} from "../../training-plan.service";
import {UrlService} from "../../../../../commons/services/url/url.service";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";

@Component({
  selector: 'app-add-exercise-to-training-plan',
  templateUrl: './add-exercise-to-training-plan.page.html',
  styleUrls: ['./add-exercise-to-training-plan.page.scss'],
})
export class AddExerciseToTrainingPlanPage implements OnInit {

  trainingPlanId = Number(this.route.snapshot.paramMap.get('trainingPlanId'));
  exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'));
  exercise?: Exercise;
  previousUrl: string = '';
  setsCount: number = 1;
  weightUnitShortcut!: string;
  private measurementUnitsSubscription!: Subscription;


  addExerciseToTrainingPlanForm = this.formBuilder.group({
    note: [''],
    exerciseSets: this.formBuilder.array([this.formBuilder.group({
      weight: [10],
      repeats: [1]
    })])
  });

  get exerciseSets(): FormArray {
    return this.addExerciseToTrainingPlanForm.get('exerciseSets') as FormArray;
  }

  constructor(private urlService: UrlService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private trainingPlanService: TrainingPlanService,
              private measurementUnitsService: MeasurementUnitsService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
    this.fetchExercise();

    this.initializeMeasurementUnitsShortcuts();
  }

  fetchExercise() {
    this.exerciseService.getExercise(this.exerciseId).subscribe(async response => {
      console.log(response);
      this.exercise = {
        ...response,
        image: response.applicationFile ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, response.applicationFile) : undefined
      };
    });
  }

  validateAndAddExerciseToTrainingPlan(addExerciseToTrainingPlanForm: FormGroup) {
    if (this.addExerciseToTrainingPlanForm.valid) {
      console.log(addExerciseToTrainingPlanForm);
      this.trainingPlanService.addExerciseToTrainingPlan(this.trainingPlanId, this.exerciseId, addExerciseToTrainingPlanForm.value).subscribe(async () => {
        this.trainingPlanService.notifyAboutTrainingPlanChange();
        await this.router.navigate(['tabs', 'training-plans', this.trainingPlanId]);
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
    console.log(this.addExerciseToTrainingPlanForm.value);
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
