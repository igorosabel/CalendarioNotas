import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import UserService from '@services/user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private us: UserService = inject(UserService);

  public isAuthenticated(): Observable<boolean> {
    return of(this.checkAuthenticated());
  }

  public checkAuthenticated(): boolean {
    this.us.loadLogin();
    const helper = new JwtHelperService();
    if (this.us.user !== null && this.us.user.token !== null) {
      return !helper.isTokenExpired(this.us.user.token);
    }
    return false;
  }
}
