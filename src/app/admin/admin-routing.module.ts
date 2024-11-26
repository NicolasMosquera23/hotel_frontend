import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import { UpdateRoomComponent } from './pages/update-room/update-room.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { AllRoomsComponent } from './pages/all-rooms/all-rooms.component';
import { AllClientsComponent } from './pages/all-clients/all-clients.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'room', component: CreateRoomComponent },
  { path: 'rooms', component: AllRoomsComponent },
  { path: 'clients', component: AllClientsComponent },
  { path: 'update/:id', component: UpdateRoomComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
