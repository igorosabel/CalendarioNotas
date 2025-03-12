import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { DayResultInterface } from '@interfaces/calendar.interfaces';
import Entry from '@model/entry.model';
import DayListComponent from '@modules/shared/day-list/day-list.component';
import { getDate } from '@osumi/tools';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';

@Component({
  selector: 'app-task-list',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatCard,
    MatCardContent,
    MatInput,
    MatDatepickerModule,
    MatSuffix,
    MatCheckbox,
    DayListComponent,
    FormsModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export default class TaskListComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);

  allTasks: WritableSignal<boolean> = signal<boolean>(false);
  currentDate: Date = new Date();
  startDate: WritableSignal<string> = signal<string>('');
  startDateTimestamp: number = 0;
  endDate: WritableSignal<string> = signal<string>('');
  endDateTimestamp: number = 0;
  entries: WritableSignal<Entry[]> = signal<Entry[]>([]);

  ngOnInit(): void {
    this.getDates();
  }

  getDates(): void {
    const startOfWeek = new Date(this.currentDate);
    const endOfWeek = new Date(this.currentDate);

    // Obtener el día de la semana (0=domingo, 1=lunes, ..., 6=sábado)
    const dayOfWeek: number = this.currentDate.getDay();

    // Ajustar al lunes (restando los días necesarios)
    const diffToMonday: number = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(this.currentDate.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);
    this.startDate.set(getDate(startOfWeek));
    this.startDateTimestamp = Math.round(startOfWeek.getTime() / 1000);

    // Ajustar al domingo (sumando los días necesarios)
    const diffToSunday: number = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    endOfWeek.setDate(this.currentDate.getDate() + diffToSunday);
    endOfWeek.setHours(23, 59, 59, 999);
    this.endDate.set(getDate(endOfWeek));
    this.endDateTimestamp = Math.round(endOfWeek.getTime() / 1000);

    this.getWeekEntries();
  }

  onDateSelected(date: MatDatepickerInputEvent<Date>): void {
    if (date.value !== null) {
      this.currentDate = date.value;
      this.getDates();
    }
  }

  changeWeek(step: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + step * 7);
    this.currentDate = newDate;
    this.getDates();
  }

  getWeekEntries(): void {
    this.as
      .getWeekEntries(this.startDateTimestamp, this.endDateTimestamp)
      .subscribe((result: DayResultInterface): void => {
        if (result.status === 'ok') {
          this.entries.set(this.cms.getEntries(result.list));
        }
      });
  }

  changeAllTasks(): void {
    if (this.allTasks()) {
      this.as.getAllTasks().subscribe((result: DayResultInterface): void => {
        if (result.status === 'ok') {
          this.entries.set(this.cms.getEntries(result.list));
        }
      });
    } else {
      this.getWeekEntries();
    }
  }
}
