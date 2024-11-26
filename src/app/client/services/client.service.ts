import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "https://localhost:8443/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService // Usamos la instancia
  ) { }

  // Obtener todas las habitaciones
  getAllRooms(): Observable<any> {
    return this.http.get(`${BASIC_URL}api/client/rooms`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Buscar habitación por tipo
  searchRoomByType(roomType: any): Observable<any> {
    return this.http.get(`${BASIC_URL}api/client/search/${roomType}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Obtener detalles de una habitación
  getRoomDetailsByRoomId(roomId: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/room/${roomId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Reservar un servicio
  bookService(bookDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Dejar una reseña
  giveReview(reviewDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}api/client/review`, reviewDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Obtener mis reservas
  getMyBookings(): Observable<any> {
    const userId = UserStorageService.getUserId(); // Acceder al userId desde la instancia
    if (userId === null) {
      throw new Error('User is not logged in.');
    }
    return this.http.get(`${BASIC_URL}api/client/my-bookings/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }


  // Crear encabezado de autorización
  createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken(); // Usamos la instancia para obtener el token
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error("No token found in storage");
      // Opcional: Puedes lanzar un error si no hay token
      throw new Error('No token found in storage');
    }
  }
}
