import { Routes } from '@angular/router';
import { Base } from './base/base';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: ':label', component: Base },
  { path: '', component: Base },
];
