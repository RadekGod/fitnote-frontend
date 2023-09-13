export class User {

  public id: number;
  public email: string;
  public password: string;
  public role: string;
  public authenticated: boolean;


  constructor(id?: number, email?: string, password?: string, role?: string,
              authenticated?: boolean) {
    this.id = id || 0;
    this.email = email || '';
    this.password = password || '';
    this.role = role || '';
    this.authenticated = authenticated || false;
  }

}


export interface CreateUser {
  email: string;
  password: string;
}
