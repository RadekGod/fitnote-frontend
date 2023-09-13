import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AppConstants} from "../../../parameters/app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {BodyMeasurementDto} from "./model/body-measurement-dto.model";
import {GeneralMeasurementDto} from "./model/general-measurement-dto.model";

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  constructor(private httpClient: HttpClient) {

  }

  public generalMeasurementChange = new Subject<void>();
  public bodyMeasurementChange = new Subject<void>();

  notifyAboutGeneralMeasurementChange(): void {
    this.generalMeasurementChange.next();
  }

  notifyAboutBodyMeasurementChange(): void {
    this.bodyMeasurementChange.next();
  }

  getLatestGeneralMeasurement(): Observable<GeneralMeasurementDto> {
    return this.httpClient.get<GeneralMeasurementDto>(environment.rooturl + AppConstants.GENERAL_MEASUREMENTS_API_URL + '/latest', { withCredentials:true });
  }

  addNewGeneralMeasurement(generalMeasurementDto: GeneralMeasurementDto): Observable<GeneralMeasurementDto> {
    console.log('generalMeasurementDto', generalMeasurementDto);
    return this.httpClient.post<GeneralMeasurementDto>(environment.rooturl + AppConstants.GENERAL_MEASUREMENTS_API_URL, generalMeasurementDto,{ withCredentials: true });
  }

  editGeneralMeasurement(generalMeasurementId: number, generalMeasurementDto: GeneralMeasurementDto): Observable<any> {
    generalMeasurementDto.id = generalMeasurementId;
    return this.httpClient.put<void>(environment.rooturl + AppConstants.GENERAL_MEASUREMENTS_API_URL + `/${generalMeasurementId}`, generalMeasurementDto);
  }

  getLatestBodyMeasurement(): Observable<BodyMeasurementDto> {
    return this.httpClient.get<BodyMeasurementDto>(environment.rooturl + AppConstants.BODY_MEASUREMENTS_API_URL + '/latest', { withCredentials: true })
  }

  addNewBodyMeasurement(bodyMeasurementDto: BodyMeasurementDto): Observable<BodyMeasurementDto> {
    return this.httpClient.post<BodyMeasurementDto>(environment.rooturl + AppConstants.BODY_MEASUREMENTS_API_URL, bodyMeasurementDto, { withCredentials: true });
  }

  editBodyMeasurement(bodyMeasurementId: number, bodyMeasurementDto: BodyMeasurementDto): Observable<any> {
    bodyMeasurementDto.id = bodyMeasurementId;
    return this.httpClient.put<void>(environment.rooturl + AppConstants.BODY_MEASUREMENTS_API_URL + `/${bodyMeasurementId}`, bodyMeasurementDto);
  }
}
