import {LengthUnit} from "../enums/length-units.enum";
import {WeightUnit} from "../enums/weight-units.enum";

export interface UserSettings {
  lengthUnit: LengthUnit,
  weightUnit: WeightUnit
}
