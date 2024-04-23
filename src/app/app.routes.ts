import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'principal-page',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'new-account',
    loadComponent: () => import('./new-account/new-account.page').then( m => m.NewAccountPage)
  },
  {
    path: 'login-driver',
    loadComponent: () => import('./login-driver/login-driver.page').then( m => m.LoginDriverPage)
  },
  {
    path: 'principal-page',
    loadComponent: () => import('./principal-page/principal-page.page').then( m => m.PrincipalPagePage)
  },
  {
    path: 'register-user',
    loadComponent: () => import('./register-user/register-user.page').then( m => m.RegisterUserPage)
  },
  {
    path: 'register-driver',
    loadComponent: () => import('./register-driver/register-driver.page').then( m => m.RegisterDriverPage)
  },
];
