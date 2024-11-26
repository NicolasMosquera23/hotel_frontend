import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  bookedServices: any;

  constructor(private clientService: ClientService,
    private notification: NzNotificationService
  ){}

  ngOnInit(){
    this.getMyBookings();
  }

  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res =>{
      this.bookedServices = res;
    })
  }

  

}
