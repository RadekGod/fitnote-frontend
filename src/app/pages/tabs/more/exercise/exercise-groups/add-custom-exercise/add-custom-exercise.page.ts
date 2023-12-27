import {Component, OnInit} from '@angular/core';
import {UrlService} from "../../../../../../commons/services/url/url.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExerciseType} from "../../../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../../../commons/enums/muscles.enum";
import {Photo} from "@capacitor/camera";
import {IMAGE_FORMAT_PREFIX} from "../../../../../../commons/constants/constants";
import {ImageService} from "../../../../../../commons/services/file/image.service";
import {ExerciseService} from "../../exercise.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../../../../environments/environment";
import {CreateExerciseCategoryGroups} from "../../../../../../commons/enums/create-exercise-category-groups.enum";
import {ToastService} from "../../../../../../commons/services/toast/toast.service";

interface AlertOptions {
  header: string;
  subHeader: string;
  message?: string;
}


@Component({
  selector: 'app-add-custom-exercise',
  templateUrl: './add-custom-exercise.page.html',
  styleUrls: ['./add-custom-exercise.page.scss'],
})
export class AddCustomExercisePage implements OnInit {

  image: Photo | null = null;
  imageToDisplay: string = '';
  previousUrl: string = '';
  exerciseTypes = ExerciseType;
  muscles = Muscles;
  exerciseCategoryGroups = CreateExerciseCategoryGroups;
  formFailedValidation: boolean = false;


  exerciseTypeOptions: AlertOptions = {
    header: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_TYPE.HEADER'),
    subHeader: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_TYPE.SUBHEADER')
  };

  exerciseGroupOptions: AlertOptions = {
    header: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_GROUPS.HEADER'),
    subHeader: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.EXERCISE_GROUPS.SUBHEADER')
  }

  mainMusclesOptions: AlertOptions = {
    header: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.MAIN_MUSCLES.HEADER'),
    subHeader: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.MAIN_MUSCLES.SUBHEADER')
  };

  supportiveMusclesOptions: AlertOptions = {
    header: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.SUPPORTIVE_MUSCLES.HEADER'),
    subHeader: this.translate.instant('EXERCISE.ADD_CUSTOM_EXERCISE.ALERTS.SUPPORTIVE_MUSCLES.SUBHEADER')
  };


  constructor(private urlService: UrlService, private router: Router,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private imageService: ImageService,
              private toastService: ToastService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }

  addCustomExerciseForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    exerciseType: ['', Validators.required],
    exerciseCategoryGroups: [['']],
    mainMuscles: [['']],
    supportiveMuscles: [['']]
  });

  validateAndAddCustomExercise(addCustomExerciseForm: FormGroup) {
    if (this.addCustomExerciseForm.valid) {
      this.formFailedValidation = false;
      const formData: FormData = new FormData();
      if (this.image) {
        const fileName = new Date().getTime() + '.jpeg';
        formData.append('image', this.imageService.convertBase64ImageToBlob(this.image), fileName);

        this.exerciseService.addCustomExercise(addCustomExerciseForm, formData).subscribe(async () => {
          await this.imageService.saveImageOnDevice(this.image!, environment.customExercisesDirectory, fileName);
          this.exerciseService.notifyAboutExercisesChange();
          await this.toastService.presentToast('success', 'TOAST_MESSAGES.EXERCISE_ADD_SUCCESS');
          await this.router.navigate(this.previousUrl ? this.previousUrl.split('/') : ['tabs', 'training-plans']);
          this.clearExerciseFormData();
        }, async () => {
          await this.toastService.presentToast('error', 'TOAST_MESSAGES.EXERCISE_ADD_ERROR');
        });
      } else {
        this.exerciseService.addCustomExercise(addCustomExerciseForm, formData).subscribe(async () => {
          this.exerciseService.notifyAboutExercisesChange();
          await this.toastService.presentToast('success', 'TOAST_MESSAGES.EXERCISE_ADD_SUCCESS');
          await this.router.navigate(this.previousUrl ? this.previousUrl.split('/') : ['tabs', 'training-plans']);
          this.clearExerciseFormData();
        }, async () => {
          await this.toastService.presentToast('error', 'TOAST_MESSAGES.EXERCISE_ADD_ERROR');
        });
      }
    } else {
      this.formFailedValidation = true;
    }
  }

  async selectImageToUpload() {
    this.image = await this.imageService.selectImageFromDiskOrTakePhoto();
    this.imageToDisplay = IMAGE_FORMAT_PREFIX + this.image.base64String;
  }

  clearExerciseFormData() {
    this.image = null;
    this.imageToDisplay = '';
    this.addCustomExerciseForm.patchValue({
      name: '',
      description: '',
      exerciseType: '',
      exerciseCategoryGroups: [''],
      mainMuscles: [''],
      supportiveMuscles: ['']
    });
    this.addCustomExerciseForm.markAsPristine();
    this.addCustomExerciseForm.markAsUntouched();
  }
}
