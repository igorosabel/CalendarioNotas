import {
  Component,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarDayInterface,
  GetCalendarDayInterface,
  GetCalendarResultInterface,
} from '@interfaces/calendar.interfaces';
import { DayModalInterface } from '@interfaces/modals.interfaces';
import DayComponent from '@modules/shared/day/day.component';
import { padNumber } from '@modules/shared/utils';
import { OverlayService } from '@osumi/angular-tools';
import ApiService from '@services/api.service';
import CalendarService from '@services/calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export default class CalendarComponent implements OnChanges, OnDestroy {
  private readonly as: ApiService = inject(ApiService);
  private readonly os: OverlayService = inject(OverlayService);
  private readonly cs: CalendarService = inject(CalendarService);

  month: InputSignal<number> = input.required();
  year: InputSignal<number> = input.required();

  days: CalendarDayInterface[] = [];
  private refreshSubscription: Subscription | null = this.cs.refreshObservable$.subscribe(
    (refreshNeeded: boolean): void => {
      if (refreshNeeded) {
        this.generateCalendar();
        this.cs.resetRefresh();
      }
    }
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month'] || changes['year']) {
      this.generateCalendar();
    }
  }

  generateCalendar(): void {
    const firstDayOfMonth: number = new Date(this.year(), this.month() - 1, 1).getDay();
    const daysInMonth: number = new Date(this.year(), this.month(), 0).getDate();
    const daysInPrevMonth: number = new Date(this.year(), this.month() - 1, 0).getDate();

    // Ajustar el primer día de la semana (lunes = 0, domingo = 6)
    const startDay: number = (firstDayOfMonth + 6) % 7;

    this.days = [];

    // Días del mes anterior
    for (let i = startDay - 1; i >= 0; i--) {
      this.days.push({
        day: daysInPrevMonth - i,
        month: this.month() - 1,
        year: this.year(),
        currentMonth: false,
        uniqueId: `prev-${daysInPrevMonth - i}`,
        num: 0,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push({
        day: i,
        month: this.month(),
        year: this.year(),
        currentMonth: true,
        uniqueId: `current-${i}`,
        num: 0,
      });
    }

    // Días del mes siguiente
    const totalDays: number = this.days.length;
    const remainingDays: number = Math.ceil(totalDays / 7) * 7 - totalDays;
    for (let i = 1; i <= remainingDays; i++) {
      this.days.push({
        day: i,
        month: this.month() + 1,
        year: this.year(),
        currentMonth: false,
        uniqueId: `next-${i}`,
        num: 0,
      });
    }

    this.as
      .getCalendar(this.month(), this.year())
      .subscribe((result: GetCalendarResultInterface): void => {
        if (result.status === 'ok') {
          result.list.forEach((day: GetCalendarDayInterface): void => {
            const index: number = this.days.findIndex(
              (d: CalendarDayInterface): boolean => d.day === day.day && d.currentMonth
            );
            if (index !== -1) {
              this.days[index].num = day.num;
            }
          });
        }
      });
  }

  selectDay(day: CalendarDayInterface): void {
    const modalDayData: DayModalInterface = {
      modalTitle: `${padNumber(day.day)}/${padNumber(day.month)}/${day.year}`,
      modalColor: 'blue',
      css: 'modal-wide',
      day: day,
    };
    const ref = this.os.open(DayComponent, modalDayData);
    ref.afterClosed$.subscribe((result): void => {
      if (result.data) {
        this.generateCalendar();
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }
}
