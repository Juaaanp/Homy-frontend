import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface UserBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
  confirmationCode: string;
  hostName: string;
  hostAvatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Simulated bookings - ready to be replaced with HTTP calls
  private bookings = signal<UserBooking[]>([
    {
      id: 'b1',
      propertyId: '1',
      propertyTitle: 'Luxury Beachfront Villa',
      propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      propertyLocation: 'Malibu Beach, California',
      checkIn: '2025-12-15',
      checkOut: '2025-12-20',
      guests: 4,
      totalPrice: 2475,
      status: 'upcoming',
      bookingDate: '2025-11-01',
      confirmationCode: 'HOMY-B1-2025',
      hostName: 'Sarah Johnson',
      hostAvatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 'b2',
      propertyId: '2',
      propertyTitle: 'Modern Downtown Apartment',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      propertyLocation: 'Downtown, New York',
      checkIn: '2025-11-20',
      checkOut: '2025-11-25',
      guests: 2,
      totalPrice: 990,
      status: 'upcoming',
      bookingDate: '2025-10-28',
      confirmationCode: 'HOMY-B2-2025',
      hostName: 'Michael Chen',
      hostAvatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 'b3',
      propertyId: '3',
      propertyTitle: 'Cozy Mountain Cabin',
      propertyImage: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
      propertyLocation: 'Aspen, Colorado',
      checkIn: '2025-09-10',
      checkOut: '2025-09-15',
      guests: 6,
      totalPrice: 1210,
      status: 'completed',
      bookingDate: '2025-08-15',
      confirmationCode: 'HOMY-B3-2025',
      hostName: 'Emily Thompson',
      hostAvatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 'b4',
      propertyId: '1',
      propertyTitle: 'Luxury Beachfront Villa',
      propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      propertyLocation: 'Malibu Beach, California',
      checkIn: '2025-07-01',
      checkOut: '2025-07-05',
      guests: 3,
      totalPrice: 1980,
      status: 'cancelled',
      bookingDate: '2025-06-10',
      confirmationCode: 'HOMY-B4-2025',
      hostName: 'Sarah Johnson',
      hostAvatar: 'https://i.pravatar.cc/150?img=5'
    }
  ]);

  constructor() {}

  // Simulate API call to get user bookings
  getUserBookings(): Observable<UserBooking[]> {
    return of(this.bookings()).pipe(delay(400));
  }

  // Simulate API call to get a specific booking
  getBookingById(id: string): Observable<UserBooking | undefined> {
    const booking = this.bookings().find(b => b.id === id);
    return of(booking).pipe(delay(300));
  }

  // Simulate API call to cancel a booking
  cancelBooking(id: string): Observable<boolean> {
    const bookings = this.bookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = 'cancelled';
      this.bookings.set([...bookings]);
    }
    return of(true).pipe(delay(500));
  }

  // Helper to filter by status
  getBookingsByStatus(status: 'upcoming' | 'completed' | 'cancelled'): Observable<UserBooking[]> {
    const filtered = this.bookings().filter(b => b.status === status);
    return of(filtered).pipe(delay(300));
  }

  /* 
   * READY FOR BACKEND INTEGRATION:
   * Replace the methods above with actual HTTP calls like:
   * 
   * constructor(private http: HttpClient) {}
   * 
   * getUserBookings(): Observable<UserBooking[]> {
   *   return this.http.get<UserBooking[]>(`${API_URL}/user/bookings`);
   * }
   * 
   * cancelBooking(id: string): Observable<boolean> {
   *   return this.http.post<boolean>(`${API_URL}/bookings/${id}/cancel`, {});
   * }
   */
}
