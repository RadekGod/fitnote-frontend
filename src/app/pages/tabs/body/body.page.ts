import {Component, OnInit} from '@angular/core';
import {BodyService} from "./body.service";
import {BodyMeasurementDto} from "./model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "./model/general-measurement-dto.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../commons/services/user/user.service";
import {MeasurementUnitsService} from "../../../commons/services/mesurement-units/measurement-units.service";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {environment} from "../../../../environments/environment";
import {GalleryPhotoDto} from "./model/gallery-photo-dto.model";
import {ImageService} from "../../../commons/services/file/image.service";
import {GalleryPhotoImage} from "../../../commons/models/gallery-photo-image.model";


@Component({
  selector: 'app-body',
  templateUrl: './body.page.html',
  styleUrls: ['./body.page.scss'],
})
export class BodyPage implements OnInit {

  segmentValue: string = 'measurements';
  bodyMeasurement: BodyMeasurementDto | null = null;
  generalMeasurement: GeneralMeasurementDto | null = null;
  private generalMeasurementSubscription!: Subscription;
  private bodyMeasurementSubscription!: Subscription;
  private galleryPhotosSubscription!: Subscription;
  private measurementUnitsSubscription!: Subscription;
  lengthUnitShortcut!: string;
  weightUnitShortcut!: string;


  images: GalleryPhotoImage[] = [];


  constructor(private bodyService: BodyService,
              private userService: UserService,
              private measurementUnitsService: MeasurementUnitsService,
              private imageService: ImageService) {
  }

  async ngOnInit() {
    await this.initializeImageDirectoryIfNotExists();
    this.initializeMeasurementUnitsShortcuts();
    this.initializeGeneralMeasurements();
    this.initializeBodyMeasurements();
    this.initializePhotoGallery();
  }



  initializeMeasurementUnitsShortcuts() {
    this.getMeasurementUnitsShortcuts();
    this.measurementUnitsSubscription = this.listenForMeasurementUnitChange();
  }

  listenForMeasurementUnitChange() {
    return this.measurementUnitsService.measurementUnitsChange.subscribe(() => {
      this.getMeasurementUnitsShortcuts();
      this.fetchLatestGeneralMeasurement();
      this.fetchLatestBodyMeasurement();
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
      for (const response of responseDto) {
        let image = await this.imageService.loadImageFromDevice(environment.photoGalleryDirectory, response.applicationFile);

        this.images.push({
          id: response.id,
          note: response.note,
          image: image
        } as GalleryPhotoImage);
      }
    });
  }

  fetchLatestGalleryPhoto() {
    this.bodyService.getLatestGalleryPhoto().subscribe(async (responseDto: GalleryPhotoDto) => {
        let image = await this.imageService.loadImageFromDevice(environment.photoGalleryDirectory, responseDto.applicationFile);

        this.images.unshift({
          id: responseDto.id,
          note: responseDto.note,
          image: image
        } as GalleryPhotoImage);
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
    } catch (e) {
      console.log("Unable to make directory");
    }
  }
}
