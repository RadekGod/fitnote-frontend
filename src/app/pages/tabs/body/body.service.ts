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

  getLatestGeneralMeasurement(): Observable<GeneralMeasurementDto> {
    return this.httpClient.get<GeneralMeasurementDto>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL + '/latest', { withCredentials:true });
  }

  addNewGeneralMeasurement(generalMeasurementDto: GeneralMeasurementDto): Observable<GeneralMeasurementDto> {
    return this.httpClient.post<GeneralMeasurementDto>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL, generalMeasurementDto,{ withCredentials: true });
  }

  editGeneralMeasurement(generalMeasurementId: number, generalMeasurementDto: GeneralMeasurementDto): Observable<any> {
    generalMeasurementDto.id = generalMeasurementId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.GENERAL_MEASUREMENTS_API_URL + `/${generalMeasurementId}`, generalMeasurementDto);
  }

  getLatestBodyMeasurement(): Observable<BodyMeasurementDto> {
    return this.httpClient.get<BodyMeasurementDto>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL + '/99999', { withCredentials: true })
  }

  addNewBodyMeasurement(bodyMeasurementDto: BodyMeasurementDto): Observable<BodyMeasurementDto> {
    return this.httpClient.post<BodyMeasurementDto>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL, bodyMeasurementDto, { withCredentials: true });
  }

  editBodyMeasurement(bodyMeasurementId: number, bodyMeasurementDto: BodyMeasurementDto): Observable<any> {
    bodyMeasurementDto.id = bodyMeasurementId;
    return this.httpClient.put<void>(environment.rootUrl + AppConstants.BODY_MEASUREMENTS_API_URL + `/${bodyMeasurementId}`, bodyMeasurementDto);
  }

  addGalleryPhoto(formData: FormData)  {
    return this.httpClient.post(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL, formData,{ withCredentials: true });
  }

  getAllGalleryPhotos(): Observable<GalleryPhotoDto[]> {
    return this.httpClient.get<GalleryPhotoDto[]>(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL,{ withCredentials: true });
  }

  getGalleryPhoto(galleryPhotoId: number): Observable<GalleryPhotoDto> {
    return this.httpClient.get<GalleryPhotoDto>(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL + `/${galleryPhotoId}`,{ withCredentials: true });
  }

  getLatestGalleryPhoto(): Observable<GalleryPhotoDto> {
    return this.httpClient.get<GalleryPhotoDto>(environment.rootUrl + AppConstants.PHOTO_GALLERY_API_URL + '/latest',{ withCredentials: true });
  }
}
