import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { ErrorHandlerService } from './error-handler.service';
import { HousingSummary } from './housing.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private errorHandler = inject(ErrorHandlerService);
  private favoritesURL = `${environment.apiUrl}/favorites`;

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Add housing to favorites
   * POST /favorites/{housingId}
   */
  addFavorite(housingId: number): Observable<void> {
    return this.http.post<void>(`${this.favoritesURL}/${housingId}`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('FavoriteService.addFavorite', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Remove housing from favorites
   * DELETE /favorites/{housingId}
   */
  removeFavorite(housingId: number): Observable<void> {
    return this.http.delete<void>(`${this.favoritesURL}/${housingId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('FavoriteService.removeFavorite', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get user's favorite housings
   * GET /favorites - Returns List<SummaryHousingResponse>
   */
  getUserFavorites(): Observable<HousingSummary[]> {
    return this.http.get<HousingSummary[]>(this.favoritesURL, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('FavoriteService.getUserFavorites', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get favorite count for a housing
   * GET /favorites/{housingId}/count - Returns Long (number)
   */
  getFavoriteCount(housingId: number): Observable<number> {
    // This endpoint is public, but we send token if available
    const token = this.tokenService.getToken();
    const headers = token
      ? this.getAuthHeaders()
      : new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<number>(`${this.favoritesURL}/${housingId}/count`, { headers }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('FavoriteService.getFavoriteCount', error);
        // Return 0 on error for count
        return throwError(() => new Error('Failed to get favorite count'));
      })
    );
  }

  /**
   * Check if housing is in user's favorites
   * GET /favorites/{housingId}/check - Returns Boolean
   */
  isFavorite(housingId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.favoritesURL}/${housingId}/check`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('FavoriteService.isFavorite', error);
        // Return false on error
        return throwError(() => new Error('Failed to check favorite status'));
      })
    );
  }
}

