import {ExerciseCategoryGroupDto} from "../../../training-plans/model/exercise-category-group-dto.model";
import {ExerciseType} from "../../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../../commons/enums/muscles.enum";


export interface CreateExerciseDto {
  id?: number,
  name: string,
  description: string,
  exerciseCategoryGroups: ExerciseCategoryGroupDto[],
  exerciseType: ExerciseType,
  mainMuscles: Muscles[],
  supportiveMuscles: Muscles[]
}
