import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {BodyMeasurementDto} from "./model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "./model/general-measurement-dto.model";
import {AppConstants} from "../../../configuration/app.constants";
import {GalleryPhotoDto} from "./model/gallery-photo-dto.model";

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  constructor(private httpClient: HttpClient) {

  }

  public generalMeasurementChange = new Subject<void>();
  public bodyMeasurementChange = new Subject<void>();
  public galleryPhotoChange = new Subject<void>();

  notifyAboutGeneralMeasurementChange(): void {
    this.generalMeasurementChange.next();
  }

  notifyAboutBodyMeasurementChange(): void {
    this.bodyMeasurementChange.next();
  }

  notifyAboutGalleryPhotoChange(): void {
    this.galleryPhotoChange.next();
  }

  getAllGeneralMeasurements(): Observable<GeneralMeasurementDto[]> {
    return this.httpClient.get<GeneralMeasurementDto[]>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL, { withCredentials:true });
  }

  getLatestGeneralMeasurement(): Observable<GeneralMeasurementDto> {
    return this.httpClient.get<GeneralMeasurementDto>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL + '/latest', { withCredentials:true });
  }

  addNewGeneralMeasurement(generalMeasurementDto: GeneralMeasurementDto): Observable<GeneralMeasurementDto> {
    return this.httpClient.post<GeneralMeasurementDto>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL, generalMeasurementDto);
  }

  editGeneralMeasurement(generalMeasurementId: number, generalMeasurementDto: GeneralMeasurementDto): Observable<any> {
    generalMeasurementDto.id = generalMeasurementId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL + `/${generalMeasurementId}`, generalMeasurementDto);
  }

  deleteGeneralMeasurement(generalMeasurementId: number): Observable<any> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL + `/${generalMeasurementId}`);
  }

  getAllBodyMeasurements(): Observable<BodyMeasurementDto[]> {
    return this.httpClient.get<BodyMeasurementDto[]>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL, { withCredentials:true });
  }

  getLatestBodyMeasurement(): Observable<BodyMeasurementDto> {
    return this.httpClient.get<BodyMeasurementDto>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL + '/latest')
  }

  addNewBodyMeasurement(bodyMeasurementDto: BodyMeasurementDto): Observable<BodyMeasurementDto> {
    return this.httpClient.post<BodyMeasurementDto>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL, bodyMeasurementDto);
  }

  editBodyMeasurement(bodyMeasurementId: number, bodyMeasurementDto: BodyMeasurementDto): Observable<void> {
    bodyMeasurementDto.id = bodyMeasurementId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL + `/${bodyMeasurementId}`, bodyMeasurementDto);
  }

  deleteBodyMeasurement(bodyMeasurementId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL + `/${bodyMeasurementId}`);
  }

  addGalleryPhoto(formData: FormData)  {
    return this.httpClient.post(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL, formData);
  }

  getAllGalleryPhotos(): Observable<GalleryPhotoDto[]> {
    return this.httpClient.get<GalleryPhotoDto[]>(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL);
  }

  getGalleryPhoto(galleryPhotoId: number): Observable<GalleryPhotoDto> {
    return this.httpClient.get<GalleryPhotoDto>(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL + `/${galleryPhotoId}`);
  }

  getLatestGalleryPhoto(): Observable<GalleryPhotoDto> {
    return this.httpClient.get<GalleryPhotoDto>(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL + '/latest');
  }
}
