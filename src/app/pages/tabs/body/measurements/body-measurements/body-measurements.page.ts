import {Component, OnInit} from '@angular/core';
import {BodyService} from "../../body.service";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";
import {ToastService} from "../../../../../commons/services/toast/toast.service";
import {BodyMeasurementDto} from "../../model/body-measurement-dto.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-body-measurements',
  templateUrl: './body-measurements.page.html',
  styleUrls: ['./body-measurements.page.scss'],
})
export class BodyMeasurementsPage implements OnInit {

  bodyMeasurements: BodyMeasurementDto[] | null = null;
  private bodyMeasurementSubscription!: Subscription;
  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;

  constructor(private bodyService: BodyService,
              private measurementUnitsService: MeasurementUnitsService,
              private toastService: ToastService) {
  }

  async ngOnInit() {
    this.initializeMeasurementUnitsShortcuts();
    this.initializeBodyMeasurements();
  }



  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
      this.fetchBodyMeasurements();
    });
  }

  initializeBodyMeasurements() {
    this.fetchBodyMeasurements();
    this.bodyMeasurementSubscription = this.listenForBodyMeasurementChange();
  }

  listenForBodyMeasurementChange() {
    return this.bodyService.bodyMeasurementChange.subscribe(() => {
      this.fetchBodyMeasurements();
    });
  }

  fetchBodyMeasurements() {
    this.bodyService.getAllBodyMeasurements().subscribe(response => {
      this.bodyMeasurements = response;
    });
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
  }
  deleteBodyMeasurement(bodyMeasurementId: number) {
    this.bodyService.deleteBodyMeasurement(bodyMeasurementId).subscribe(async response => {
      this.bodyService.notifyAboutBodyMeasurementChange();
      await this.toastService.presentToast('success', 'TOAST_MESSAGES.MEASUREMENT_DELETE_SUCCESS');
    }, async () => {
      await this.toastService.presentToast('error', 'TOAST_MESSAGES.MEASUREMENT_DELETE_ERROR');
    });
  }
}
