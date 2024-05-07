import { Routes } from '@angular/router';
import { demonGuard } from './guard/authguard';

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
  {
    path: 'user-page',
    loadComponent: () => import('./user-page/user-page.page').then( m => m.UserPagePage),
    // canActivate :[demonGuard]
  },
  {
    path: 'driver-page',
    loadComponent: () => import('./driver-page/driver-page.page').then( m => m.DriverPagePage),
    canActivate : [demonGuard]
  },
  {
    path: 'admin-page',
    loadComponent: () => import('./admin-page/admin-page.page').then( m => m.AdminPagePage),
    canActivate:[demonGuard]
  },

];
