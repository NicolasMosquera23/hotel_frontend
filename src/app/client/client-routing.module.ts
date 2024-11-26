import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clientComponent } from './client.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { ReviewComponent } from './pages/review/review.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';
import { clientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';

const routes: Routes = [
  { path: '', component: clientComponent },
  { path: 'dashboard', component: clientDashboardComponent },
  { path: 'bookings', component: MyBookingsComponent },
  { path: 'room/:roomId', component: RoomDetailComponent },
  { path: 'review/:Id', component: ReviewComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clientRoutingModule { }
