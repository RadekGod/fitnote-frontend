import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BodyService} from "../../body.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {BodyMeasurementDto} from "../../model/body-measurement-dto.model";
import {Subscription} from "rxjs";
import {MeasurementUnitsService} from "../../../../../commons/services/mesurement-units/measurement-units.service";
import {RemoveCommaPipe} from "../../../../../commons/pipes/remove-comma.pipe";
import {ToastService} from "../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-add-body-measurement',
  templateUrl: './add-body-measurement.page.html',
  styleUrls: ['./add-body-measurement.page.scss'],
})
export class AddBodyMeasurementPage implements OnInit {

  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;

  addBodyMeasurementsForm = this.formBuilder.group({
    chest: [''],
    bicepsLeft: [''],
    bicepsRight: [''],
    forearmLeft: [''],
    forearmRight: [''],
    waist: [''],
    hip: [''],
    thighLeft: [''],
    thighRight: [''],
    calfLeft: [''],
    calfRight: [''],
    measurementDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'), Validators.required]
  });

  constructor(private router: Router, private formBuilder: FormBuilder,
              private bodyService: BodyService, private datePipe: DatePipe,
              private removeCommaPipe: RemoveCommaPipe,
              private measurementUnitsService: MeasurementUnitsService,
              private toastService: ToastService,
              private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
    this.fetchLatestBodyMeasurement();
    this.initializeMeasurementUnitsShortcuts();
  }

  fetchLatestBodyMeasurement() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.fillFormFields(response)
    });
  }

  private fillFormFields(bodyMeasurementDto: BodyMeasurementDto) {
    this.addBodyMeasurementsForm.patchValue({
      chest: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.chest?.toString(), '1.0-2') ?? ''),
      bicepsLeft: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.bicepsLeft?.toString(), '1.0-2') ?? ''),
      bicepsRight: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.bicepsRight?.toString(), '1.0-2') ?? ''),
      forearmLeft: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.forearmLeft?.toString(), '1.0-2') ?? ''),
      forearmRight: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.forearmRight?.toString(), '1.0-2') ?? ''),
      waist: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.waist?.toString(), '1.0-2') ?? ''),
      hip: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.hip?.toString(), '1.0-2') ?? ''),
      thighLeft: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.thighLeft?.toString(), '1.0-2') ?? ''),
      thighRight: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.thighRight?.toString(), '1.0-2') ?? ''),
      calfLeft: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.calfLeft?.toString(), '1.0-2') ?? ''),
      calfRight: this.removeCommaPipe.transform(this.decimalPipe.transform(bodyMeasurementDto?.calfRight?.toString(), '1.0-2') ?? '')
    });
  }

  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
      this.fetchLatestBodyMeasurement();
    });
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
  }

  validateAndSendMeasurementForm(addBodyMeasurementForm: FormGroup) {
    if (addBodyMeasurementForm.valid) {
      let bodyMeasurement: BodyMeasurementDto = addBodyMeasurementForm.value;
      bodyMeasurement.lengthUnit = this.measurementUnitsService.lengthUnit;
      this.bodyService.addNewBodyMeasurement(bodyMeasurement).subscribe(async responseData => {
        this.bodyService.notifyAboutBodyMeasurementChange();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.MEASUREMENT_ADD_SUCCESS');
        await this.router.navigate(['tabs', 'body']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.MEASUREMENT_ADD_ERROR');
      });
    }
  }
}
