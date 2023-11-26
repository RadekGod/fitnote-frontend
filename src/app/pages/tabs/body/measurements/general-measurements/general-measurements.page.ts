import { Component, OnInit } from '@angular/core';
import {BodyMeasurementDto} from "../../model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "../../model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {BodyService} from "../../body.service";
import {UserService} from "../../../../../commons/services/user/user.service";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";
import {ImageService} from "../../../../../commons/services/file/image.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-general-measurements',
  templateUrl: './general-measurements.page.html',
  styleUrls: ['./general-measurements.page.scss'],
})
export class GeneralMeasurementsPage implements OnInit {

  generalMeasurements: GeneralMeasurementDto[] | null = null;
  private generalMeasurementSubscription!: Subscription;
  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;

  constructor(private bodyService: BodyService,
              private measurementUnitsService: MeasurementUnitsService,
              private toastService: ToastService) {
  }

  async ngOnInit() {
    this.initializeMeasurementUnitsShortcuts();
    this.initializeGeneralMeasurements();
  }



  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
      this.fetchGeneralMeasurements();
    });
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }

  initializeGeneralMeasurements() {
    this.fetchGeneralMeasurements();
    this.generalMeasurementSubscription = this.listenForGeneralMeasurementChange();
  }

  listenForGeneralMeasurementChange() {
    return this.bodyService.generalMeasurementChange.subscribe(() => {
      this.fetchGeneralMeasurements();
    });
  }

  fetchGeneralMeasurements() {
    this.bodyService.getAllGeneralMeasurements().subscribe(response => {
      this.generalMeasurements = response;
    });
  }

  deleteGeneralMeasurement(generalMeasurementId: number) {
    this.bodyService.deleteGeneralMeasurement(generalMeasurementId).subscribe(async response => {
      this.bodyService.notifyAboutGeneralMeasurementChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.MEASUREMENT_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.MEASUREMENT_DELETE_ERROR');
    });
  }
}
