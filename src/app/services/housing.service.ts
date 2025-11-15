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

// Backend HousingResponse: id, title, description, city, address, latitude, length, nightPrice, maxCapacity, services, images, averageRating, hostName
export interface HousingDetails {
  id: number; // Now included in backend HousingResponse
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
   * Get all active housings - SIMPLIFIED VERSION
   * Backend endpoint: GET /housings?indexPage=0&size=20
   * Returns all active properties without any filters
   */
  getAllHousings(
    page: number = 0, 
    size: number = 20
  ): Observable<PageResponse<HousingSummary>> {
    // Endpoint simplificado: solo envía paginación
    const params = new HttpParams()
      .set('indexPage', page.toString())
      .set('size', size.toString());

    console.log('Calling getAllHousings (simplified):', {
      page,
      size,
      url: this.houseURL
    });

    // Usar headers normales - el interceptor agregará el token si existe
    return this.http.get<PageResponse<HousingSummary>>(
      this.houseURL,
      { 
        params 
      }
    ).pipe(
      catchError((error: any) => {
        console.error('Error in getAllHousings:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        
        // Si es 401, el usuario necesita autenticarse
        if (error.status === 401) {
          console.warn('Authentication required for getAllHousings endpoint');
        }
        
        this.errorHandler.logError('HousingService.getAllHousings', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get housing by ID
   * Backend endpoint: GET /housings/{id}
   */
  getHousingById(id: number): Observable<HousingDetails> {
    console.log('Fetching housing by ID:', id, 'from:', `${this.houseURL}/${id}`);
    
    // SIMPLIFICADO: No requerir autenticación para ver detalles (público)
    return this.http.get<HousingDetails>(`${this.houseURL}/${id}`).pipe(
      map((response) => {
        console.log('Housing response received:', response);
        console.log('Response keys:', Object.keys(response || {}));
        console.log('Response id:', response?.id);
        console.log('Response title:', response?.title);
        
        // Validar que la respuesta tenga datos básicos
        if (!response || !response.id) {
          console.error('Invalid response structure:', response);
          throw new Error('Invalid property data received from server');
        }
        
        return response;
      }),
      catchError((error: any) => {
        console.error('Error fetching housing by ID:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        console.error('Full error:', JSON.stringify(error, null, 2));
        
        this.errorHandler.logError('HousingService.getHousingById', error);
        
        // Mejorar mensaje de error
        let message = 'Unable to load property details';
        if (error.status === 404) {
          message = 'Property not found';
        } else if (error.status === 400) {
          message = error.error?.message || 'Invalid property request';
        } else if (error.status === 500) {
          message = 'Server error. Please try again later';
        } else if (error.message) {
          message = error.message;
        }
        
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
   * NOTE: Currently returns all housings since backend endpoint is simplified
   * TODO: Re-implement city filter when backend supports it
   */
  searchByCity(city: string, page: number = 0, size: number = 10): Observable<PageResponse<HousingSummary>> {
    // Backend endpoint is simplified and doesn't support city filter yet
    // For now, return all housings and filter client-side if needed
    return this.getAllHousings(page, size);
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
