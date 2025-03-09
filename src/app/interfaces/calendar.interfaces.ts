export interface CalendarDayInterface {
  day: number;
  month: number;
  year: number;
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

export interface EntryInterface {
  id: number | null;
  day: number | null;
  month: number | null;
  year: number | null;
  order: number | null;
  title: string | null;
  content: string | null;
  check: boolean;
  checked: boolean;
  shared: boolean;
  idOriginal: number | null;
}

export interface DayResultInterface {
  status: string;
  list: EntryInterface[];
}
