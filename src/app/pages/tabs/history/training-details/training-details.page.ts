import {Component, OnInit} from '@angular/core';
import {TrainingDto} from "../../training-plans/training-plan/training/model/training-dto.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../commons/services/user/user.service";
import {TrainingService} from "../../training-plans/training-plan/training.service";
import {Muscles} from "../../../../commons/enums/muscles.enum";
import {MeasurementUnitsService} from "../../../../commons/services/mesurement-units/measurement-units.service";
import {ExerciseSetDto} from "../../training-plans/model/exercise-set-dto.model";
import {TrainingExerciseDto} from "../../training-plans/training-plan/training/model/training-exercise-dto.model";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.page.html',
  styleUrls: ['./training-details.page.scss'],
})
export class TrainingDetailsPage implements OnInit {

  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;
  training!: TrainingDto;
  trainingId = Number(this.route.snapshot.paramMap.get('trainingId'));

  performedRepeats = 0;
  performedSets = 0;
  performedExercises = 0;
  maxWeight = 0;
  totalWeight = 0;
  trainingDuration = '';

  constructor(private trainingService: TrainingService,
              private measurementUnitsService: MeasurementUnitsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchTrainings();
    this.initializeMeasurementUnitsShortcuts();
  }

  fetchTrainings() {
    this.trainingService.getTraining(this.trainingId).subscribe(response => {
      this.training = response;
      this.countTrainingStatistics();
      this.trainingDuration = this.trainingService.calculateTrainingDuration(this.training);
    });
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
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }

  get musclesEngagedInTraining() {
    let engagedMuscles = new Set<Muscles>;
    this.training?.trainingExercises?.forEach(trainingExercise => {
      trainingExercise?.exercise?.mainMuscles?.forEach(muscle => {
        engagedMuscles.add(muscle);
      })

      trainingExercise?.exercise?.supportiveMuscles?.forEach(muscle => {
        engagedMuscles.add(muscle);
      })
    });
    return [...new Set(engagedMuscles)];
  }

  countTrainingStatistics() {
    this.performedExercises = this.training?.trainingExercises?.length;
    this.training?.trainingExercises?.forEach(trainingExercise => {
      trainingExercise?.exerciseSets?.forEach(exerciseSet => {
          this.performedSets++;
          this.maxWeight = Math.max(this.maxWeight, exerciseSet.weight);
          this.totalWeight += exerciseSet.weight;
          this.performedRepeats += exerciseSet.repeats;
      });
    });
  }

}
