import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  
  /**
   * Extract error message from HTTP error response
   */
  extractErrorMessage(error: any): string {
    if (error instanceof HttpErrorResponse) {
      // Try to get message from different possible locations
      if (error.error?.message) {
        return error.error.message;
      }
      if (error.error?.error?.message) {
        return error.error.error.message;
      }
      if (error.error?.content?.message) {
        return error.error.content.message;
      }
      if (error.error?.error) {
        return error.error.error;
      }
      if (typeof error.error === 'string') {
        return error.error;
      }
      
      // Default messages based on status code
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'Authentication required. Please log in.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'Resource not found.';
        case 409:
          return 'Conflict. This resource already exists.';
        case 422:
          return 'Validation error. Please check your input.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return error.message || 'An unexpected error occurred.';
      }
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return 'An unexpected error occurred.';
  }

  /**
   * Get full error details for logging
   */
  getErrorDetails(error: any): ApiError {
    if (error instanceof HttpErrorResponse) {
      return {
        message: this.extractErrorMessage(error),
        status: error.status,
        statusText: error.statusText,
        details: error.error
      };
    }
    
    return {
      message: this.extractErrorMessage(error),
      status: 0,
      statusText: 'Unknown',
      details: error
    };
  }

  /**
   * Show error notification to user
   */
  showError(error: any, title: string = 'Error'): void {
    const message = this.extractErrorMessage(error);
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#f97316'
    });
  }

  /**
   * Show success notification
   */
  showSuccess(message: string, title: string = 'Success'): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#f97316',
      timer: 3000,
      showConfirmButton: false
    });
  }

  /**
   * Log error to console with details
   */
  logError(context: string, error: any): void {
    const errorDetails = this.getErrorDetails(error);
    console.error(`[${context}] Error:`, {
      message: errorDetails.message,
      status: errorDetails.status,
      statusText: errorDetails.statusText,
      details: errorDetails.details
    });
  }
}

