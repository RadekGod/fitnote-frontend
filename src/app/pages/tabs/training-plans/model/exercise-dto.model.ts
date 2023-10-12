import {MeasurementUnit} from "../../../../commons/enums/measurement-unit.enum";
import {ExerciseCategoryGroups} from "../../../../commons/enums/exercise-category-groups.enum";
import {ExerciseType} from "../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../commons/enums/muscles.enum";
import {ApplicationFile} from "../../../../commons/models/application-file.model";
import {ExerciseCategoryGroupDto} from "./exercise-category-group-dto.model";


export interface ExerciseDto {
  id: number,
  name: MeasurementUnit,
  description: string,
  custom: boolean,
  exerciseCategoryGroups: ExerciseCategoryGroupDto[],
  exerciseType: ExerciseType,
  mainMuscles: Muscles[],
  supportiveMuscles: Muscles[]
  applicationFile: ApplicationFile
}
