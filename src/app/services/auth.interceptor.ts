import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

/**
 * HTTP Interceptor to add JWT token to all outgoing requests
 * Uses functional interceptor pattern (Angular 15+)
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  // Skip adding token for auth endpoints (login/register)
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  // If token exists, clone request and add Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  // No token, proceed with original request
  return next(req);
};
