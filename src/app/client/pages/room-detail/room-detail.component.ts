import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  roomId: number;
  room: any;
  roomTypeImages: { 
    [key: string]: string } = { 
      'Twin room': 'twin-room.jpg', 
      'Double room': 'double-room.jpg', 
      'Single room': 'default-room.jpg' 
    }; 
    selectedImage: string | null = null;

  validateForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router, 
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.roomId = +this.activatedRoute.snapshot.params['roomId'];
    console.log("este es el roomId " + this.roomId);
    this.validateForm = this.fb.group({
      bookDate: [null, [Validators.required]],
      bookDateEnd: [null, [Validators.required]]   // Formulario para la fecha de la reserva
    });

    this.getRoomDetailsByRoomId();  // Obtiene los detalles de la habitación
  }

  // Función para obtener los detalles de la habitación
  getRoomDetailsByRoomId() {
    this.clientService.getRoomDetailsByRoomId(this.roomId).subscribe(res =>{
      console.log(res);
      this.room = res.roomDTO;
      this.selectedImage = this.roomTypeImages[this.room.roomType] || 'default-room.jpg';
    });
  }

  bookService() {
    const bookDate = this.validateForm.get(['bookDate'])?.value;
    const bookDateEnd = this.validateForm.get(['bookDateEnd'])?.value;
  
    if (new Date(bookDateEnd) < new Date(bookDate)) {
      this.notification.error('ERROR', 'La fecha de fin de la reserva no puede ser menor a la fecha de inicio.', { nzDuration: 5000 });
      return;
    }
  
    const bookServiceDTO = {
      bookDate: bookDate,
      bookDateEnd: bookDateEnd,  
      roomId: this.roomId,
      userId: UserStorageService.getUserId()  // Accedemos al método getUserId a través de la instancia
    };
  
    this.clientService.bookService(bookServiceDTO).subscribe(res => {
      // Notificación de éxito
      this.notification.success(
        'SUCCESS',
        'Request posted successfully',
        { nzDuration: 5000 }
      );
      // Redirige a la página de reservas del cliente
      this.router.navigateByUrl('/client/bookings');
    }, error => {
      this.notification.error('ERROR', 'Failed to post request', { nzDuration: 5000 });
    });
  }  
}
