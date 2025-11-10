import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { LoginDTO } from '../models/login-dto';
import { RegisterDTO } from '../models/register-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private authURL = `${environment.apiUrl}/auth`;
  private userURL = `${environment.apiUrl}/users`;

  constructor() { }

  public login(loginDTO: LoginDTO): Observable<any> {
    // Login devuelve { accessToken: string } directamente, no ResponseDTO
    return this.http.post<any>(`${this.authURL}/login`, loginDTO);
  }

  public register(registerDTO: RegisterDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.authURL}/register`, registerDTO);
  }

  public requestPasswordReset(email: string): Observable<any> {
    // Backend espera { email: "..." } y devuelve Map.of("message", "...")
    return this.http.post<any>(`${this.userURL}/forgot-password`, { email });
  }

  public verifyResetCode(email: string, code: string): Observable<any> {
    // Verificar el código antes de cambiar la contraseña
    return this.http.post<any>(`${this.userURL}/verify-code`, { 
      email, 
      code 
    });
  }

  public confirmPasswordReset(email: string, code: string, newPassword: string): Observable<any> {
    // Backend espera PasswordResetRequest { email, code, newPassword }
    return this.http.post<any>(`${this.userURL}/reset-password`, { 
      email, 
      code, 
      newPassword 
    });
  }
}
