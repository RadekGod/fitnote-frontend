import {LocalImage} from "./local-image.model";
import {ExerciseCategoryGroupDto} from "../../pages/tabs/training-plans/model/exercise-category-group-dto.model";
import {ExerciseType} from "../enums/exercise-types.enum";
import {Muscles} from "../enums/muscles.enum";

export interface Exercise {
  id: number,
  name: string,
  description: string,
  custom: boolean,
  exerciseCategoryGroups: ExerciseCategoryGroupDto[],
  exerciseType: ExerciseType,
  mainMuscles: Muscles[],
  supportiveMuscles: Muscles[],
  image?: LocalImage
}
