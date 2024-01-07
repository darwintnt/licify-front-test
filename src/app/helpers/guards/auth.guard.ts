import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../views/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.userValue;

  if (user) {
    return true;
  }

  router.navigate(['auth/login']);

  return false;
};
