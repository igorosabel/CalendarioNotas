export interface CalendarDayInterface {
  day: number;
  currentMonth: boolean;
  uniqueId: string;
  num: number;
}

export interface GetCalendarDayInterface {
  day: number;
  month: number;
  year: number;
  num: number;
}

export interface GetCalendarResultInterface {
  status: string;
  list: GetCalendarDayInterface[];
}
