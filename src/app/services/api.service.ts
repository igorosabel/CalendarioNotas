import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  DayResultInterface,
  GetCalendarResultInterface,
} from '@interfaces/calendar.interfaces';
import {
  LoginData,
  LoginResult,
  RegisterData,
  StatusResultInterface,
} from '@interfaces/interfaces';
import Entry from '@model/entry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  private http: HttpClient = inject(HttpClient);

  apiUrl: string = environment.apiUrl;

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'login', data);
  }

  register(data: RegisterData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'register', data);
  }

  getCalendar(
    month: number,
    year: number
  ): Observable<GetCalendarResultInterface> {
    return this.http.post<GetCalendarResultInterface>(
      this.apiUrl + 'get-calendar',
      {
        month,
        year,
      }
    );
  }

  getDay(
    day: number,
    month: number,
    year: number
  ): Observable<DayResultInterface> {
    return this.http.post<DayResultInterface>(this.apiUrl + 'get-day', {
      day,
      month,
      year,
    });
  }

  addEntry(entry: Entry): Observable<StatusResultInterface> {
    return this.http.post<StatusResultInterface>(
      this.apiUrl + 'add-entry',
      entry
    );
  }

  checkEntry(id: number): Observable<StatusResultInterface> {
    return this.http.post<StatusResultInterface>(this.apiUrl + 'check-entry', {
      id,
    });
  }

  deleteEntry(id: number): Observable<StatusResultInterface> {
    return this.http.post<StatusResultInterface>(this.apiUrl + 'delete-entry', {
      id,
    });
  }

  updateProfile(data: RegisterData): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.apiUrl + 'update-profile', data);
  }
}
