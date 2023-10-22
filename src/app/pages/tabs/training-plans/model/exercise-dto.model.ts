import {ExerciseType} from "../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../commons/enums/muscles.enum";
import {ApplicationFile} from "../../../../commons/models/application-file.model";
import {ExerciseCategoryGroupDto} from "./exercise-category-group-dto.model";
import {LocalImage} from "../../../../commons/models/local-image.model";

export interface ExerciseDto {
  id: number,
  name: string,
  description: string,
  custom: boolean,
  exerciseCategoryGroups: ExerciseCategoryGroupDto[],
  exerciseType: ExerciseType,
  mainMuscles: Muscles[],
  supportiveMuscles: Muscles[]
  applicationFile?: ApplicationFile,
  image?: LocalImage
}
