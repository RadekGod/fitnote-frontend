import {LengthUnit} from "../../../../commons/models/length-units";
import {WeightUnit} from "../../../../commons/models/weight-units";

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
