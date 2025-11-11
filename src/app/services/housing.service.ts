import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

// Backend DTOs
export interface CreateHousingDTO {
  title: string;
  description: string;
  city: string;
  latitude: number;
  length: number; // Note: backend uses "length" instead of "longitude"
  address: string;
  maxCapacity: number;
  pricePerNight: number;
  services: string[]; // e.g., ["WIFI", "PARKING", "POOL"]
  imagesUrls: string[];
}

export interface HousingSummary {
  id: number;
  title: string;
  city: string;
  address?: string; // Optional in backend response
  nightPrice: number; // Backend uses 'nightPrice', not 'pricePerNight'
  maxCapacity?: number; // Optional in backend response
  principalImage?: string | null; // Backend uses 'principalImage', not 'imageUrl'
  averageRating?: number | null;
}

export interface HousingDetails {
  id: number;
  title: string;
  description: string;
  city: string;
  latitude: number;
  length: number;
  address: string;
  maxCapacity: number;
  nightPrice: number; // Backend uses 'nightPrice'
  services: string[];
  images: HousingImage[];
  hostId: number;
  hostName: string;
  createdAt: string;
}

export interface HousingImage {
  id: number;
  url: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ResponseDTO<T> {
  data: T;
  message: string;
  timestamp: string;
}

export interface EntityCreatedResponse {
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:8080/housings';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Create a new housing (HOST only)
   */
  createHousing(housing: CreateHousingDTO): Observable<EntityCreatedResponse> {
    return this.http.post<EntityCreatedResponse>(
      `${this.apiUrl}/create`,
      housing,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Error creating housing:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get all housings with pagination and filters
   * Backend requires: city, checkIn, checkOut, minPrice, maxPrice, indexPage
   */
  getAllHousings(
    page: number = 0, 
    size: number = 10, 
    city: string = '',
    checkIn?: string,
    checkOut?: string,
    minPrice: number = 0,
    maxPrice: number = 999999
  ): Observable<PageResponse<HousingSummary>> {
    // Default dates: today and 30 days from now
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    
    const defaultCheckIn = checkIn || today.toISOString().split('T')[0];
    const defaultCheckOut = checkOut || futureDate.toISOString().split('T')[0];
    
    // Backend requires ALL these parameters
    const params = new HttpParams()
      .set('city', city)
      .set('checkIn', defaultCheckIn)
      .set('checkOut', defaultCheckOut)
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString())
      .set('indexPage', page.toString());

    console.log('🔍 [HousingService] Request params:', {
      city, checkIn: defaultCheckIn, checkOut: defaultCheckOut, 
      minPrice, maxPrice, page
    });

    return this.http.get<PageResponse<HousingSummary>>(
      this.apiUrl,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      catchError(error => {
        console.error('❌ [HousingService] Error fetching housings:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get housing by ID
   */
  getHousingById(id: number): Observable<HousingDetails> {
    return this.http.get<ResponseDTO<HousingDetails>>(
      `${this.apiUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching housing details:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get housings by host ID
   * Backend endpoint: GET /housings/host/{hostId}?page={page}&size={size}
   */
  getHousingsByHost(hostId: number, page: number = 0, size: number = 10): Observable<PageResponse<HousingSummary>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    console.log('🔍 [HousingService] Fetching housings for host:', { hostId, page, size });

    return this.http.get<PageResponse<HousingSummary>>(
      `${this.apiUrl}/host/${hostId}`,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      map(response => {
        console.log('✅ [HousingService] Host housings response:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ [HousingService] Error fetching host housings:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Search housings by city
   */
  searchByCity(city: string, page: number = 0, size: number = 10): Observable<PageResponse<HousingSummary>> {
    return this.getAllHousings(page, size, city);
  }

  /**
   * Update housing (HOST only)
   * Backend endpoint: POST /housings/edit/{housingId}
   */
  updateHousing(id: number, housing: CreateHousingDTO): Observable<ResponseDTO<HousingDetails>> {
    console.log('🔄 [HousingService] Updating housing:', { id, housing });
    
    return this.http.post<ResponseDTO<HousingDetails>>(
      `${this.apiUrl}/edit/${id}`,
      housing,
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => {
        console.log('✅ [HousingService] Housing updated successfully:', response);
        return response;
      }),
      catchError(error => {
        console.error('❌ [HousingService] Error updating housing:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Delete housing (HOST only)
   * Backend: DELETE /housings/delete/{id}
   */
  deleteHousing(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/delete/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('Error deleting housing:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Map amenities to backend services enum
   * Backend enum values: WIFI, PARKING, POOL, GYM, PETS_ALLOWED, AIR_CONDITIONING, BREAKFAST_INCLUDED
   */
  mapAmenitiesToServices(amenities: string[]): string[] {
    const serviceMap: { [key: string]: string } = {
      'WiFi': 'WIFI',
      'Air Conditioning': 'AIR_CONDITIONING',
      'Parking': 'PARKING',
      'Pool': 'POOL',
      'Pet Friendly': 'PETS_ALLOWED',
      // These don't exist in backend enum, will be filtered out:
      'Kitchen': 'KITCHEN',
      'Washer': 'WASHER',
      'TV': 'TV',
      'Heating': 'HEATING'
    };

    return amenities
      .map(amenity => serviceMap[amenity])
      .filter(service => service !== undefined && ['WIFI', 'PARKING', 'POOL', 'GYM', 'PETS_ALLOWED', 'AIR_CONDITIONING', 'BREAKFAST_INCLUDED'].includes(service));
  }

  /**
   * Map backend services enum to frontend amenities
   * Reverse mapping of mapAmenitiesToServices
   */
  mapServicesToAmenities(services: string[]): string[] {
    const amenityMap: { [key: string]: string } = {
      'WIFI': 'WiFi',
      'AIR_CONDITIONING': 'Air Conditioning',
      'PARKING': 'Parking',
      'POOL': 'Pool',
      'PETS_ALLOWED': 'Pet Friendly',
      'GYM': 'Gym',
      'BREAKFAST_INCLUDED': 'Breakfast'
    };

    return services
      .map(service => amenityMap[service])
      .filter(amenity => amenity !== undefined);
  }
}
