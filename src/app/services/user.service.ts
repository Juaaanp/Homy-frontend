import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../models/response-dto';
import { TokenService } from './token.service';

// Backend User interface (matches backend entity)
export interface BackendUser {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  birthDate?: string;
  profileImage?: string;
}

// Frontend User interface (for component compatibility with extended fields)
export interface User {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  birthDate?: string;
  bio?: string;
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  stats?: {
    verified: boolean;
    totalBookings: number;
    totalReviews: number;
    memberSince: string;
  };
  preferences?: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    currency: string;
    language: string;
  };
}

// DTO for updating user profile
export interface UserUpdateDTO {
  name: string;
  phoneNumber: string;
  profileImageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  private usersURL = `${environment.apiUrl}/users`;

  constructor() { }

  /**
   * Get current logged-in user profile
   */
  public getCurrentUser(): Observable<User> {
    const userId = this.tokenService.getUserId();
    const email = this.tokenService.getEmail();
    
    if (!userId) {
      return of(this.getGuestUser());
    }

    return this.http.get<ResponseDTO>(`${this.usersURL}/${userId}`).pipe(
      map((response: ResponseDTO) => {
        if (!response.success || !response.content) {
          return this.getDefaultUser(userId, email);
        }
        return this.mapToUser(response.content);
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        return of(this.getDefaultUser(userId, email));
      })
    );
  }

  /**
   * Update user profile (name, phone, profile image)
   */
  public updateProfile(updates: Partial<UserUpdateDTO>): Observable<User> {
    const userId = this.tokenService.getUserId();
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }

    const dto: UserUpdateDTO = {
      name: updates.name || '',
      phoneNumber: updates.phoneNumber || '',
      profileImageUrl: updates.profileImageUrl
    };

    return this.http.put<any>(`${this.usersURL}/${userId}`, dto).pipe(
      map((response) => {
        // Backend returns UserResponseDTO directly or wrapped in ResponseDTO
        const userData = response.success ? response.content : response;
        return this.mapToUser(userData);
      }),
      catchError((error) => {
        console.error('Error updating profile:', error);
        throw error;
      })
    );
  }

  /**
   * Update notification preferences (future implementation)
   */
  public updateNotificationPreferences(preferences: any): Observable<any> {
    // This would need a backend endpoint
    console.warn('Notification preferences update not yet implemented in backend');
    return of({ success: true });
  }

  /**
   * Update password (requires current password)
   * Backend endpoint: PUT /users/{id}/password
   */
  public updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    const userId = this.tokenService.getUserId();
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    return this.http.put<any>(`${this.usersURL}/${userId}/password`, {
      currentPassword,
      newPassword
    }).pipe(
      catchError((error) => {
        console.error('Error updating password:', error);
        const message = error.error?.error || error.error?.message || 'Error al actualizar la contraseña';
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Get user by ID
   */
  public get(id: string): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.usersURL}/${id}`);
  }

  /**
   * Legacy methods for compatibility
   */
  public create(createUserDTO: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.usersURL, createUserDTO);
  }

  public edit(editUserDTO: any): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(this.usersURL, editUserDTO);
  }

  public delete(id: string): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.usersURL}/${id}`);
  }

  /**
   * Helper methods
   */
  private mapToUser(data: BackendUser | any): User {
    return {
      id: data.id?.toString() || '',
      name: data.name || '',
      fullName: data.name || '',
      email: data.email || '',
      phone: data.phoneNumber || data.phone || '',
      role: data.role || 'GUEST',
      avatar: data.profileImage || 'https://i.pravatar.cc/150?img=' + (data.id % 70),
      birthDate: data.birthDate,
      bio: '', // Not in backend yet
      address: {
        street: '',
        city: '',
        country: '',
        postalCode: ''
      },
      stats: {
        verified: false,
        totalBookings: 0,
        totalReviews: 0,
        memberSince: data.birthDate || new Date().toISOString()
      },
      preferences: {
        notifications: {
          email: true,
          sms: false,
          push: true
        },
        currency: 'COP',
        language: 'es'
      }
    };
  }

  private getGuestUser(): User {
    return {
      id: '',
      name: 'Guest',
      fullName: 'Guest User',
      email: '',
      phone: '',
      role: 'GUEST',
      avatar: 'https://i.pravatar.cc/150?img=1',
      stats: {
        verified: false,
        totalBookings: 0,
        totalReviews: 0,
        memberSince: new Date().toISOString()
      },
      preferences: {
        notifications: { email: true, sms: false, push: true },
        currency: 'COP',
        language: 'es'
      }
    };
  }

  private getDefaultUser(userId: string, email: string): User {
    return {
      id: userId,
      name: email.split('@')[0] || 'User',
      fullName: email.split('@')[0] || 'User',
      email: email,
      phone: '',
      role: this.tokenService.getRole() || 'GUEST',
      avatar: 'https://i.pravatar.cc/150?img=' + (parseInt(userId) % 70),
      stats: {
        verified: false,
        totalBookings: 0,
        totalReviews: 0,
        memberSince: new Date().toISOString()
      },
      preferences: {
        notifications: { email: true, sms: false, push: true },
        currency: 'COP',
        language: 'es'
      }
    };
  }
}
