import { Component, OnInit } from '@angular/core';
import {Directory, FileInfo, Filesystem} from "@capacitor/filesystem";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";
import {decode} from "base64-arraybuffer";
import {environment} from "../../../../../../environments/environment";
import {LoadingController, Platform} from "@ionic/angular";
import {LocalFile} from "../../../../../commons/models/local-file.model";
import {BodyService} from "../../body.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Muscles} from "../../../../../commons/enums/muscles.enum";
import {ExerciseGroups} from "../../../../../commons/enums/exercise-categories.enum";
import {ExerciseType} from "../../../../../commons/enums/exercise-types.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {

  images: LocalFile[] = [];
  imageToDisplay = '';
  imageToUpload!: Blob;

  addPhotoForm = this.formBuilder.group({
    note: ['']
  });

  constructor(private platform: Platform,
              private loadingCtrl: LoadingController,
              private bodyService: BodyService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }

  temp(formGroup: FormGroup) {
    const formData: FormData = new FormData();
    if (this.imageToUpload) {
      formData.append('image', this.imageToUpload);
      formData.append('photoInfo', new Blob([JSON.stringify(this.addPhotoForm.value)], {
        type: 'application/json'
      }));
    }

    console.log('formGroup: ' + formGroup.value);
    console.log('formData image:', formData.get('image'));
    console.log('formData photoInfo:', formData.get('photoInfo'));
    this.bodyService.addGalleryPhoto(formData).subscribe(() => {
      this.router.navigate(['tabs', 'body'])
    });
  }


  async loadFileData(fileNames: FileInfo[]) {
    for (let f of fileNames) {
      const filePath = `${environment.imageDir}/${f.name}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });

      this.images.push({
        name: f.name,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      })
      console.log('READ: ', readFile);
    }
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'loading data..'
    });

    Filesystem.readdir({
      directory: Directory.Data,
      path: environment.imageDir
    }).then(result => {
      console.log('HERE: ', result);
      this.loadFileData(result.files);
    }, async err => {
      console.log('err:', err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: environment.imageDir
      });
    }).then(() => {
      loading.dismiss();
    });
  }

  async selectImageToUpload() {
    let image: Photo;
    if (this.platform.is('hybrid')) {
      image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
    } else {
      image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
    }

    console.log(image);
    if (image) {

      this.imageToDisplay = 'data:image/jpg;base64,' + image.base64String;
      this.imageToUpload = new Blob([new Uint8Array(decode(image.base64String!))], {
        type: `image/${image.format}`
      });
      console.log('blob: ', this.imageToUpload);

      // await this.uploadFile(this.imageToUpload);





      // this.saveImage(image);
    }
  }

  convertBase64ToImage() {

  }

  async saveImage(photo: Photo) {
    const base64Data = photo.base64String!;
    // const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${environment.imageDir}/${fileName}`,
      data: base64Data
    });
    console.log('saved:', savedFile);
    await this.loadFiles();
  }

  async uploadFile(file: Blob) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.bodyService.addGalleryPhoto(formData);
  }

  // async readAsBase64(photo: Photo) {
  //   if (this.platform.is('hybrid')) {
  //     const file = await Filesystem.readFile({
  //       path: photo.path!
  //     });
  //     console.log('file: ', file);
  //     return file.data;
  //   } else {
  //     const response = await fetch(photo.webPath!);
  //     const blob = await response.blob();
  //     return await this.convertBlobToBase64(blob) as string;
  //   }
  // }
  //
  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onerror = reject;
  //   reader.onload = () => {
  //     resolve(reader.result);
  //   };
  //   reader.readAsDataURL(blob);
  // });

  protected readonly Muscles = Muscles;
  protected readonly ExerciseGroups = ExerciseGroups;
  protected readonly ExerciseType = ExerciseType;
}
