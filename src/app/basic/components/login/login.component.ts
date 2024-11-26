import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const userName = this.validateForm.get('userName')?.value;
      const password = this.validateForm.get('password')?.value;
      console.log('Login attempt with:', { userName, password });

      this.authService.login(userName, password).subscribe(
        res => {
          console.log('Login successful:', res);
          if (UserStorageService.isClientLoggedIn()) {
            this.router.navigateByUrl('client/dashboard');
          } else if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          }
        },
        error => {
          console.error('Login error:', error);
          this.notification.error('ERROR', 'Bad credentials', { nzDuration: 5000 });
        }
      );
    } else {
      this.notification.error('ERROR', 'Please fill out the form correctly', { nzDuration: 5000 });
    }
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
