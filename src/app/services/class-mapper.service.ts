import { Injectable } from '@angular/core';
import { UserInterface } from '@interfaces/user.interfaces';
import User from '@model/user.model';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
  getUser(u: UserInterface): User {
    return new User().fromInterface(u);
  }
}
