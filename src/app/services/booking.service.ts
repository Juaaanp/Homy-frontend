import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { TokenService } from './token.service';

// DTO for creating a booking (matches backend BookingCreateDTO)
export interface BookingCreateDTO {
  housingId: number;
  guestId: number;
  checkIn: string; // LocalDate format: YYYY-MM-DD
  checkOut: string; // LocalDate format: YYYY-MM-DD
  guestsNumber: number;
  totalPrice: number;
}

// Frontend interface for UserBooking (for component compatibility)
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

// Backend BookingSummaryDTO (from backend)
export interface BookingSummaryDTO {
  id: number;
  checkIn: string;
  checkOut: string;
  guestsNumber: number;
  totalPrice: number;
  status: string;
  housingId: number;
  guestId: number;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private bookingsURL = `${environment.apiUrl}/bookings`;

  constructor() { }

  /**
   * Create a new booking
   * POST /bookings
   */
  public createBooking(bookingData: BookingCreateDTO): Observable<string> {
    return this.http.post<ResponseDTO>(this.bookingsURL, bookingData).pipe(
      map((response: ResponseDTO) => {
        if (!response.success) {
          throw new Error(response.content || 'Failed to create booking');
        }
        return response.content || 'Booking created successfully';
      }),
      catchError((error) => {
        console.error('Error creating booking:', error);
        const message = error.error?.content || error.error?.message || 'Failed to create booking';
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Legacy create method for compatibility
   */
  public create(bookingDTO: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.bookingsURL, bookingDTO);
  }

  public getAll(filters?: {
    page?: number;
    size?: number;
  }): Observable<ResponseDTO> {
    let params = new HttpParams();

    if (filters) {
      params = params.set('page', (filters.page || 0).toString());
      params = params.set('size', (filters.size || 10).toString());
    }

    return this.http.get<ResponseDTO>(`${this.bookingsURL}/search`, { params });
  }

  public getById(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.bookingsURL}/${id}`);
  }

  public cancel(id: number): Observable<ResponseDTO> {
    // Backend uses PATCH /bookings/{id}/cancel
    return this.http.patch<ResponseDTO>(`${this.bookingsURL}/${id}/cancel`, {});
  }

  // Compatibility methods for existing components
  public getUserBookings(): Observable<UserBooking[]> {
    return this.getAll().pipe(
      map((response: ResponseDTO) => {
        if (!response.success || !response.content) return [];
        const bookings = Array.isArray(response.content.content) ? response.content.content : [];
        return bookings.map((item: any) => this.mapToUserBooking(item));
      })
    );
  }

  public cancelBooking(bookingId: string): Observable<boolean> {
    return this.cancel(parseInt(bookingId)).pipe(
      map((response: ResponseDTO) => response.success)
    );
  }

  // Helper to map backend response to UserBooking interface
  private mapToUserBooking(data: any): UserBooking {
    // Backend BookingSummaryDTO fields:
    // id, housingTitle, principalImage, city, checkIn, checkOut, guestsNumber, status, totalPrice, guestName
    const statusMap: Record<string, UserBooking['status']> = {
      'PENDING': 'upcoming',
      'CONFIRMED': 'upcoming',
      'COMPLETED': 'completed',
      'CANCELLED': 'cancelled',
      'Pendiente': 'upcoming',
      'Confirmada': 'upcoming',
      'Completada': 'completed',
      'Cancelada': 'cancelled'
    };

    // Format dates from LocalDate to string
    const formatDate = (date: any): string => {
      if (!date) return '';
      if (typeof date === 'string') return date;
      // If it's a LocalDate object, convert to ISO string
      if (date.year && date.monthValue && date.dayOfMonth) {
        return `${date.year}-${String(date.monthValue).padStart(2, '0')}-${String(date.dayOfMonth).padStart(2, '0')}`;
      }
      return '';
    };

    const status = data.status || '';
    const mappedStatus = statusMap[status] || statusMap[status.toUpperCase()] || 'upcoming';

    return {
      id: data.id?.toString() || '',
      propertyId: data.housingId?.toString() || '',
      propertyTitle: data.housingTitle || `Property #${data.housingId || data.id}`,
      propertyImage: data.principalImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      propertyLocation: data.city || 'Location TBD',
      checkIn: formatDate(data.checkIn),
      checkOut: formatDate(data.checkOut),
      guests: data.guestsNumber || data.guests || 1,
      totalPrice: data.totalPrice || 0,
      status: mappedStatus,
      bookingDate: data.createdAt || data.bookingDate || new Date().toISOString(),
      confirmationCode: `HOMY-${data.id}`,
      hostName: data.hostName || 'Host',
      hostAvatar: data.hostAvatar || 'https://i.pravatar.cc/150?img=5'
    };
  }
}
