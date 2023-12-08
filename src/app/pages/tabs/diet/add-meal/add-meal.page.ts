import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../../../commons/services/toast/toast.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MealService} from "../meal.service";

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage implements OnInit {

  formFailedValidation: boolean = false;

  constructor(private mealService: MealService,
              private toastService: ToastService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private router: Router) {
  }

  ngOnInit() {
  }

  addMealForm = this.formBuilder.group({
    mealDate: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'), Validators.required],
    name: ['', Validators.required],
    kilocalories: [0],
    carbohydrates: [0],
    proteins: [0],
    fat: [0],
    salt: [0]
  });

  validateAndSendMealForm(addMealForm: FormGroup) {
    if (addMealForm.valid) {
      this.formFailedValidation = false;
      this.mealService.addMeal(addMealForm.value).subscribe(async responseData => {
        this.mealService.notifyAboutMealsChange();
        this.clearActivityFormData();
        await this.toastService.presentToast('success', 'TOAST_MESSAGES.MEAL_ADD_SUCCESS');
        await this.router.navigate(['tabs', 'diet']);
      }, async () => {
        await this.toastService.presentToast('error', 'TOAST_MESSAGES.MEAL_ADD_ERROR');
      });
    } else {
      this.formFailedValidation = true;
    }
  }

  clearActivityFormData() {
    this.addMealForm.patchValue({
      mealDate: this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm'),
      name: '',
      kilocalories: 0,
      carbohydrates: 0,
      proteins: 0,
      fat: 0,
      salt: 0
    });
    this.addMealForm.markAsPristine();
    this.addMealForm.markAsUntouched();
  }

  addKilocalories() {
    let currentKilocalories = this.addMealForm.get('kilocalories')?.value!;
    this.addMealForm.get('kilocalories')?.patchValue(currentKilocalories + 10);
  }

  subtractKilocalories() {
    let currentKilocalories = this.addMealForm.get('kilocalories')?.value!;
    if (currentKilocalories > 10) {
      this.addMealForm.get('kilocalories')?.patchValue(currentKilocalories - 10);
    } else if (currentKilocalories > 0) {
      this.addMealForm.get('kilocalories')?.patchValue(currentKilocalories - currentKilocalories);
    }
  }

  addCarbohydrates() {
    let currentCarbohydrates = this.addMealForm.get('carbohydrates')?.value!;
    this.addMealForm.get('carbohydrates')?.patchValue(currentCarbohydrates + 5);
  }

  subtractCarbohydrates() {
    let currentCarbohydrates = this.addMealForm.get('carbohydrates')?.value!;
    if (currentCarbohydrates > 5) {
      this.addMealForm.get('carbohydrates')?.patchValue(currentCarbohydrates - 5);
    } else if (currentCarbohydrates > 0) {
      this.addMealForm.get('carbohydrates')?.patchValue(currentCarbohydrates - currentCarbohydrates);
    }
  }

  addProteins() {
    let currentProteins = this.addMealForm.get('proteins')?.value!;
    this.addMealForm.get('proteins')?.patchValue(currentProteins + 5);
  }

  subtractProteins() {
    let currentProteins = this.addMealForm.get('proteins')?.value!;
    if (currentProteins > 5) {
      this.addMealForm.get('proteins')?.patchValue(currentProteins - 5);
    } else if (currentProteins > 0) {
      this.addMealForm.get('proteins')?.patchValue(currentProteins - currentProteins);
    }
  }

  addFat() {
    let currentFat = this.addMealForm.get('fat')?.value!;
    this.addMealForm.get('fat')?.patchValue(currentFat + 5);
  }

  subtractFat() {
    let currentFat = this.addMealForm.get('fat')?.value!;
    if (currentFat > 5) {
      this.addMealForm.get('fat')?.patchValue(currentFat - 5);
    } else if (currentFat > 0) {
      this.addMealForm.get('fat')?.patchValue(currentFat - currentFat);
    }
  }

  addSalt() {
    let currentSalt = this.addMealForm.get('salt')?.value!;
    this.addMealForm.get('salt')?.patchValue(currentSalt + 5);
  }

  subtractSalt() {
    let currentSalt = this.addMealForm.get('salt')?.value!;
    if (currentSalt > 5) {
      this.addMealForm.get('salt')?.patchValue(currentSalt - 5);
    } else if (currentSalt > 0) {
      this.addMealForm.get('salt')?.patchValue(currentSalt - currentSalt);
    }
  }
}

