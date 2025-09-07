import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth', 'login']);

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
