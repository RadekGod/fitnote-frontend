import {LengthUnit} from "../../../../commons/enums/length-units.enum";
import {WeightUnit} from "../../../../commons/enums/weight-units.enum";

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
