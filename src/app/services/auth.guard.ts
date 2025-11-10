import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

/**
 * Route guard to protect authenticated-only routes
 * Redirects to login with returnUrl if user is not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isLogged()) {
    return true;
  }

  // Not logged in, redirect to login with return URL
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });

  return false;
};
