import { Routes } from '@angular/router';
import isLoggedGuardFn from '@guard/auth.guard.fn';

const routes: Routes = [
  { path: '', loadComponent: () => import('@modules/login/login.component') },
  {
    path: 'register',
    loadComponent: () => import('@modules/register/register.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('@modules/home/home.component'),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: 'task-list',
    loadComponent: () => import('@modules/task-list/task-list.component'),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: 'profile',
    loadComponent: () => import('@modules/profile/profile.component'),
    canActivate: [isLoggedGuardFn],
  },
];
export default routes;
