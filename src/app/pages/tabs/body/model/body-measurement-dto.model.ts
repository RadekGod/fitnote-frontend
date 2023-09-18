import {LengthUnit} from "../../../../commons/models/length-units";
import {WeightUnit} from "../../../../commons/models/weight-units";

export interface BodyMeasurementDto {
  id: number,
  chest: number,
  bicepsLeft: number,
  bicepsRight: number,
  forearmLeft: number,
  forearmRight: number,
  waist: number,
  hip: number,
  thighLeft: number,
  thighRight: number,
  calfLeft: number,
  calfRight: number,
  lengthUnit: LengthUnit,
  measurementDate: Date
}
