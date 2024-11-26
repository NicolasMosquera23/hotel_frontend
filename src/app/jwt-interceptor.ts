import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from './basic/services/storage/user-storage.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private userStorageService: UserStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Añadir el token JWT a las cabeceras de la solicitud si está disponible
    const token = UserStorageService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
