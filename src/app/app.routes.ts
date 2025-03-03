import { Routes } from '@angular/router';
import isLoggedGuardFn from '@guard/auth.guard.fn';
import HomeComponent from '@modules/home/home.component';
import LoginComponent from '@modules/login/login.component';
import RegisterComponent from '@modules/register/register.component';
import TaskListComponent from '@modules/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isLoggedGuardFn],
  },
  {
    path: 'task-list',
    component: TaskListComponent,
    canActivate: [isLoggedGuardFn],
  },
];
export default routes;
