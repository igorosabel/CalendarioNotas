import { Injectable } from '@angular/core';
import { EntryInterface } from '@interfaces/calendar.interfaces';
import { UserInterface } from '@interfaces/user.interfaces';
import Entry from '@model/entry.model';
import User from '@model/user.model';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
  getUser(u: UserInterface): User {
    return new User().fromInterface(u);
  }

  getEntry(e: EntryInterface): Entry {
    return new Entry().fromInterface(e);
  }

  getEntries(e: EntryInterface[]): Entry[] {
    return e.map((entry: EntryInterface): Entry => this.getEntry(entry));
  }
}
