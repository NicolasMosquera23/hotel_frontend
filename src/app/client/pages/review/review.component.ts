import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']  // Corregido 'styleUrl' a 'styleUrls'
})
export class ReviewComponent {
  bookId: number;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private userStorageService: UserStorageService  // Inyectamos UserStorageService
  ) {
    this.bookId = +this.activatedRoute.snapshot.params['id'];  // Asignar bookId desde la URL
  }

  ngOnInit(): void {
    this.bookId = +this.activatedRoute.snapshot.params['id'];  // Asignar bookId nuevamente en ngOnInit
    this.validateForm = this.fb.group({
      rating: [null, [Validators.required]],  // Definir el formulario de validación
      review: [null, [Validators.required]]
    });
  }

  giveReview(): void {
    const reviewDTO = {
      rating: this.validateForm.get('rating')?.value,  // Obtener el rating
      review: this.validateForm.get('review')?.value,  // Obtener la reseña
      userId: UserStorageService.getUserId(),  // Usar la instancia de UserStorageService para obtener el userId
      bookId: this.bookId
    };

    // Verifica el payload que se está enviando
    console.log('Payload enviado:', reviewDTO);

    // Llamar al servicio para enviar la reseña
    this.clientService.giveReview(reviewDTO).subscribe(res => {
      this.notification.success(
        'SUCCESS',
        `Review posted successfully`,
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl("/client/bookings");  // Redirigir a las reservas del cliente
    }, error => {
      this.notification.error(
        'ERROR',
        `${error.message}`,
        { nzDuration: 5000 }
      );
    });
  }
}
