import {Component, OnInit} from '@angular/core';
import {UrlService} from "../../../../../../commons/services/url/url.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BodyMeasurementDto} from "../../../../body/model/body-measurement-dto.model";
import {ExerciseType} from "../../../../../../commons/enums/exercise-types.enum";
import {Muscles} from "../../../../../../commons/enums/muscles.enum";
import {ExerciseGroups} from "../../../../../../commons/enums/exercise-categories.enum";
import {Camera, CameraResultType, CameraSource, GalleryPhoto, Photo} from "@capacitor/camera";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {Platform} from "@ionic/angular";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {LocalFile} from "../../../../../../commons/models/local-file.model";

const IMAGE_DIR = 'stored-images';

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

  previousUrl: string = '';
  exerciseTypes = ExerciseType;
  muscles = Muscles;
  exerciseGroups = ExerciseGroups;


  images: LocalFile[] = [];


  exerciseTypeOptions: AlertOptions = {
    header: 'Rodzaj ćwiczenia',
    subHeader: 'Wybierz rodzaj ćwiczenia'
  };

  exerciseGroupOptions: AlertOptions = {
    header: 'Grupy ćwiczenia',
    subHeader: 'Wybierz grupy ćwiczenia'
  }

  mainMusclesOptions: AlertOptions = {
    header: 'Główne grupy mięśni',
    subHeader: 'Wybierz główne grupy mięśni'
  };

  supportiveMusclesOptions: AlertOptions = {
    header: 'Wspierające grupy mięśni',
    subHeader: 'Wybierz wspierające grupy mięśni'
  };

  exerciseEquipmentOptions: AlertOptions = {
    header: 'Sprzęt',
    subHeader: 'Wybierz sprzęt potrzebny do wykonania ćwiczenia'
  };



  constructor(private urlService: UrlService, private router: Router,
              private formBuilder: FormBuilder,
              private platform: Platform) {
  }

  ngOnInit() {
    console.log(this.exerciseTypes);
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });

    this.loadFiles();
  }

  async loadFiles() {

  }

  addCustomExerciseForm = this.formBuilder.group({
    exerciseName: [''],
    exerciseInstruction: [''],
    exerciseGroup: [''],
    exerciseType: [''],
    mainMuscleGroups: [''],
    supportiveMuscleGroups: ['']
    // exerciseEquipment: [''],
  });

  validateAndSendMeasurementForm(addCustomExerciseForm: FormGroup) {
    console.log(addCustomExerciseForm);
    let bodyMeasurement: BodyMeasurementDto = addCustomExerciseForm.value;
    // this.bodyService.addNewBodyMeasurement(bodyMeasurement).subscribe(responseData => {
    //   this.bodyService.notifyAboutBodyMeasurementChange();
    //   this.router.navigate(['tabs', 'body']);
    // });
  }

  log() {
    console.log(this.addCustomExerciseForm.value);
  }

  async loadFileData(fileNames: string[]) {

  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log(image);
    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {

    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    });
    console.log('saved:', savedFile);
    this.loadFiles();
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

}
