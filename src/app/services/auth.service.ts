import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { LoginDTO } from '../models/login-dto';
import { RegisterDTO } from '../models/register-dto';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  private authURL = `${environment.apiUrl}/auth`;
  private userURL = `${environment.apiUrl}/users`;

  constructor() { }

  public login(loginDTO: LoginDTO): Observable<any> {
    // Login devuelve { accessToken: string } directamente, no ResponseDTO
    return this.http.post<any>(`${this.authURL}/login`, loginDTO).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('AuthService.login', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  public register(registerDTO: RegisterDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.authURL}/register`, registerDTO).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('AuthService.register', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  public requestPasswordReset(email: string): Observable<any> {
    // Backend espera { email: "..." } y devuelve Map.of("message", "...")
    return this.http.post<any>(`${this.userURL}/forgot-password`, { email }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('AuthService.requestPasswordReset', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  public verifyResetCode(email: string, code: string): Observable<any> {
    // Verificar el código antes de cambiar la contraseña
    return this.http.post<any>(`${this.userURL}/verify-code`, { 
      email, 
      code 
    }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('AuthService.verifyResetCode', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }

  public confirmPasswordReset(email: string, code: string, newPassword: string): Observable<any> {
    // Backend espera PasswordResetRequest { email, code, newPassword }
    return this.http.post<any>(`${this.userURL}/reset-password`, { 
      email, 
      code, 
      newPassword 
    }).pipe(
      catchError((error: any) => {
        this.errorHandler.logError('AuthService.confirmPasswordReset', error);
        const message = this.errorHandler.extractErrorMessage(error);
        return throwError(() => new Error(message));
      })
    );
  }
}
