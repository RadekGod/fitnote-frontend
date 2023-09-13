import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BodyService} from "../body.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-general-measurements',
  templateUrl: './add-general-measurement.page.html',
  styleUrls: ['./add-general-measurement.page.scss'],
})
export class AddGeneralMeasurementPage implements OnInit {

  addGeneralMeasurementsForm = this.formBuilder.group({
    weight: [''],
    height: [''],
    muscleContent: [''],
    fatContent: [''],
    measurementDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm')]
  });

  constructor( private router: Router, private formBuilder: FormBuilder, private bodyService: BodyService,
               private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {

      this.addGeneralMeasurementsForm.patchValue({
        weight: response?.weight?.toString() ?? '',
        height: response?.height?.toString() ?? '',
        muscleContent: response?.muscleContent?.toString() ?? '',
        fatContent: response?.fatContent?.toString() ?? '',
      });
      console.log(this.addGeneralMeasurementsForm);
    });
  }

  validateAndSendMeasurementForm(addGeneralMeasurementsForm: FormGroup) {
    console.log(addGeneralMeasurementsForm.value);
    // this.router.navigate(['tabs', 'body']);
    this.bodyService.addNewGeneralMeasurement(addGeneralMeasurementsForm.value).subscribe(responseData => {
      this.bodyService.notifyAboutGeneralMeasurementChange();
      this.router.navigate(['tabs', 'body']);
    });
  }
}
