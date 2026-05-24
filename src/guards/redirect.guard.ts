import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  router.navigate([token ? '/dashboard' : '/']);
  return false;
};
