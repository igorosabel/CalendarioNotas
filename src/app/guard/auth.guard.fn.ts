import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import AuthService from '@services/auth.service';
import { Observable, map } from 'rxjs';

const isLoggedGuardFn: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map((isLoggedIn: boolean): boolean | UrlTree => {
      return isLoggedIn ? true : router.parseUrl('/');
    }),
  );
};
export default isLoggedGuardFn;
