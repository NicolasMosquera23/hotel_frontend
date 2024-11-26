import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateRoomComponent } from './pages/update-room/update-room.component';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { AllRoomsComponent } from './pages/all-rooms/all-rooms.component';
import { AllClientsComponent } from './pages/all-clients/all-clients.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    CreateRoomComponent,
    AllRoomsComponent,
    UpdateRoomComponent,
    CreateRoomComponent,
    AllClientsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AdminModule { }
