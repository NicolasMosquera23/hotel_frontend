import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrl: './all-rooms.component.scss'
})
export class AllRoomsComponent {
  rooms: any[]=[];
  room: any;
  roomTypeImages: { 
    [key: string]: string } = { 
      'Twin room': 'twin-room.jpg', 
      'Double room': 'double-room.jpg', 
      'Single room': 'default-room.jpg' 
    }; 
    selectedImage: string | null = null;

  constructor(private adminService: AdminService,
    private notification: NzNotificationService,
  ){}

  ngOnInit(){
    this.getAllRoomsByUserId();
  }

  getAllRoomsByUserId(){
      this.adminService.getAllRoomsByUserId().subscribe((res: any) => {
        this.rooms = res.map((room: any) => ({
          ...room,
          selectedImage: this.roomTypeImages[room.roomType] || 'default-room.jpg'
        }));
      });
    }
  
 

  deleteRoomById(roomId:any){
    this.adminService.deleteRoomById(roomId).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `room eliminada existosamente`,
        {nzDuration: 5000}
      );
      this.getAllRoomsByUserId();
    })
  }
  deleteReservationById(reservationId:any){
    this.adminService.deleteReservationById(reservationId).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `room eliminada existosamente`,
        {nzDuration: 5000}
      );
      this.getAllRoomsByUserId();


    })
  }


}
