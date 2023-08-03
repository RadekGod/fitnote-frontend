import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserFormDto} from "../model/user-form.dto";
import {AuthService} from "../../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  saveUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.authService.accessToken}`
    });
    let options = {headers: headers};
    let data: UserFormDto = {
      birthDate: Date.now(),
      gender: 'MALE'
    }
    console.log('sending Data: ', data);
    return this.httpClient.post<UserFormDto>('http://localhost:8080/users', data, options);
  }
}
