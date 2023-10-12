import {Component, OnInit} from '@angular/core';
import {Photo} from "@capacitor/camera";
import {LoadingController, Platform} from "@ionic/angular";
import {LocalFile} from "../../../../../commons/models/local-file.model";
import {BodyService} from "../../body.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ImageService} from "../../../../../commons/services/file/image.service";
import {IMAGE_FORMAT_PREFIX} from "../../../../../commons/constants/constants";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {

  images: LocalFile[] = [];
  image!: Photo;
  imageToDisplay = '';

  addBodyPhotoForm = this.formBuilder.group({
    note: ['']
  });

  constructor(private platform: Platform,
              private loadingCtrl: LoadingController,
              private bodyService: BodyService,
              private formBuilder: FormBuilder,
              private imageService: ImageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  addGalleryPhoto() {
    const formData: FormData = new FormData();
    if (this.image) {
        const fileName = new Date().getTime() + '.jpeg';
      formData.append('image', this.imageService.convertBase64ImageToBlob(this.image), fileName);
      formData.append('photoInfo', new Blob([JSON.stringify(this.addBodyPhotoForm.value)], {
        type: 'application/json'
      }));
      this.bodyService.addGalleryPhoto(formData).subscribe(async () => {
        await this.imageService.saveImageOnDevice(this.image, environment.photoGalleryDirectory, fileName);
        this.bodyService.notifyAboutGalleryPhotoChange();
        await this.router.navigate(['tabs', 'body']);
      });
    }
  }

  // async saveImage(photo: Photo) {
  //   const base64Data = photo.base64String!;
  //   // const base64Data = await this.readAsBase64(photo);
  //   console.log(base64Data);
  //   const fileName = new Date().getTime() + '.jpeg';
  //   const savedFile = await Filesystem.writeFile({
  //     directory: Directory.Data,
  //     path: `${environment.photoGalleryDirectory}/${fileName}`,
  //     data: base64Data
  //   });
  //   console.log('saved:', savedFile);
  //   // await this.loadFiles();
  // }

  async selectImageToUpload() {
    this.image = await this.imageService.selectImageFromDiskOrTakePhoto();
    this.imageToDisplay = IMAGE_FORMAT_PREFIX + this.image.base64String;
  }






  // async uploadFile(file: Blob) {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //   this.bodyService.addGalleryPhoto(formData);
  // }

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
}
