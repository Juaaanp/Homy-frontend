import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BookingService, BookingCreateDTO } from '../../services/booking.service';
import { HousingService, HousingDetails } from '../../services/housing.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

type Step = 1 | 2 | 3;

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
})
export class BookingComponent implements OnInit {
  // Property and user data
  propertyId = signal<number | null>(null);
  userId = signal<number | null>(null);
  submitting = signal(false);
  loading = signal(true);
  
  // Housing data (loaded from backend)
  housing = signal<HousingDetails | null>(null);
  nightlyPrice = signal(0);
  maxGuests = signal(4);

  // Step management
  step = signal<Step>(1);

  // Date helpers
  today = this.toISODateInput(new Date());
  defaultCheckIn = this.toISODateInput(new Date(Date.now() + 24 * 60 * 60 * 1000));
  defaultCheckOut = this.toISODateInput(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

  // Step 1 - Dates & Guests
  checkIn = signal(this.defaultCheckIn);
  checkOut = signal(this.defaultCheckOut);
  guests = signal(2);
  s1Error = signal<string | null>(null);

  // Computed nights
  nights = computed(() => this.diffNights(this.checkIn(), this.checkOut()));

  // Step 2 - Guest Details
  fullName = signal('');
  email = signal('');
  phone = signal('');
  notes = signal('');
  s2Error = signal<string | null>(null);

  // Step 3 - Payment
  cardName = signal('');
  cardNumber = signal('');
  cardExp = signal('');
  cardCvc = signal('');
  agree = signal(false);
  confirmed = signal(false);
  s3Error = signal<string | null>(null);

  // Price breakdown computed (usando precio real del housing)
  subtotal = computed(() => this.nights() * this.nightlyPrice());
  cleaningFee = computed(() => Math.round(this.subtotal() * 0.05));
  serviceFee = computed(() => Math.round(this.subtotal() * 0.08));
  taxes = computed(() => Math.round(this.subtotal() * 0.1));
  total = computed(() => 
    this.subtotal() + this.cleaningFee() + this.serviceFee() + this.taxes()
  );

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private housingService: HousingService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // Verificar autenticación primero
    const userIdStr = this.tokenService.getUserId();
    if (!userIdStr) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to make a booking',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/login'], { 
          queryParams: { returnUrl: '/booking' }
        });
      });
      return;
    }
    
    this.userId.set(parseInt(userIdStr));
    
    // Verificar rol
    const userRole = this.tokenService.getRole();
    if (userRole !== 'GUEST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only guests can make bookings. Please login with a guest account.',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    // Get propertyId from route params
    this.route.queryParams.subscribe(params => {
      const propertyId = params['propertyId'];
      if (propertyId) {
        this.propertyId.set(parseInt(propertyId));
        // Cargar datos del housing
        this.loadHousingData(parseInt(propertyId));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Missing Property',
          text: 'No property selected. Please select a property first.',
          confirmButtonColor: '#f97316'
        }).then(() => {
          this.router.navigate(['/explore']);
        });
        return;
      }

      // Get dates and guests from params if provided
      if (params['checkIn']) this.checkIn.set(params['checkIn']);
      if (params['checkOut']) this.checkOut.set(params['checkOut']);
      if (params['guests']) this.guests.set(parseInt(params['guests']));
    });
  }
  
  loadHousingData(housingId: number) {
    this.loading.set(true);
    this.housingService.getHousingById(housingId).subscribe({
      next: (housing) => {
        this.housing.set(housing);
        // Establecer precio por noche y capacidad máxima desde el housing real
        this.nightlyPrice.set(housing.nightPrice || housing.pricePerNight || 0);
        this.maxGuests.set(housing.maxCapacity || 4);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading housing data:', error);
        this.loading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load property information. Please try again.',
          confirmButtonColor: '#f97316'
        }).then(() => {
          this.router.navigate(['/explore']);
        });
      }
    });
  }

  toISODateInput(d: Date): string {
    return d.toISOString().slice(0, 10);
  }

  diffNights(checkIn: string, checkOut: string): number {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn);
    const b = new Date(checkOut);
    const ms = b.getTime() - a.getTime();
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  validateStep1(): void {
    // SIMPLIFICADO: Solo validación básica
    if (!this.checkIn() || !this.checkOut()) {
      this.s1Error.set('Please select both check-in and check-out dates.');
      return;
    }
    const inD = new Date(this.checkIn());
    const outD = new Date(this.checkOut());
    if (outD <= inD) {
      this.s1Error.set('Check-out must be after check-in.');
      return;
    }
    if (this.guests() < 1) {
      this.s1Error.set('At least 1 guest is required.');
      return;
    }

    this.s1Error.set(null);
    this.step.set(2);
  }

  validateStep2(): void {
    // SIMPLIFICADO: Solo validación básica
    if (!this.fullName().trim()) {
      this.s2Error.set('Please enter your full name.');
      return;
    }
    if (!this.email().trim() || !this.email().includes('@')) {
      this.s2Error.set('Please enter a valid email.');
      return;
    }
    this.s2Error.set(null);
    this.step.set(3);
  }

  confirmBooking(): void {
    // SIMPLIFICADO: Validaciones mínimas
    if (!this.agree()) {
      this.s3Error.set('You must agree to the policies to continue.');
      return;
    }
    if (!this.cardName().trim() || !this.cardNumber().trim()) {
      this.s3Error.set('Please complete the payment details (mock).');
      return;
    }

    if (!this.propertyId() || !this.userId()) {
      this.s3Error.set('Missing required booking information. Please try again.');
      return;
    }

    this.s3Error.set(null);
    this.submitting.set(true);

    // Prepare booking data
    const bookingData: BookingCreateDTO = {
      housingId: this.propertyId()!,
      guestId: this.userId()!,
      checkIn: this.checkIn(),
      checkOut: this.checkOut(),
      guestsNumber: this.guests(),
      totalPrice: this.total()
    };

    console.log('Sending booking data:', bookingData);

    // Send to backend
    this.bookingService.createBooking(bookingData).subscribe({
      next: (message) => {
        console.log('Booking created successfully:', message);
        console.log('Booking saved in database for host');
        this.submitting.set(false);
        this.confirmed.set(true);
        
        // Mostrar mensaje de éxito con información clara sobre el guardado
        Swal.fire({
          icon: 'success',
          title: '¡Reserva Confirmada y Guardada! 🎉',
          html: `<div style="text-align: left;">
                 <p><strong>✅ Tu reserva ha sido creada y guardada exitosamente en la base de datos.</strong></p>
                 <p><strong>📧 El host ha sido notificado por email de tu reserva.</strong></p>
                 <p><strong>🏠 La propiedad está reservada para las fechas seleccionadas.</strong></p>
                 <p><strong>👤 El host puede ver esta reserva en su panel de control.</strong></p>
                 <hr style="margin: 15px 0;">
                 <p><strong>⚠️ El pago fue simulado - No se realizaron cargos reales.</strong></p>
                 <p style="font-size: 0.9em; color: #666;">Puedes ver los detalles de tu reserva en "Mis Reservas".</p>
                 </div>`,
          confirmButtonColor: '#22c55e',
          confirmButtonText: 'Ver Mis Reservas',
          width: '550px',
          timer: 5000,
          timerProgressBar: true
        }).then((result) => {
          // Si el usuario hace clic o el timer expira, no redirigir automáticamente
          // Dejar que vea la confirmación en la página
        });
      },
      error: (error) => {
        console.error('Error creating booking:', error);
        this.submitting.set(false);
        
        // Extraer mensaje de error del backend
        let errorMsg = 'Failed to create booking. ';
        if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.message) {
          errorMsg += error.message;
        } else if (error.error?.content?.message) {
          errorMsg = error.error.content.message;
        } else {
          errorMsg += 'Please try again.';
        }
        
        this.s3Error.set(errorMsg);
        
        // Mostrar alerta con el error
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: errorMsg,
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  goBack(targetStep: Step): void {
    this.step.set(targetStep);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
