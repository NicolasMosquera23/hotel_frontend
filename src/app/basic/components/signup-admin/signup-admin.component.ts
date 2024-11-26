import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.scss'] // Corregido a styleUrls
})
export class SignupAdminComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phone: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]],
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.authService.registerAdmin(this.validateForm.value).subscribe(
        res => {
          this.notification.success('SUCCESS', 'Signup successful', { nzDuration: 5000 });
          this.router.navigateByUrl('/login');
        },
        error => {
          this.notification.error('ERROR', error.error || 'An error occurred', { nzDuration: 5000 });
        }
      );
    } else {
      this.notification.error('ERROR', 'Please fill out the form correctly', { nzDuration: 5000 });
    }
  }
}
