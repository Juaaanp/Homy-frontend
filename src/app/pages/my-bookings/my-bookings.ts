import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BookingService, UserBooking } from '../../services/booking.service';

type FilterStatus = 'all' | 'upcoming' | 'completed' | 'cancelled';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookings implements OnInit {
  loading = signal(true);
  bookings = signal<UserBooking[]>([]);
  filter = signal<FilterStatus>('all');
  cancelling = signal<string | null>(null);

  filteredBookings = computed(() => {
    const all = this.bookings();
    const f = this.filter();
    if (f === 'all') return all;
    return all.filter(b => b.status === f);
  });

  upcomingCount = computed(() => this.bookings().filter(b => b.status === 'upcoming').length);
  completedCount = computed(() => this.bookings().filter(b => b.status === 'completed').length);
  cancelledCount = computed(() => this.bookings().filter(b => b.status === 'cancelled').length);

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading.set(true);
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.bookings.set(bookings);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.loading.set(false);
      }
    });
  }

  setFilter(status: FilterStatus) {
    this.filter.set(status);
  }

  viewProperty(propertyId: string) {
    this.router.navigate(['/property', propertyId]);
  }

  cancelBooking(bookingId: string) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    this.cancelling.set(bookingId);
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.cancelling.set(null);
        this.loadBookings(); // Refresh list
      },
      error: (err) => {
        console.error('Error cancelling booking:', err);
        this.cancelling.set(null);
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'upcoming': return 'upcoming';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  calculateNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
