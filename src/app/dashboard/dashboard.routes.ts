import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Team } from './team/team';
import { Projects } from './projects/projects';
import { Calendar } from './calendar/calendar';
import { Documents } from './documents/documents';
import { Reports } from './reports/reports';
import { Settings } from './settings/settings';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth', 'login']);

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'home',
        component: Home,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'team',
        component: Team,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'projects',
        component: Projects,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'calendar',
        component: Calendar,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'documents',
        component: Documents,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'reports',
        component: Reports,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'profile',
        component: Profile,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'settings',
        component: Settings,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];
