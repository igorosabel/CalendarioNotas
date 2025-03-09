import { CalendarDayInterface } from '@interfaces/calendar.interfaces';
import { Modal } from '@osumi/angular-tools';

export interface DayModalInterface extends Modal {
  day: CalendarDayInterface;
}
