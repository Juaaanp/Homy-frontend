import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
  bio: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  preferences: {
    currency: string;
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  stats: {
    totalBookings: number;
    totalReviews: number;
    memberSince: string;
    verified: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Simulated user data - ready to be replaced with HTTP calls
  private currentUser = signal<User>({
    id: 'user-1',
    email: 'juan.perez@example.com',
    fullName: 'Juan Pérez',
    phone: '+57 300 123 4567',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Travel enthusiast and digital nomad. Love exploring new places and experiencing different cultures.',
    dateOfBirth: '1995-06-15',
    address: {
      street: 'Calle 10 #5-25',
      city: 'Medellín',
      country: 'Colombia',
      postalCode: '050001'
    },
    preferences: {
      currency: 'USD',
      language: 'es',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    stats: {
      totalBookings: 12,
      totalReviews: 8,
      memberSince: '2023-03-15',
      verified: true
    }
  });

  constructor() {}

  // Simulate API call to get current user
  getCurrentUser(): Observable<User> {
    return of(this.currentUser()).pipe(delay(400));
  }

  // Simulate API call to update user profile
  updateProfile(updates: Partial<User>): Observable<User> {
    const updated = { ...this.currentUser(), ...updates };
    this.currentUser.set(updated);
    return of(updated).pipe(delay(600));
  }

  // Simulate API call to update avatar
  updateAvatar(avatarUrl: string): Observable<string> {
    const user = this.currentUser();
    user.avatar = avatarUrl;
    this.currentUser.set({ ...user });
    return of(avatarUrl).pipe(delay(500));
  }

  // Simulate API call to update password
  updatePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    // Mock validation - always succeeds in demo
    return of(true).pipe(delay(600));
  }

  // Simulate API call to update notification preferences
  updateNotificationPreferences(notifications: User['preferences']['notifications']): Observable<boolean> {
    const user = this.currentUser();
    user.preferences.notifications = notifications;
    this.currentUser.set({ ...user });
    return of(true).pipe(delay(400));
  }

  /* 
   * READY FOR BACKEND INTEGRATION:
   * Replace the methods above with actual HTTP calls like:
   * 
   * constructor(private http: HttpClient) {}
   * 
   * getCurrentUser(): Observable<User> {
   *   return this.http.get<User>(`${API_URL}/user/me`);
   * }
   * 
   * updateProfile(updates: Partial<User>): Observable<User> {
   *   return this.http.patch<User>(`${API_URL}/user/me`, updates);
   * }
   * 
   * updateAvatar(file: File): Observable<string> {
   *   const formData = new FormData();
   *   formData.append('avatar', file);
   *   return this.http.post<string>(`${API_URL}/user/avatar`, formData);
   * }
   */
}
