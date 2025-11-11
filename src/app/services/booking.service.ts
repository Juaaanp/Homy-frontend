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

  private getAuthHeaders() {
    const token = this.tokenService.getToken();
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  }

  /**
   * Create a new booking
   * POST /bookings
   */
  public createBooking(bookingData: BookingCreateDTO): Observable<string> {
    console.log('Creating booking with data:', bookingData);
    
    return this.http.post<ResponseDTO>(this.bookingsURL, bookingData, this.getAuthHeaders()).pipe(
      map((response: ResponseDTO) => {
        console.log('Backend response:', response);
        if (!response.success) {
          throw new Error(response.content || 'Failed to create booking');
        }
        return response.content || 'Booking created successfully';
      }),
      catchError((error) => {
        console.error('Error creating booking:', error);
        console.error('Error details:', error.error);
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
    return this.http.get<ResponseDTO>(`${this.bookingsURL}/${id}`, this.getAuthHeaders());
  }

  /**
   * Cancel a booking
   * PATCH /bookings/{id}/cancel
   */
  public cancelBooking(bookingId: string): Observable<boolean> {
    const id = parseInt(bookingId);
    return this.http.patch<void>(`${this.bookingsURL}/${id}/cancel`, {}, this.getAuthHeaders()).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error canceling booking:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Legacy cancel method for compatibility
   */
  public cancel(id: number): Observable<ResponseDTO> {
    return this.http.patch<ResponseDTO>(`${this.bookingsURL}/${id}/cancel`, {}, this.getAuthHeaders());
  }

  /**
   * Get bookings for the current authenticated user (guest or host)
   * GET /bookings/search
   * Backend automatically filters by authenticated user
   */
  public getUserBookings(page: number = 0, size: number = 50): Observable<UserBooking[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ResponseDTO>(`${this.bookingsURL}/search`, { 
      params,
      ...this.getAuthHeaders() 
    }).pipe(
      map((response: ResponseDTO) => {
        console.log('User bookings response:', response);
        if (!response.success || !response.content) return [];
        
        // Handle paginated response
        const bookings = Array.isArray(response.content.content) 
          ? response.content.content 
          : (Array.isArray(response.content) ? response.content : []);
        
        return bookings.map((item: any) => this.mapToUserBooking(item));
      }),
      catchError((error) => {
        console.error('Error loading user bookings:', error);
        return throwError(() => error);
      })
    );
  }

  // Helper to map backend response to UserBooking interface
  private mapToUserBooking(data: any): UserBooking {
    // Map backend enum status to frontend status
    const statusMap: Record<string, UserBooking['status']> = {
      'CONFIRMED': 'upcoming',
      'COMPLETED': 'completed',
      'CANCELED': 'cancelled',
      // Spanish versions for compatibility
      'CONFIRMADA': 'upcoming',
      'COMPLETADA': 'completed',
      'CANCELADA': 'cancelled'
    };

    // Extract housing info if available
    const housingTitle = data.housingTitle || data.propertyTitle || `Property #${data.housingId || data.alojamientoId}`;
    const housingImage = data.housingImage || data.propertyImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';
    const housingLocation = data.housingLocation || data.propertyLocation || data.city || 'Location TBD';

    return {
      id: data.id?.toString() || '',
      propertyId: (data.housingId || data.alojamientoId)?.toString() || '',
      propertyTitle: housingTitle,
      propertyImage: housingImage,
      propertyLocation: housingLocation,
      checkIn: data.checkIn || '',
      checkOut: data.checkOut || '',
      guests: data.guestsNumber || data.huespedes || data.guests || 1,
      totalPrice: data.totalPrice || data.totalPrecio || 0,
      status: statusMap[data.status?.toUpperCase()] || statusMap[data.estado] || 'upcoming',
      bookingDate: data.createdAt || data.creadoEn || data.bookingDate || '',
      confirmationCode: `HOMY-${data.id}`,
      hostName: data.hostName || 'Host',
      hostAvatar: data.hostAvatar || 'https://i.pravatar.cc/150?img=5'
    };
  }
}
