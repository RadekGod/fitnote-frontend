import {Component, OnInit} from '@angular/core';
import {BodyService} from "./body.service";
import {BodyMeasurementDto} from "./model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "./model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-body',
  templateUrl: './body.page.html',
  styleUrls: ['./body.page.scss'],
})
export class BodyPage implements OnInit {

  segmentValue: string = 'measurements';
  bodyMeasurement: BodyMeasurementDto | null = null;
  generalMeasurement: GeneralMeasurementDto | null = null;
  private generalMeasurementSubscription!: Subscription;
  private bodyMeasurementSubscription!: Subscription;


  constructor(private bodyService: BodyService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.fetchLatestGeneralMeasurement();
    this.fetchLatestBodyMeasurement();
    this.generalMeasurementSubscription = this.listenForGeneralMeasurementChange();
    this.bodyMeasurementSubscription = this.listenForBodyMeasurementChange();
  }


  listenForGeneralMeasurementChange() {
    return this.bodyService.generalMeasurementChange.subscribe(
      () => {
        this.fetchLatestGeneralMeasurement();
      }
    );
  }

  listenForBodyMeasurementChange() {
    return this.bodyService.bodyMeasurementChange.subscribe(
      () => {
        this.fetchLatestBodyMeasurement();
      }
    );
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

}
