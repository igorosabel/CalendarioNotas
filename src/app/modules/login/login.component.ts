import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { disabled, email, form, FormField, required } from '@angular/forms/signals';
import { MatAnchor, MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginData, LoginResult } from '@interfaces/interfaces';
import ApiService from '@services/api.service';
import AuthService from '@services/auth.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatAnchor,
    FormsModule,
    FormField,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  private readonly as: ApiService = inject(ApiService);
  private readonly us: UserService = inject(UserService);
  private readonly router: Router = inject(Router);
  private readonly auth: AuthService = inject(AuthService);
  private readonly cms: ClassMapperService = inject(ClassMapperService);

  loginModel: WritableSignal<LoginData> = signal<LoginData>({
    email: '',
    pass: '',
  });
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email);
    required(schemaPath.pass);
    email(schemaPath.email);
    disabled(schemaPath.email, (): boolean => this.loginSending());
    disabled(schemaPath.pass, (): boolean => this.loginSending());
  });
  isValid: Signal<boolean> = computed(
    (): boolean =>
      this.loginForm.email().errors().length === 0 && this.loginForm.pass().errors().length === 0
  );
  loginError: WritableSignal<boolean> = signal<boolean>(false);
  loginSending: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  doLogin(ev: FormDataEvent): void {
    ev.preventDefault();

    if (!this.isValid()) {
      return;
    }

    this.loginSending.set(true);
    this.as.login(this.loginModel()).subscribe((result: LoginResult): void => {
      if (result.status === 'ok') {
        this.us.user = this.cms.getUser(result.user);
        this.us.saveLogin();

        this.router.navigate(['/home']);
      } else {
        this.loginSending.set(false);
        this.loginError.set(true);
      }
    });
  }
}
