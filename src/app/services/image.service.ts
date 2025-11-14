import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  private imageUrl = `${environment.apiUrl}/api/images`;

  constructor() { }

  public upload(image: File): Observable<ResponseDTO> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<ResponseDTO>(this.imageUrl, formData).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('ImageService.upload', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  public delete(id: string): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(this.imageUrl, { params: { id } }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('ImageService.delete', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }
}
