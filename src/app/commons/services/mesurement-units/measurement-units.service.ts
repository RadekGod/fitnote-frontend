import {Injectable} from '@angular/core';
import {LengthUnit} from "../../enums/length-units.enum";
import {WeightUnit} from "../../enums/weight-units.enum";
import {UserService} from "../user/user.service";
import {User} from "../../models/user.model";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitsService {

  private userDetails!: User;
  private userDetailsSubscription!: Subscription;
  public measurementUnitsChange = new Subject<void>();
  private _weightUnit!: WeightUnit;
  private _lengthUnit!: LengthUnit;
  private _lengthUnitShortcut!: string;
  private _weightUnitShortcut!: string;

  constructor(private userService: UserService) {
    this.initializeUserDetails();
    this.setMeasurementUnits();
    this.setLengthUnitShortcut();
    this.setWeightUnitShortcut();
  }

  private initializeUserDetails() {
    this.fetchUserDetails();
    this.userDetailsSubscription = this.listenForUserDetailsChange();
  }

  private listenForUserDetailsChange() {
    return this.userService.userDetailsChange.subscribe(() => {
      this.fetchUserDetails();
      this.reassignMeasurementUnits();
    });
  }

  private fetchUserDetails() {
    this.userDetails = this.userService.getUserDetailsFromSession();
  }

  private reassignMeasurementUnits() {
    this.setMeasurementUnits();
    this.setLengthUnitShortcut();
    this.setWeightUnitShortcut();
    this.notifyAboutMeasurementUnitsChange();
  }

  private notifyAboutMeasurementUnitsChange(): void {
    this.measurementUnitsChange.next();
  }

  setMeasurementUnits(): void {
    this._lengthUnit = this.userDetails.userSettings.lengthUnit;
    this._weightUnit = this.userDetails.userSettings.weightUnit;
  }

  setLengthUnitShortcut(): void {
    switch (this.userDetails.userSettings.lengthUnit) {
      case LengthUnit.CENTIMETER:
        this._lengthUnitShortcut = 'cm';
        break;
      case LengthUnit.INCH:
        this._lengthUnitShortcut = '″';
    }
  }

  setWeightUnitShortcut(): void {
    switch (this.userDetails.userSettings.weightUnit) {
      case WeightUnit.KILOGRAM:
        this._weightUnitShortcut = 'kg';
        break;
      case WeightUnit.POUND:
        this._weightUnitShortcut = 'lbs';
    }
  }

  get lengthUnitShortcut() {
    return this._lengthUnitShortcut;
  }

  get weightUnitShortcut() {
    return this._weightUnitShortcut;
  }

  get lengthUnit() {
    return this._lengthUnit;
  }

  get weightUnit() {
    return this._weightUnit;
  }
}
