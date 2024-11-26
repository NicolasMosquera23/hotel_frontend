import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { SignupAdminComponent } from './basic/components/signup-admin/signup-admin.component';
import { JwtInterceptor } from './jwt-interceptor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HomeComponent } from './basic/components/home/home.component';
import { FacilitiesComponent } from './basic/components/facilities/facilities.component';
import { RoomsComponent } from './basic/components/rooms/rooms.component';
import { SignupclientComponent } from './basic/components/signup-client/signup-client.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AboutUsComponent } from './basic/components/about-us/about-us.component';
import { TermsComponent } from './basic/components/terms/terms.component';

export function HttpLoaderFactory(http: HttpClient) { 
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); }

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupAdminComponent,
    HomeComponent,
    FacilitiesComponent,
    RoomsComponent,
    SignupclientComponent,
    AboutUsComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    NzButtonModule,
    TranslateModule.forRoot({ 
      loader: { 
        provide: TranslateLoader, 
        useFactory: HttpLoaderFactory, 
        deps: [HttpClient] 
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
