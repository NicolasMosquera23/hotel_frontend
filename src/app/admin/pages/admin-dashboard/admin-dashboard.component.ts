import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { saveAs } from 'file-saver';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  bookings: any;
client: any;

  constructor(private adminService: AdminService,
    private notification: NzNotificationService,
    private translate: TranslateService
  ){
    this.translate.addLangs(['en', 'es']); 
    this.translate.setDefaultLang('en'); 
  }

  ngOnInit(){
    this.getAllRoomBookings();
  }

  getAllRoomBookings(){
    this.adminService.getAllRoomBookings().subscribe(res=>{
      console.log(res);
      this.bookings=res;
    })
  }

  loadBookings() { 
    this.adminService.getAllRoomBookings().subscribe((bookings: any) => { 
      this.bookings = bookings; 
      console.log(bookings);
    }); 
  }

  switchLanguage(language: string): void { 
    this.translate.use(language); 
  }

  changeBookingStatus(bookingId: number, status: string){
    this.adminService.changeBookingStatus(bookingId, status).subscribe(res=>{
      this.notification
      .success(
        `SUCCESS`,
        `Booking status changed succesfully`,
        {nzDuration: 5000}
      );
      this.getAllRoomBookings();
    }, error=>{
      this.notification
      .error(
        `ERROR`,
        `${error.message}`,
        {nzDuration: 5000}
      )

    })
  }

  deleteReservation(id: number) { 
    this.adminService.deleteReservationById(id).subscribe(() => { 
      this.notification.success('SUCCESS', 'Reservation deleted successfully', { nzDuration: 5000 }); 
      this.loadBookings(); 
    }, error => { this.notification.error('ERROR', 'Failed to delete reservation', { nzDuration: 5000 }); 
  }); 
}

generateReport(reportType: string) { 
  this.adminService.getReport(reportType).subscribe(blob => { 
    const fileName = `${reportType}_report.pdf`; saveAs(blob, fileName); }, error => { 
      this.notification.error('ERROR', 'Failed to generate report', { nzDuration: 5000 }); 
    }); 
  }

}
