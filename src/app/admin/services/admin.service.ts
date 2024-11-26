import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "https://localhost:8443/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api';

  constructor(
    private http: HttpClient,
  ) {}

  publishRoom(roomDTO: any): Observable<any> { 
    const userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `api/admin/room/${userId}`, roomDTO,{
      headers: this.createAuthorizationHeader()
    })
  }

  getImages(): Observable<string[]> { 
    return this.http.get<string[]>(`${this.apiUrl}/admin/images`); 
  }

  getAllRoomsByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}api/admin/rooms/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllClients(): Observable<any> { 
    return this.http.get(`${BASIC_URL}api/admin/clients`, { 
      headers: this.createAuthorizationHeader() 
    }); 
  }

  getReport(reportType: string): Observable<Blob> { 
    return this.http.get(`${BASIC_URL}report?reportType=${reportType}`, { 
      headers: this.createAuthorizationHeader(), 
      responseType: 'blob'
    }); 
  }

  deleteClientById(clientId: number): Observable<any> { 
    return this.http.delete(`${BASIC_URL}api/admin/clients/${clientId}`, { 
      headers: this.createAuthorizationHeader() 
    }); 
  }

  getRoomById(roomId: any): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/room/${roomId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateRoom(roomId: any, roomDTO: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/admin/room/${roomId}`, roomDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteRoomById(roomId: any): Observable<any> {
    return this.http.delete(`${BASIC_URL}api/admin/room/${roomId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteReservationById(reservationId: any): Observable<any> { 
    return this.http.delete(`${BASIC_URL}api/admin/reservation/${reservationId}`, { 
      headers: this.createAuthorizationHeader() 
    });
   }

  getAllRoomBookings(): Observable<any> {
    const adminId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}api/admin/bookings/${adminId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }
}
