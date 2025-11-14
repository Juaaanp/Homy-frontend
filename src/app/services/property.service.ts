import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { TokenService } from './token.service';

// Frontend interface for Property (for component compatibility)
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  rating: number;
  reviews: number;
  reviewCount?: number;
  guests: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  images: string[];
  imageUrl?: string;
  amenities: string[];
  isNew?: boolean;
  featured?: boolean;
  [key: string]: any; // Allow additional properties
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private housingsURL = `${environment.apiUrl}/housings`;

  constructor() { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  public create(createPlaceDTO: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      `${this.housingsURL}/create`, 
      createPlaceDTO,
      { headers: this.getAuthHeaders() }
    );
  }

  public edit(id: number, editPlaceDTO: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      `${this.housingsURL}/edit/${id}`, 
      editPlaceDTO,
      { headers: this.getAuthHeaders() }
    );
  }

  public delete(id: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(
      `${this.housingsURL}/delete/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  public getById(id: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(
      `${this.housingsURL}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  public getAll(
    city?: string,
    checkIn?: string,
    checkOut?: string,
    page: number = 0,
    size: number = 20
  ): Observable<ResponseDTO> {
    // Backend requires: city, checkIn, checkOut, minPrice, maxPrice, indexPage
    const defaultCity = city || 'Bogotá';
    const defaultCheckIn = checkIn || new Date().toISOString().split('T')[0];
    const defaultCheckOut = checkOut || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let params = new HttpParams()
      .set('city', defaultCity)
      .set('checkIn', defaultCheckIn)
      .set('checkOut', defaultCheckOut)
      .set('minPrice', '0')
      .set('maxPrice', '100000000')
      .set('indexPage', page.toString());

    return this.http.get<ResponseDTO>(this.housingsURL, { params });
  }

  public getComentarios(id: number, page: number = 0, size: number = 10): Observable<ResponseDTO> {
    // Backend uses /housings/{housingId}/comments (not comentarios)
    return this.http.get<any>(
      `${this.housingsURL}/${id}/comments`,
      { headers: this.getAuthHeaders() }
    );
  }

  public createComentario(id: number, comentarioDTO: any): Observable<ResponseDTO> {
    // Backend uses POST /housings/{housingId}/comments/create
    return this.http.post<ResponseDTO>(
      `${this.housingsURL}/${id}/comments/create`, 
      comentarioDTO,
      { headers: this.getAuthHeaders() }
    );
  }

  // Compatibility methods for existing components
  public getPropertyById(id: string): Observable<Property | undefined> {
    return this.getById(parseInt(id)).pipe(
      map((response: ResponseDTO) => {
        if (!response.success || !response.content) return undefined;
        return this.mapToProperty(response.content);
      })
    );
  }

  public getAllProperties(): Observable<Property[]> {
    // Usar valores por defecto para city, checkIn, checkOut
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    return this.getAll('Bogota', today, tomorrow, 0, 50).pipe(
      map((response: ResponseDTO) => {
        if (!response.success || !response.content || !response.content.content) return [];
        return response.content.content.map((item: any) => this.mapToProperty(item));
      })
    );
  }

  public getFeaturedProperties(): Observable<Property[]> {
    return this.getAllProperties().pipe(
      map(properties => properties.filter(p => p.rating >= 4.5).slice(0, 6))
    );
  }

  // Helper to map backend response to Property interface
  private mapToProperty(data: any): Property {
    return {
      id: data.id?.toString() || '',
      title: data.titulo || data.title || '',
      description: data.descripcion || data.description || '',
      price: data.precioPorNoche || data.price || 0,
      location: data.ciudad || data.location || data.city || '',
      city: data.ciudad || data.city || '',
      rating: data.promedioCalificacion || data.rating || 0,
      reviews: data.numeroReservas || data.reviews || 0,
      reviewCount: data.numeroReservas || data.reviews || 0,
      guests: data.capacidad || data.guests || 1,
      bedrooms: data.bedrooms || 2,
      bathrooms: data.bathrooms || 1,
      type: data.type || 'Apartment',
      images: data.imagenes?.map((img: any) => img.url || img) || data.images || [],
      imageUrl: data.imagenPrincipal || data.imageUrl || '',
      amenities: data.servicios || data.amenities || [],
      isNew: data.isNew || false,
      featured: (data.promedioCalificacion || data.rating || 0) >= 4.5
    };
  }
}
