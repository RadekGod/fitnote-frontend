import { Component, OnInit } from '@angular/core';
import {MealService} from "../meal.service";
import {ToastService} from "../../../../commons/services/toast/toast.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {BodyMeasurementDto} from "../../body/model/body-measurement-dto.model";
import {MealDto} from "../model/activity-dto.model";

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.page.html',
  styleUrls: ['./edit-meal.page.scss'],
})
export class EditMealPage implements OnInit {

  formFailedValidation: boolean = false;
  mealId = Number(this.route.snapshot.paramMap.get('mealId'));
  editMealForm = this.formBuilder.group({
    mealDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'), Validators.required],
    name: ['', Validators.required],
    kilocalories: [0],
    carbohydrates: [0],
    proteins: [0],
    fat: [0],
    salt: [0]
  });

  constructor(private mealService: MealService,
              private toastService: ToastService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log('test');
    this.fetchMeal();
  }

  fetchMeal() {
    this.mealService.getMeal(this.mealId).subscribe(response => {
      this.fillFormFields(response)
    });
  }

  private fillFormFields(mealDto: MealDto) {
    this.editMealForm.patchValue({
      name: mealDto.name ?? '',
      kilocalories: mealDto.kilocalories ?? 0,
      carbohydrates: mealDto.carbohydrates ?? 0,
      proteins: mealDto.proteins ?? 0,
      fat: mealDto.fat ?? 0,
      salt: mealDto.salt ?? 0,
      mealDate: this.datePipe.transform(mealDto?.mealDate, 'yyyy-MM-ddTHH:mm')
    });
  }

  validateAndUpdateMealForm(editMealForm: FormGroup) {
    if (editMealForm.valid) {
      this.formFailedValidation = false;
      this.mealService.editMeal(this.mealId, editMealForm.value).subscribe(async responseData => {
        this.mealService.notifyAboutMealsChange();
        this.clearActivityFormData();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.MEAL_UPDATE_SUCCESS');
        await this.router.navigate(['tabs', 'diet']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.MEAL_UPDATE_ERROR');
      });
    } else {
      this.formFailedValidation = true;
    }
  }

  clearActivityFormData() {
    this.editMealForm.patchValue({
      mealDate: this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'),
      name: '',
      kilocalories: 0,
      carbohydrates: 0,
      proteins: 0,
      fat: 0,
      salt: 0
    });
    this.editMealForm.markAsPristine();
    this.editMealForm.markAsUntouched();
  }

  addKilocalories() {
    let currentKilocalories = this.editMealForm.get('kilocalories')?.value!;
    this.editMealForm.get('kilocalories')?.patchValue(currentKilocalories + 10);
  }

  subtractKilocalories() {
    let currentKilocalories = this.editMealForm.get('kilocalories')?.value!;
    if (currentKilocalories > 10) {
      this.editMealForm.get('kilocalories')?.patchValue(currentKilocalories - 10);
    } else if (currentKilocalories > 0) {
      this.editMealForm.get('kilocalories')?.patchValue(currentKilocalories - currentKilocalories);
    }
  }

  addCarbohydrates() {
    let currentCarbohydrates = this.editMealForm.get('carbohydrates')?.value!;
    this.editMealForm.get('carbohydrates')?.patchValue(currentCarbohydrates + 5);
  }

  subtractCarbohydrates() {
    let currentCarbohydrates = this.editMealForm.get('carbohydrates')?.value!;
    if (currentCarbohydrates > 5) {
      this.editMealForm.get('carbohydrates')?.patchValue(currentCarbohydrates - 5);
    } else if (currentCarbohydrates > 0) {
      this.editMealForm.get('carbohydrates')?.patchValue(currentCarbohydrates - currentCarbohydrates);
    }
  }

  addProteins() {
    let currentProteins = this.editMealForm.get('proteins')?.value!;
    this.editMealForm.get('proteins')?.patchValue(currentProteins + 5);
  }

  subtractProteins() {
    let currentProteins = this.editMealForm.get('proteins')?.value!;
    if (currentProteins > 5) {
      this.editMealForm.get('proteins')?.patchValue(currentProteins - 5);
    } else if (currentProteins > 0) {
      this.editMealForm.get('proteins')?.patchValue(currentProteins - currentProteins);
    }
  }

  addFat() {
    let currentFat = this.editMealForm.get('fat')?.value!;
    this.editMealForm.get('fat')?.patchValue(currentFat + 5);
  }

  subtractFat() {
    let currentFat = this.editMealForm.get('fat')?.value!;
    if (currentFat > 5) {
      this.editMealForm.get('fat')?.patchValue(currentFat - 5);
    } else if (currentFat > 0) {
      this.editMealForm.get('fat')?.patchValue(currentFat - currentFat);
    }
  }

  addSalt() {
    let currentSalt = this.editMealForm.get('salt')?.value!;
    this.editMealForm.get('salt')?.patchValue(currentSalt + 5);
  }

  subtractSalt() {
    let currentSalt = this.editMealForm.get('salt')?.value!;
    if (currentSalt > 5) {
      this.editMealForm.get('salt')?.patchValue(currentSalt - 5);
    } else if (currentSalt > 0) {
      this.editMealForm.get('salt')?.patchValue(currentSalt - currentSalt);
    }
  }

}
