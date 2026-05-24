import { Routes } from '@angular/router';
import { Base } from './base/base';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest.guard';
import { redirectGuard } from '../guards/redirect.guard';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '', component: Base, canActivate: [guestGuard] },
  { path: ':label', component: Base, canActivate: [guestGuard] },
  { path: '**', canActivate: [redirectGuard], component: Base },
];
