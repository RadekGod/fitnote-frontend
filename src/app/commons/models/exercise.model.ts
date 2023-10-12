import {LocalImage} from "./local-image.model";
import {MeasurementUnit} from "../enums/measurement-unit.enum";
import {ExerciseCategoryGroupDto} from "../../pages/tabs/training-plans/model/exercise-category-group-dto.model";
import {ExerciseType} from "../enums/exercise-types.enum";
import {Muscles} from "../enums/muscles.enum";
import {ApplicationFile} from "./application-file.model";

export interface Exercise {
  id: number,
  name: MeasurementUnit,
  description: string,
  custom: boolean,
  exerciseCategoryGroups: ExerciseCategoryGroupDto[],
  exerciseType: ExerciseType,
  mainMuscles: Muscles[],
  supportiveMuscles: Muscles[],
  image?: LocalImage
}
