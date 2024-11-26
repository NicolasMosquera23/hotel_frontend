import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../../basic/services/auth/auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  validateForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      roomType: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });

  }

  publishRoom() {
      const formData: FormData = new FormData(); 
      formData.append('roomType', this.validateForm.get('roomType').value);
      formData.append('description', this.validateForm.get('description').value);
      formData.append('price', this.validateForm.get('price').value);
     
      this.adminService.publishRoom(formData).subscribe(res =>{
        this.notification
        .success(
          'SUCCESS',
          `Room posted successfully`,
          {nzDuration: 5000}
        );
        this.router.navigateByUrl('/admin/rooms');
      }, error =>{
        this.notification
        .error(
          'ERROR',
          `${error.error}`,
          {nzDuration:5000}
        )
      })
    }
  }
