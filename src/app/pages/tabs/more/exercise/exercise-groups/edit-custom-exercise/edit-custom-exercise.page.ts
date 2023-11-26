import {Component, OnInit} from '@angular/core';
import {Photo} from "@capacitor/camera";
import {ExerciseType} from "../../../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../../../commons/enums/muscles.enum";
import {LocalFile} from "../../../../../../commons/models/local-file.model";
import {UrlService} from "../../../../../../commons/services/url/url.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ImageService} from "../../../../../../commons/services/file/image.service";
import {ExerciseService} from "../../exercise.service";
import {environment} from "../../../../../../../environments/environment";
import {IMAGE_FORMAT_PREFIX} from "../../../../../../commons/constants/constants";
import {AlertOptions} from "@ionic/angular";
import {CreateExerciseCategoryGroups} from "../../../../../../commons/enums/create-exercise-category-groups.enum";
import {ExerciseDto} from "../../../../training-plans/model/exercise-dto.model";
import {ToastService} from "../../../../../../commons/services/toast/toast.service";

@Component({
  selector: 'app-edit-custom-exercise',
  templateUrl: './edit-custom-exercise.page.html',
  styleUrls: ['./edit-custom-exercise.page.scss',
    '../add-custom-exercise/add-custom-exercise.page.scss']
})
export class EditCustomExercisePage implements OnInit {

  image: Photo | null = null;
  imageToDisplay: string = '';
  previousUrl: string = '';
  exerciseTypes = ExerciseType;
  muscles = Muscles;
  exerciseCategoryGroups = CreateExerciseCategoryGroups;
  exerciseId = Number(this.route.snapshot.paramMap.get('exerciseId'));
  exercise!: ExerciseDto;
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


  editCustomExerciseForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    exerciseType: ['', Validators.required],
    exerciseCategoryGroups: [['']],
    mainMuscles: [['']],
    supportiveMuscles: [['']]
  });

  constructor(private urlService: UrlService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private imageService: ImageService,
              private toastService: ToastService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.getPreviousUrl();
    this.fetchExercise();
  }

  getPreviousUrl() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }

  fetchExercise() {
    this.exerciseService.getExercise(this.exerciseId).subscribe(async response => {
      this.exercise = response;
      this.fillFormFields(response);
      console.log('response', response);
      if (response.applicationFile) {
        let localImage = await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, response.applicationFile);
        this.image = {format: IMAGE_FORMAT_PREFIX, saved: true, base64String: localImage?.data};
        this.imageToDisplay = this.image.base64String!;
      }
    });
  }

  private fillFormFields(exerciseDto: ExerciseDto) {
    const categoryGroups = exerciseDto?.exerciseCategoryGroups
      .filter(category => category.categoryName !== 'CUSTOM')
      .map(category => category.categoryName);
    this.editCustomExerciseForm.patchValue({
      name: exerciseDto?.name ?? '',
      description: exerciseDto?.description ?? '',
      exerciseType: exerciseDto?.exerciseType ?? '',
      exerciseCategoryGroups: categoryGroups,
      mainMuscles: exerciseDto.mainMuscles ?? [''],
      supportiveMuscles: exerciseDto.supportiveMuscles ?? ['']
    });
  }

  validateAndEditCustomExercise(editCustomExerciseForm: FormGroup) {
    console.log('this.image:', this.image);
    if (this.editCustomExerciseForm.valid) {
      this.formFailedValidation = false;
      const formData: FormData = new FormData();
      if (this.image && this.image != null) {
        const fileName = new Date().getTime() + '.jpeg';
        formData.append('image', this.imageService.convertBase64ImageToBlob(this.image), fileName);

        this.exerciseService.editCustomExercise(this.exerciseId, editCustomExerciseForm, formData).subscribe(async () => {
          if (this.exercise.applicationFile) {
            try {
              await this.imageService.deleteImageFromDevice(environment.customExercisesDirectory, this.exercise.applicationFile.fileName);
            } catch (e) {
              console.log(e);
            }
          }
          await this.imageService.saveImageOnDevice(this.image!, environment.customExercisesDirectory, fileName);
          this.exerciseService.notifyAboutExercisesChange();
          await this.toastService.presentToast('success', 'TOAST_MESSAGES.EXERCISE_UPDATE_SUCCESS');
          await this.router.navigate(this.previousUrl ? this.previousUrl.split('/') : ['tabs', 'training-plans']);
        }, async () => {
          await this.toastService.presentToast('error', 'TOAST_MESSAGES.EXERCISE_UPDATE_ERROR');
        });
      } else {
        this.exerciseService.editCustomExercise(this.exerciseId, editCustomExerciseForm, formData).subscribe(async () => {
          this.exerciseService.notifyAboutExercisesChange();
          await this.toastService.presentToast('success', 'TOAST_MESSAGES.EXERCISE_UPDATE_SUCCESS');
          await this.router.navigate(this.previousUrl ? this.previousUrl.split('/') : ['tabs', 'training-plans']);
        }, async () => {
          await this.toastService.presentToast('error', 'TOAST_MESSAGES.EXERCISE_UPDATE_ERROR');
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
}
