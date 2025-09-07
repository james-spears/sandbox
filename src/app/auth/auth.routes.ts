import { Routes } from '@angular/router';
import { Auth } from './auth';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
      },
      {
        path: 'reset-password',
        component: ResetPassword,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
