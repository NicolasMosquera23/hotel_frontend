import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss'] // Corregido a styleUrls
})
export class UpdateRoomComponent implements OnInit {

  roomId: any;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      roomType: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.getRoomById();
  }

  updateRoom(): void {
    if (this.validateForm.valid) {
      const formData = {
        roomType: this.validateForm.get('roomType')?.value,
        description: this.validateForm.get('description')?.value,
        price: this.validateForm.get('price')?.value
      };
      this.adminService.updateRoom(this.roomId, formData).subscribe(
        res => {
          this.notification.success('SUCCESS', 'Room updated successfully', { nzDuration: 5000 });
          this.router.navigateByUrl('/admin/rooms');
        },
        error => {
          this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
        }
      );
    } else {
      this.notification.error('ERROR', 'Form is invalid.', { nzDuration: 5000 });
    }
  }

  getRoomById(): void {
    this.adminService.getRoomById(this.roomId).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue(res);
    });
  }
}
