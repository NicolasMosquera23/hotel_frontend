import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { clientRoutingModule } from './client-routing.module';
import { clientComponent } from './client.component';
import { clientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    clientComponent,
    clientDashboardComponent,
    RoomDetailComponent,
    MyBookingsComponent,
    
  ],
  imports: [
    CommonModule,
    clientRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class clientModule { }
