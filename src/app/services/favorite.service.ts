import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private favoritesURL = `${environment.apiUrl}/favorites`;

  /**
   * Add housing to favorites
   * POST /favorites/{housingId}
   */
  addFavorite(housingId: number): Observable<any> {
    return this.http.post<any>(`${this.favoritesURL}/${housingId}`, {});
  }

  /**
   * Remove housing from favorites
   * DELETE /favorites/{housingId}
   */
  removeFavorite(housingId: number): Observable<any> {
    return this.http.delete<any>(`${this.favoritesURL}/${housingId}`);
  }

  /**
   * Get user's favorite housing IDs
   * GET /favorites
   */
  getUserFavorites(): Observable<number[]> {
    return this.http.get<{ housingIds: number[] }>(this.favoritesURL).pipe(
      map(response => response.housingIds || [])
    );
  }

  /**
   * Get favorite count for a housing
   * GET /favorites/{housingId}/count
   */
  getFavoriteCount(housingId: number): Observable<number> {
    return this.http.get<{ count: number }>(`${this.favoritesURL}/${housingId}/count`).pipe(
      map(response => response.count || 0)
    );
  }

  /**
   * Check if housing is in user's favorites
   * GET /favorites/{housingId}/check
   */
  isFavorite(housingId: number): Observable<boolean> {
    return this.http.get<{ isFavorite: boolean }>(`${this.favoritesURL}/${housingId}/check`).pipe(
      map(response => response.isFavorite || false)
    );
  }
}

