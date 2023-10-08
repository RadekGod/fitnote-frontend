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
import {LocalImage} from "../../../commons/models/application-image-model";
import {ApplicationFile} from "../../../commons/models/application-file.model";
import {ImageService} from "../../../commons/services/file/image.service";


interface GalleryPhotoImage {
  id: number,
  note: string,
  image: LocalImage
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
  private galleryPhotosSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;


  // images: LocalFile[] = [];
  // images: ImageRow[] =  [];
  images: GalleryPhotoImage[] = [];


  constructor(private bodyService: BodyService,
              private userService: UserService,
              private measurementUnitsService: MeasurementUnitsService,
              private imageService: ImageService,
              private platform: Platform, private loadingCtrl: LoadingController) {
  }

  async ngOnInit() {
    await this.initializeImageDirectoryIfNotExists();
    this.initializeMeasurementUnitsShortcuts();
    this.initializeGeneralMeasurements();
    this.initializeBodyMeasurements();
    this.initializePhotoGallery();

    // await this.loadFiles();
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

  fetchLatestGeneralMeasurement() {
    this.bodyService.getLatestGeneralMeasurement().subscribe(response => {
      this.generalMeasurement = response;
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

  initializePhotoGallery() {
    this.fetchAllGalleryPhotos();
    this.galleryPhotosSubscription = this.listenForGalleryPhotoChange();
  }

  listenForGalleryPhotoChange() {
    return this.bodyService.galleryPhotoChange.subscribe(() => {
      this.fetchLatestGalleryPhoto();
    });
  }

  fetchAllGalleryPhotos() {
    this.bodyService.getAllGalleryPhotos().subscribe(async (responseDto: GalleryPhotoDto[]) => {
      console.log('pobrane zdjęcia z galerii: ', responseDto);

      for (const response of responseDto) {
        let image = await this.imageService.loadImageFromDevice(response.applicationFile);

        this.images.push({
          id: response.id,
          note: response.note,
          image: image
        } as GalleryPhotoImage);
      }
      console.log('Images po zapełnieniu: ', this.images);
    });
  }

  fetchLatestGalleryPhoto() {
    this.bodyService.getLatestGalleryPhoto().subscribe(async (responseDto: GalleryPhotoDto) => {
      console.log('pobrane zdjęcie z galerii: ', responseDto);

        let image = await this.imageService.loadImageFromDevice(responseDto.applicationFile);

        this.images.unshift({
          id: responseDto.id,
          note: responseDto.note,
          image: image
        } as GalleryPhotoImage);

      console.log('Images po zapełnieniu: ', this.images);
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
        path: environment.photoGalleryDirectory,
        directory: Directory.Data,
        recursive: false,
      });
      console.log("folder ", ret);
    } catch (e) {
      console.log("Unable to make directory", e);
    }
  }
}
