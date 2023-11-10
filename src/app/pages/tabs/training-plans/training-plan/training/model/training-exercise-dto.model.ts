import {MeasurementUnit} from "../../../../../../commons/enums/measurement-unit.enum";
import {ExerciseDto} from "../../../model/exercise-dto.model";
import {ExerciseSetDto} from "../../../model/exercise-set-dto.model";


export interface TrainingExerciseDto {
  id: number,
  measurementUnit: MeasurementUnit,
  note: string,
  exercise: ExerciseDto,
  exerciseSets: ExerciseSetDto[],
}
