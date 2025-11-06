import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading' | 'default';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  private defaultDuration = 4000;
  private maxToasts = 5;

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private addToast(toast: Omit<Toast, 'id' | 'createdAt'>): string {
    const id = this.generateId();
    const newToast: Toast = {
      ...toast,
      id,
      createdAt: Date.now(),
      duration: toast.duration ?? this.defaultDuration,
      dismissible: toast.dismissible ?? true
    };

    const currentToasts = this.toastsSubject.value;
    const updatedToasts = [newToast, ...currentToasts].slice(0, this.maxToasts);
    this.toastsSubject.next(updatedToasts);

    // Auto dismiss if duration is set
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }

    return id;
  }

  success(title: string, description?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'success',
      title,
      description,
      ...options
    });
  }

  error(title: string, description?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'error',
      title,
      description,
      duration: options?.duration ?? 6000, // Errors last longer
      ...options
    });
  }

  info(title: string, description?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'info',
      title,
      description,
      ...options
    });
  }

  warning(title: string, description?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'warning',
      title,
      description,
      ...options
    });
  }

  loading(title: string, description?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'loading',
      title,
      description,
      duration: 0, // Loading toasts don't auto-dismiss
      dismissible: false,
      ...options
    });
  }

  default(title: string, description?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'default',
      title,
      description,
      ...options
    });
  }

  // Promise helper
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> {
    const loadingId = this.loading(messages.loading);

    return promise
      .then((data) => {
        this.dismiss(loadingId);
        const successMsg = typeof messages.success === 'function' 
          ? messages.success(data) 
          : messages.success;
        this.success(successMsg);
        return data;
      })
      .catch((error) => {
        this.dismiss(loadingId);
        const errorMsg = typeof messages.error === 'function' 
          ? messages.error(error) 
          : messages.error;
        this.error(errorMsg);
        throw error;
      });
  }

  dismiss(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(updatedToasts);
  }

  dismissAll(): void {
    this.toastsSubject.next([]);
  }

  update(id: string, updates: Partial<Toast>): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    );
    this.toastsSubject.next(updatedToasts);
  }
}
