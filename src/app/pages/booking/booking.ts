import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BookingService, BookingCreateDTO } from '../../services/booking.service';
import { TokenService } from '../../services/token.service';

type Step = 1 | 2 | 3;

const NIGHTLY_PRICE = 120;
const MAX_GUESTS = 4;

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
  // Constants
  readonly NIGHTLY_PRICE = NIGHTLY_PRICE;
  readonly MAX_GUESTS = MAX_GUESTS;

  // Property and user data
  propertyId = signal<number | null>(null);
  userId = signal<number | null>(null);
  submitting = signal(false);

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

  // Price breakdown computed
  subtotal = computed(() => this.nights() * NIGHTLY_PRICE);
  cleaningFee = computed(() => Math.round(this.subtotal() * 0.05));
  serviceFee = computed(() => Math.round(this.subtotal() * 0.08));
  taxes = computed(() => Math.round(this.subtotal() * 0.1));
  total = computed(() => 
    this.subtotal() + this.cleaningFee() + this.serviceFee() + this.taxes()
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    // Get propertyId from route params
    this.route.queryParams.subscribe(params => {
      const propertyId = params['propertyId'];
      if (propertyId) {
        this.propertyId.set(parseInt(propertyId));
      }

      // Get dates and guests from params if provided
      if (params['checkIn']) this.checkIn.set(params['checkIn']);
      if (params['checkOut']) this.checkOut.set(params['checkOut']);
      if (params['guests']) this.guests.set(parseInt(params['guests']));
    });

    // Get userId from token
    const userIdStr = this.tokenService.getUserId();
    if (userIdStr) {
      this.userId.set(parseInt(userIdStr));
    } else {
      // User not authenticated, redirect to login
      alert('You must be logged in to make a booking');
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: '/booking' }
      });
    }
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
    const now = new Date(this.today);
    const inD = new Date(this.checkIn());
    const outD = new Date(this.checkOut());

    if (!this.checkIn() || !this.checkOut()) {
      this.s1Error.set('Please select both check-in and check-out dates.');
      return;
    }
    if (inD < now) {
      this.s1Error.set('Check-in cannot be in the past.');
      return;
    }
    if (outD <= inD) {
      this.s1Error.set('Check-out must be after check-in.');
      return;
    }
    if (this.nights() < 1) {
      this.s1Error.set('Minimum stay is 1 night.');
      return;
    }
    if (this.guests() < 1) {
      this.s1Error.set('At least 1 guest is required.');
      return;
    }
    if (this.guests() > MAX_GUESTS) {
      this.s1Error.set(`Maximum capacity is ${MAX_GUESTS} guests.`);
      return;
    }

    this.s1Error.set(null);
    this.step.set(2);
  }

  validateStep2(): void {
    if (!this.fullName().trim()) {
      this.s2Error.set('Please enter your full name.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(this.email())) {
      this.s2Error.set('Please enter a valid email.');
      return;
    }
    if (!/^[0-9+\-\s()]{7,}$/.test(this.phone())) {
      this.s2Error.set('Please enter a valid phone.');
      return;
    }
    this.s2Error.set(null);
    this.step.set(3);
  }

  confirmBooking(): void {
    if (!this.agree()) {
      this.s3Error.set('You must agree to the policies to continue.');
      return;
    }
    if (
      !this.cardName().trim() ||
      !this.cardNumber().trim() ||
      !this.cardExp().trim() ||
      !this.cardCvc().trim()
    ) {
      this.s3Error.set('Please complete the payment details (mock).');
      return;
    }

    // Validate we have required data
    if (!this.propertyId() || !this.userId()) {
      this.s3Error.set('Missing required booking information. Please try again.');
      return;
    }

    // Check user role
    const userRole = this.tokenService.getRole();
    console.log('User role:', userRole);
    console.log('User ID:', this.userId());
    console.log('Property ID:', this.propertyId());

    if (userRole !== 'GUEST') {
      this.s3Error.set(`Only GUEST users can create bookings. Current role: ${userRole}. Please login with a GUEST account.`);
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
        console.log('Booking created:', message);
        this.submitting.set(false);
        this.confirmed.set(true);
      },
      error: (error) => {
        console.error('Error creating booking:', error);
        console.error('Error details:', error.error);
        this.submitting.set(false);
        
        // Better error message
        let errorMsg = 'Failed to create booking. ';
        if (error.message) {
          errorMsg += error.message;
        } else if (error.error?.message) {
          errorMsg += error.error.message;
        } else if (error.error?.content?.message) {
          errorMsg += error.error.content.message;
        }
        
        this.s3Error.set(errorMsg);
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
