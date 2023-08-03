import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth/auth.service";
import {UserRequestService} from "./services/user-request.service";
import {FormBuilder, Validators} from "@angular/forms";

interface UserFormDto {
  birthDate: number;
  gender: string;
}


@Component({
  selector: 'app-fill-user-data',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {

  date: any;
  userForm: any;

  constructor(private formBuilder: FormBuilder, private userRequestService: UserRequestService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      gender: [''],
      birthDate: ['']
    });
  }

  submitForm() {

  }

  sendData() {
    this.userRequestService.saveUser().subscribe();
  }

}
