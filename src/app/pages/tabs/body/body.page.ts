import {Component, OnInit} from '@angular/core';
import {BodyService} from "./body.service";
import {BodyMeasurementDto} from "./model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "./model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../commons/services/user/user.service";
import {MeasurementUnitsService} from "../../../commons/services/mesurement-units/measurement-units.service";
import {LocalFile} from "../../../commons/models/local-file.model";
import {LoadingController, Platform} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";
import {Directory, FileInfo, Filesystem} from "@capacitor/filesystem";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {ThisReceiver} from "@angular/compiler";
import {decode} from "base64-arraybuffer";
import {environment} from "../../../../environments/environment";
import {GalleryPhotoDto} from "./model/gallery-photo.model";
import {images} from "ionicons/icons";
import * as stream from "stream";

class ImageRow {
  images: string[] = [];
}

@Component({
  selector: 'app-body',
  templateUrl: './body.page.html',
  styleUrls: ['./body.page.scss'],
})
export class BodyPage implements OnInit {

  // segmentValue: string = 'measurements';
  segmentValue: string = 'photoGallery';
  bodyMeasurement: BodyMeasurementDto | null = null;
  generalMeasurement: GeneralMeasurementDto | null = null;
  private generalMeasurementSubscription!: Subscription;
  private bodyMeasurementSubscription!: Subscription;
  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;



  // images: LocalFile[] = [];
  images: ImageRow[] =  [];


  constructor(private bodyService: BodyService,
              private userService: UserService,
              private measurementUnitsService: MeasurementUnitsService,
              private platform: Platform, private loadingCtrl: LoadingController) {
  }

  async ngOnInit() {
    await this.initializeImageDirectoryIfNotExists();
    this.initializeMeasurementUnitsShortcuts();
    this.initializeGeneralMeasurements();
    this.initializeBodyMeasurements();

    this.loadImages();
    await this.loadFiles();
  }

  loadImages() {
    this.bodyService.getAllGalleryPhotos().subscribe((response: GalleryPhotoDto[]) => {
      console.log('pobrane zdjęcia z galerii: ', response);
      const numberOfImagesPerRow: number = 4;
      let currentImageNumberInRow: number = 0;
      let imageRow: ImageRow = new ImageRow();
      let imagesInRow: string[] = [];
      for( let i = 0; i < response.length; i++) {
        imageRow.images.push('data:image/jpg;base64,' + response[i].applicationFile.data);
        currentImageNumberInRow ++;
        if (currentImageNumberInRow === numberOfImagesPerRow || i === response.length - 1) {
          this.images.push(imageRow);
          imageRow = new ImageRow();
          currentImageNumberInRow = 0;
        } else {

        }
      }

      console.log('Images po zapełnieniu: ', this.images);
    });
  }

  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
    });
  }

  initializeGeneralMeasurements() {
    this.fetchLatestGeneralMeasurement();
    this.generalMeasurementSubscription = this.listenForGeneralMeasurementChange();
  }

  listenForGeneralMeasurementChange() {
    return this.bodyService.generalMeasurementChange.subscribe(() => {
      this.fetchLatestGeneralMeasurement();
    });
  }

  initializeBodyMeasurements() {
    this.fetchLatestBodyMeasurement();
    this.bodyMeasurementSubscription = this.listenForBodyMeasurementChange();
  }

  listenForBodyMeasurementChange() {
    return this.bodyService.bodyMeasurementChange.subscribe(() => {
      this.fetchLatestBodyMeasurement();
    });
  }

  fetchLatestBodyMeasurement() {
    this.bodyService.getLatestBodyMeasurement().subscribe(response => {
      this.bodyMeasurement = response;
    });
  }

  fetchLatestGeneralMeasurement() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.generalMeasurement = response;
    });
  }

  changeSegmentValue(value: string) {
    this.segmentValue = value;
  }

  getMeasurementUnitsShortcuts() {
    this.lengthUnitShortcut = this.measurementUnitsService.lengthUnitShortcut;
    this.weightUnitShortcut = this.measurementUnitsService.weightUnitShortcut;
  }














  async initializeImageDirectoryIfNotExists() {
    try {
      let ret = await Filesystem.mkdir({
        path: environment.imageDir,
        directory: Directory.Data,
        recursive: false,
      });
      console.log("folder ", ret);
    } catch (e) {
      console.log("Unable to make directory", e);
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

  async loadFileData(fileNames: FileInfo[]) {
    for (let f of fileNames) {
      const filePath = `${environment.imageDir}/${f.name}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });

      // this.images.push({
      //   name: f.name,
      //   path: filePath,
      //   data: `data:image/jpeg;base64,${readFile.data}`
      // })
      console.log('READ: ', readFile);
    }


  }



}
