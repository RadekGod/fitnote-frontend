import { Component, OnInit } from '@angular/core';
import {UrlService} from "../../../../../../commons/services/url/url.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyService} from "../../../../body/body.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MeasurementUnitsService} from "../../../../../../commons/services/mesurement-units/measurement-units.service";
import {BodyMeasurementDto} from "../../../../body/model/body-measurement-dto.model";

@Component({
  selector: 'app-add-custom-exercise',
  templateUrl: './add-custom-exercise.page.html',
  styleUrls: ['./add-custom-exercise.page.scss'],
})
export class AddCustomExercisePage implements OnInit {

  previousUrl: string = '';
  constructor(private urlService: UrlService, private router: Router,
              private formBuilder: FormBuilder) { }
  ngOnInit(){
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }

  addCustomExerciseForm = this.formBuilder.group({
    exerciseName: [''],
    exerciseType: ['']
  });

  validateAndSendMeasurementForm(addCustomExerciseForm: FormGroup) {
    console.log(addCustomExerciseForm);
    let bodyMeasurement: BodyMeasurementDto = addCustomExerciseForm.value;
    // this.bodyService.addNewBodyMeasurement(bodyMeasurement).subscribe(responseData => {
    //   this.bodyService.notifyAboutBodyMeasurementChange();
    //   this.router.navigate(['tabs', 'body']);
    // });
  }

}
