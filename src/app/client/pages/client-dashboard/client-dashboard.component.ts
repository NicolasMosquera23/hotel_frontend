import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class clientDashboardComponent {

  
  rooms: any = [];
  validateForm! : FormGroup;
  roomTypeImages: { 
    [key: string]: string } = { 
      'Twin room': 'twin-room.jpg', 
      'Double room': 'double-room.jpg', 
      'Single room': 'default-room.jpg' 
    }; 
    selectedImage: string | null = null;

  constructor(private clientservice: ClientService,
    private fb: FormBuilder){}

    getAllrooms() {
      this.clientservice.getAllRooms().subscribe((res: any) => {
        this.rooms = res.map((room: any) => ({
          ...room,
          selectedImage: this.roomTypeImages[room.roomType] || 'default-room.jpg'
        }));
      });
    }
    
  ngOnInit(){
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    })
    this.getAllrooms();
  }

  searchRoomByType(){
    this.clientservice.searchRoomByType(this.validateForm.get(['service']).value).subscribe(res=>{
      this.rooms = res;
    })
  }


}
