import {LengthUnit} from "../../../../commons/enums/length-units.enum";
import {WeightUnit} from "../../../../commons/enums/weight-units.enum";

export interface GeneralMeasurementDto {
  id: number,
  weight: number,
  height: number,
  bmi: number,
  muscleContent: number,
  bodyFat: number,
  lengthUnit: LengthUnit,
  weightUnit: WeightUnit,
  measurementDate: number
}
