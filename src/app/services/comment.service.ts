import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { ErrorHandlerService } from './error-handler.service';

export interface Comment {
  id: number;
  guestName: string;
  housingTitle: string;
  housingId: number;
  rate: number;
  content: string;
  hostReply: string | null;
  createdAt: string;
}

export interface CommentRequest {
  bookingId: number;
  housingId: number;
  rate: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private errorHandler = inject(ErrorHandlerService);
  private housingsURL = `${environment.apiUrl}/housings`;

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
   * Get all comments for a housing
   * GET /housings/{housingId}/comments
   */
  getComments(housingId: number): Observable<Comment[]> {
    // This endpoint is public, but we send token if available
    const token = this.tokenService.getToken();
    const headers = token
      ? this.getAuthHeaders()
      : new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Comment[]>(`${this.housingsURL}/${housingId}/comments`, { headers }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('CommentService.getComments', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Create a new comment
   * POST /housings/{housingId}/comments/create
   */
  createComment(housingId: number, comment: CommentRequest): Observable<any> {
    return this.http.post<any>(
      `${this.housingsURL}/${housingId}/comments/create`,
      comment,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('CommentService.createComment', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Reply to a comment (Host only)
   * POST /housings/{housingId}/comments/{commentId}?message=...
   */
  replyToComment(housingId: number, commentId: number, message: string): Observable<void> {
    // Backend expects message as query parameter
    return this.http.post<void>(
      `${this.housingsURL}/${housingId}/comments/${commentId}?message=${encodeURIComponent(message)}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('CommentService.replyToComment', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }
}

