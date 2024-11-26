import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() {}

  public saveToken(token: string): void {
    console.log('Saving token:', token);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  clearToken(): void {
    console.log('Clearing token'); // Añade esta línea para depuración
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    console.log('Saving user:', JSON.stringify(user)); 
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  static getUserId(): string {
    const user = this.getUser();
    if(user == null){return '';}
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null){return '';}
    return user.role;
  }


  static isClientLoggedIn(): boolean {
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CLIENT';
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken() === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  static signOut(): void {
    console.log('Signing out'); // Añade esta línea para depuración
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }
}
