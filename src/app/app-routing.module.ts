import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupclientComponent } from './basic/components/signup-client/signup-client.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { HomeComponent } from './basic/components/home/home.component';
import { FacilitiesComponent } from './basic/components/facilities/facilities.component';
import { RoomsComponent } from './basic/components/rooms/rooms.component';
import { SignupAdminComponent } from './basic/components/signup-admin/signup-admin.component';
import { AboutUsComponent } from './basic/components/about-us/about-us.component';
import { TermsComponent } from './basic/components/terms/terms.component';

const routes: Routes = [
  { path: 'register_client', component: SignupclientComponent },
  { path: 'register_admin', component: SignupAdminComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'register', component: SignupComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.clientModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
