import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-general-measurements',
  templateUrl: './edit-general-measurement-page.component.html',
  styleUrls: ['./edit-general-measurement-page.component.scss'],
})
export class EditGeneralMeasurementPage implements OnInit {

  editGeneralMeasurementsForm = this.formBuilder.group({
    weight: [''],
    height: [''],
    muscleContent: [''],
    fatContent: [''],
    measurementDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm')]
  });

  constructor( private router: Router, private formBuilder: FormBuilder, private bodyService: BodyService,
               private datePipe: DatePipe, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.editGeneralMeasurementsForm.patchValue({
        weight: response?.weight?.toString() ?? '',
        height: response?.height?.toString() ?? '',
        muscleContent: response?.muscleContent?.toString() ?? '',
        fatContent: response?.fatContent?.toString() ?? '',
        measurementDate: this.datePipe.transform(response?.measurementDate, 'yyyy-MM-ddTHH:mm')
      });
    });
  }

  validateAndSendMeasurementForm(addGeneralMeasurementForm: FormGroup) {
    let generalMeasurementId = Number(this.route.snapshot.paramMap.get('id'));
    // this.router.navigate(['tabs', 'body']);
    this.bodyService.editGeneralMeasurement(generalMeasurementId, addGeneralMeasurementForm.value).subscribe(responseData => {
      this.bodyService.notifyAboutGeneralMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
