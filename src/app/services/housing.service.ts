import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';


// Backend DTOs
// Backend CreateOrEditHousingRequest: title, description, city, latitude, length, address, maxCapacity, pricePerNight, services, imagesUrls
export interface CreateHousingDTO {
  title: string;
  description: string;
  city: string;
  latitude: number;
  length: number; // Backend uses "length" instead of "longitude"
  address: string;
  maxCapacity: number;
  pricePerNight: number; // Backend uses pricePerNight
  services: string[]; // List<ServicesEnum> - e.g., ["WIFI", "PARKING", "POOL"]
  imagesUrls: string[]; // Backend uses imagesUrls (plural)
}

// Backend SummaryHousingResponse: id, title, city, nightPrice, principalImage, averageRating
export interface HousingSummary {
  id: number;
  title: string;
  city: string;
  nightPrice: number; // Backend uses nightPrice, not pricePerNight
  principalImage: string | null; // Backend uses principalImage, not imageUrl
  averageRating: number | null;
  // Frontend compatibility fields (mapped from backend)
  address?: string; // Not in backend SummaryHousingResponse
  pricePerNight?: number; // Alias for nightPrice
  maxCapacity?: number; // Not in backend SummaryHousingResponse
  imageUrl?: string | null; // Alias for principalImage
}

// Backend HousingResponse: title, description, city, address, latitude, length, nightPrice, maxCapacity, services, images, averageRating, hostName
export interface HousingDetails {
  id?: number; // Not in backend HousingResponse, but we can infer it
  title: string;
  description: string;
  city: string;
  address: string;
  latitude: number;
  length: number; // Backend uses "length" instead of "longitude"
  nightPrice: number; // Backend uses nightPrice
  maxCapacity: number;
  services: string[]; // List<ServicesEnum>
  images: string[]; // Backend returns List<String>, not List<HousingImage>
  averageRating: number | null;
  hostName: string;
  // Frontend compatibility fields
  pricePerNight?: number; // Alias for nightPrice
  hostId?: number; // Not in backend HousingResponse
  createdAt?: string; // Not in backend HousingResponse
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
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private errorHandler = inject(ErrorHandlerService);
  private houseURL = `${environment.apiUrl}/housings`;

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
      `${this.houseURL}/create`,
      housing,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.createHousing', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
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
    city: string = 'Bogotá', 
    checkIn?: string, 
    checkOut?: string, 
    minPrice: number = 0, 
    maxPrice: number = 100000000
  ): Observable<PageResponse<HousingSummary>> {
    // Default dates if not provided (today and 30 days from now)
    const defaultCheckIn = checkIn || new Date().toISOString().split('T')[0];
    const defaultCheckOut = checkOut || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    let params = new HttpParams()
      .set('city', city)
      .set('checkIn', defaultCheckIn)
      .set('checkOut', defaultCheckOut)
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString())
      .set('indexPage', page.toString());

    return this.http.get<PageResponse<HousingSummary>>(
      this.houseURL,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.getAllHousings', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get housing by ID
   * Backend returns HousingResponse directly, not wrapped in ResponseDTO
   * Note: This endpoint doesn't require authentication, but we send token anyway for consistency
   */
  getHousingById(id: number): Observable<HousingDetails> {
    // Try with auth headers first, fallback to no auth if 401
    const token = this.tokenService.getToken();
    const headers = token 
      ? this.getAuthHeaders() 
      : new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.get<HousingDetails>(
      `${this.houseURL}/${id}`,
      { headers }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.getHousingById', error);
        // If 401, try without auth
        if (error.status === 401 && token) {
          return this.http.get<HousingDetails>(
            `${this.houseURL}/${id}`,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
          ).pipe(
            catchError((err: any) => {
              this.errorHandler.logError('HousingService.getHousingById (no auth)', err);
              const message = this.errorHandler.extractErrorMessage(err);
              return throwError(() => new Error(message));
            })
          );
        }
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get housings by host ID
   */
  getHousingsByHost(hostId: number, page: number = 0, size: number = 10): Observable<PageResponse<HousingSummary>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<HousingSummary>>(
      `${this.houseURL}/host/${hostId}`,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.getHousingsByHost', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
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
   * Backend uses POST /housings/edit/{housingId}
   */
  updateHousing(id: number, housing: CreateHousingDTO): Observable<EntityCreatedResponse> {
    return this.http.post<EntityCreatedResponse>(
      `${this.houseURL}/edit/${id}`,
      housing,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.updateHousing', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Delete housing (HOST only)
   * Backend uses DELETE /housings/delete/{housingId}
   */
  deleteHousing(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.houseURL}/delete/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.deleteHousing', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get housing metrics (bookings count and average rating)
   * Backend endpoint: GET /housings/{housingId}/metrics?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD
   */
  getHousingMetrics(housingId: number, dateFrom?: string, dateTo?: string): Observable<any> {
    let params = new HttpParams();
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    
    return this.http.get<any>(
      `${this.houseURL}/${housingId}/metrics`,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.getHousingMetrics', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get availability calendar for a housing
   * Backend endpoint: GET /housings/{housingId}/availability?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
   */
  getAvailabilityCalendar(housingId: number, startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this.http.get<any>(
      `${this.houseURL}/${housingId}/availability`,
      { 
        headers: this.getAuthHeaders(),
        params 
      }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('HousingService.getAvailabilityCalendar', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
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
}
