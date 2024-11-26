import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Corregido 'styleUrl' a 'styleUrls'
})
export class AppComponent {
  title = 'frontend';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['en', 'es', 'fr']); 
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    });
  }

  switchLanguage(language: string): void { 
    this.translate.use(language); }

  logout() {
    UserStorageService.signOut();  // Usamos la instancia para cerrar sesión
    this.router.navigateByUrl('login');
  }
}
