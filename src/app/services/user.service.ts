import { Injectable } from '@angular/core';
import { UserInterface } from '@interfaces/user.interfaces';
import User from '@model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export default class UserService {
  loggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get logged$(): Observable<boolean> {
    return this.loggedSubject.asObservable();
  }
  user: User | null = null;

  loadLogin(): void {
    const loginStr: string | null = localStorage.getItem('login');
    if (loginStr === null) {
      this.logout();
      return;
    }
    const loginObj: UserInterface = JSON.parse(loginStr);
    if (loginObj === null) {
      this.logout();
      return;
    }
    this.loggedSubject.next(true);
    this.user = new User().fromInterface(loginObj);
  }

  saveLogin(): void {
    if (this.user !== null) {
      localStorage.setItem('login', JSON.stringify(this.user.toInterface()));
      this.loggedSubject.next(true);
    }
  }

  logout(): void {
    this.loggedSubject.next(false);
    this.user = null;
    localStorage.removeItem('login');
  }
}
