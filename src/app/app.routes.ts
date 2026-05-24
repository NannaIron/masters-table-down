import { Routes } from '@angular/router';
import { Base } from './base/base';

export const routes: Routes = [
  { path: ':label', component: Base },
  { path: '', component: Base },
];
