import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginResult, RegisterData } from '@interfaces/interfaces';
import User from '@model/user.model';
import { DialogService } from '@osumi/angular-tools';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatButton,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private us: UserService = inject(UserService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private dialog: DialogService = inject(DialogService);

  userData: RegisterData = {
    email: '',
    name: '',
    pass: '',
    conf: '',
  };
  updateEmailError: WritableSignal<boolean> = signal<boolean>(false);
  updatePassError: WritableSignal<boolean> = signal<boolean>(false);
  updateSending: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    const user: User | null = this.us.user;
    if (user !== null) {
      this.userData.email = user.email !== null ? user.email : '';
      this.userData.name = user.name !== null ? user.name : '';
    }
  }

  updateProfile(ev: FormDataEvent): void {
    ev.preventDefault();

    if (this.userData.email === '' || this.userData.name === '') {
      return;
    }

    this.updatePassError.set(false);
    if (
      (this.userData.pass !== '' || this.userData.conf !== '') &&
      this.userData.pass !== this.userData.conf
    ) {
      this.updatePassError.set(true);
      return;
    }

    this.updateSending.set(true);
    this.as
      .updateProfile(this.userData)
      .subscribe((result: LoginResult): void => {
        this.updateSending.set(false);
        if (result.status === 'ok') {
          this.us.user = this.cms.getUser(result.user);
          this.us.saveLogin();

          this.dialog.alert({
            title: 'Datos guardados',
            content: 'Datos guardados correctamente.',
          });
        }
        if (result.status === 'error-email') {
          this.updateEmailError.set(true);
        }
        if (result.status === 'error') {
          this.dialog.alert({
            title: 'Error',
            content: 'Ocurrió un error al actualizar los datos.',
          });
        }
      });
  }
}
