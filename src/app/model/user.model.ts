import { UserInterface } from '@interfaces/user.interfaces';
import { urldecode, urlencode } from '@osumi/tools';

export default class User {
  constructor(
    public id: number | null = null,
    public email: string | null = null,
    public name: string | null = null,
    public token: string | null = null
  ) {}

  fromInterface(u: UserInterface): User {
    this.id = u.id;
    this.email = urldecode(u.email);
    this.name = urldecode(u.name);
    this.token = urldecode(u.token);

    return this;
  }

  toInterface(): UserInterface {
    return {
      id: this.id,
      email: urlencode(this.email),
      name: urlencode(this.name),
      token: urlencode(this.token),
    };
  }
}
