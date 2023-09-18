import {Injectable} from '@angular/core';
import {LengthUnit} from "../../models/length-units";
import {WeightUnit} from "../../models/weight-units";
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
  private _lengthUnitShortcut!: string;
  private _weightUnitShortcut!: string;

  constructor(private userService: UserService) {
    this.initializeUserDetails();
    this.setLengthUnitShortcut();
    this.setWeightUnitShortcut();
  }

  private initializeUserDetails() {
    this.fetchUserDetails();
    console.log('initializeUserDetails', this.userDetails);
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
    this.setLengthUnitShortcut();
    this.setWeightUnitShortcut();
    console.log('reassignMeasurementUnits', this._lengthUnitShortcut);
    console.log('reassignMeasurementUnits', this._weightUnitShortcut);
    this.notifyAboutMeasurementUnitsChange();
  }

  private notifyAboutMeasurementUnitsChange(): void {
    this.measurementUnitsChange.next();
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

  recalculateLengthFromCentimeterToInch() {

}

  recalculateLengthFromInchToCentimeter() {

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
}
