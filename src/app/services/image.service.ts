import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private imageUrl = `${environment.apiUrl}/imagenes`;

  constructor() { }

  public upload(image: File): Observable<ResponseDTO> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<ResponseDTO>(this.imageUrl, formData);
  }

  public delete(id: string): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(this.imageUrl, { params: { id } });
  }
}
