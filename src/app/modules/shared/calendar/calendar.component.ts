import {
  Component,
  input,
  InputSignal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export default class CalendarComponent implements OnChanges {
  month: InputSignal<number> = input.required();
  year: InputSignal<number> = input.required();

  days: { day: number; currentMonth: boolean; uniqueId: string }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['month'] || changes['year']) {
      this.generateCalendar();
    }
  }

  generateCalendar(): void {
    const firstDayOfMonth: number = new Date(
      this.year(),
      this.month() - 1,
      1
    ).getDay();
    const daysInMonth: number = new Date(
      this.year(),
      this.month(),
      0
    ).getDate();
    const daysInPrevMonth: number = new Date(
      this.year(),
      this.month() - 1,
      0
    ).getDate();

    // Ajustar el primer día de la semana (lunes = 0, domingo = 6)
    const startDay: number = (firstDayOfMonth + 6) % 7;

    this.days = [];

    // Días del mes anterior
    for (let i = startDay - 1; i >= 0; i--) {
      this.days.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
        uniqueId: `prev-${daysInPrevMonth - i}`,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push({ day: i, currentMonth: true, uniqueId: `current-${i}` });
    }

    // Días del mes siguiente
    const totalDays: number = this.days.length;
    const remainingDays: number = Math.ceil(totalDays / 7) * 7 - totalDays;
    for (let i = 1; i <= remainingDays; i++) {
      this.days.push({ day: i, currentMonth: false, uniqueId: `next-${i}` });
    }
  }
}
