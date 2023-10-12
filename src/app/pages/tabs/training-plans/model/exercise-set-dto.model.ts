import {WeekDay} from "../../../../commons/enums/week-days.enum";
import {MeasurementUnitsService} from "../../../../commons/services/mesurement-units/measurement-units.service";
import {MeasurementUnit} from "../../../../commons/enums/measurement-unit.enum";


export interface ExerciseSetDto {
  id: number,
  weight: number,
  repeats: number,
  completed: boolean,
  note: string,
}
