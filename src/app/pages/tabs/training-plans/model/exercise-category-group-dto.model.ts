import {MeasurementUnit} from "../../../../commons/enums/measurement-unit.enum";
import {ExerciseCategoryGroups} from "../../../../commons/enums/exercise-category-groups.enum";
import {ExerciseType} from "../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../commons/enums/muscles.enum";
import {ApplicationFile} from "../../../../commons/models/application-file.model";


export interface ExerciseCategoryGroupDto {
  id: number,
  categoryName: ExerciseCategoryGroups,
}
