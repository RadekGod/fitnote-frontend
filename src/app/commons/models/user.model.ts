// export class User {
//
//   public id: number;
//   public email: string;
//   public password: string;
//   public role: string;
//   public authenticated: boolean;
//
//
//   constructor(id?: number, email?: string, password?: string, role?: string,
//               authenticated?: boolean) {
//     this.id = id || 0;
//     this.email = email || '';
//     this.password = password || '';
//     this.role = role || '';
//     this.authenticated = authenticated || false;
//   }
//
// }

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
