import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../views/auth/auth.service';
import { inject } from '@angular/core';

export const IsProvider: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = !authService.isConstructorUser;

  if (user) {
    return true;
  }

  router.navigate(['provider/active']);

  return false;
};
