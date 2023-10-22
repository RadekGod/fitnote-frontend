import {UserSettings} from "./user-settings.model";

export interface User {

  id: number;
  email: string;
  password: string;
  role: string;
  authenticated: boolean;
  userSettings: UserSettings
}

export interface CreateUser {
  email: string;
  password: string;
}
