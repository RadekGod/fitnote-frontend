import {Component, OnInit} from '@angular/core';
import {BodyService} from "./body.service";
import {BodyMeasurementDto} from "./model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "./model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../commons/services/user/user.service";
import {MeasurementUnitsService} from "../../../commons/services/mesurement-units/measurement-units.service";
import {User} from "../../../commons/models/user.model";

@Component({
  selector: 'app-body',
  templateUrl: './body.page.html',
  styleUrls: ['./body.page.scss'],
})
export class BodyPage implements OnInit {

  // segmentValue: string = 'measurements';
  segmentValue: string = 'photoGallery';
  bodyMeasurement: BodyMeasurementDto | null = null;
  generalMeasurement: GeneralMeasurementDto | null = null;
  private generalMeasurementSubscription!: Subscription;
  private bodyMeasurementSubscription!: Subscription;
  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;

  constructor(private bodyService: BodyService,
              private userService: UserService,
              private measurementUnitsService: MeasurementUnitsService) {
  }

  ngOnInit() {
    this.initializeMeasurementUnitsShortcuts();
    this.initializeGeneralMeasurements();
    this.initializeBodyMeasurements();
  }


  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
        this.getMeasurementUnitsShortcuts();
      });
  }

  initializeGeneralMeasurements() {
    this.fetchLatestGeneralMeasurement();
    this.generalMeasurementSubscription = this.listenForGeneralMeasurementChange();
  }

  listenForGeneralMeasurementChange() {
    return this.bodyService.generalMeasurementChange.subscribe(() => {
        this.fetchLatestGeneralMeasurement();
      });
  }

  initializeBodyMeasurements() {
    this.fetchLatestBodyMeasurement();
    this.bodyMeasurementSubscription = this.listenForBodyMeasurementChange();
  }

  listenForBodyMeasurementChange() {
    return this.bodyService.bodyMeasurementChange.subscribe(() => {
        this.fetchLatestBodyMeasurement();
      });
  }

  fetchLatestBodyMeasurement() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.bodyMeasurement = response;
    });
  }

  fetchLatestGeneralMeasurement() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.generalMeasurement = response;
    });
  }

  changeSegmentValue(value: string) {
    this.segmentValue = value;
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }
}
