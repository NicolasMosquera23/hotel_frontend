import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "https://localhost:8443/api/auth/";
const AUTH_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) {}

  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}sign-up/client`, signupRequestDTO)
      .pipe(catchError(this.handleError));
  }

  registerAdmin(signupRequestDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}sign-up/admin`, signupRequestDTO)
      .pipe(catchError(this.handleError));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${BASIC_URL}authenticate`, { username, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          const token = res.headers.get(AUTH_HEADER);
          console.log('Token recibido en login:', token);
          if (token) {
            const bearerToken = token.replace('Bearer ', '');
            this.userStorageService.saveToken(bearerToken);
            this.userStorageService.saveUser(res.body);
            console.log('Token guardado con éxito:', bearerToken);
          } else {
            throw new Error('Token is missing in response');
          }
          return res.body;
        }),
        catchError(this.handleError)
      );
  }
  
  getUserInfo(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${BASIC_URL}userinfo`, { headers })
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    UserStorageService.signOut();
    this.userStorageService.clearToken();
  }

  getUserId(): number | null {
    const user = UserStorageService.getUser();
    return user?.['id'] ?? null;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = UserStorageService.getToken();
    if (token) {
      return new HttpHeaders().set(AUTH_HEADER, `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong with the request.'));
  }

}
