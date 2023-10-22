import {MeasurementUnit} from "../../../../commons/enums/measurement-unit.enum";
import {ExerciseSetDto} from "./exercise-set-dto.model";
import {ExerciseDto} from "./exercise-dto.model";
import {Exercise} from "../../../../commons/models/exercise.model";


export interface TrainingPlanExerciseDto {
  id: number,
  measurementUnit: MeasurementUnit,
  note: string,
  exercise: ExerciseDto,
  exerciseSets: ExerciseSetDto[],
}
