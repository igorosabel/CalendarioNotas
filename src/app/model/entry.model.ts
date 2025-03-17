import { EntryInterface } from '@app/interfaces/calendar.interfaces';
import { padNumber } from '@modules/shared/utils';
import { urldecode, urlencode } from '@osumi/tools';

export default class Entry {
  constructor(
    public id: number | null = null,
    public day: number | null = null,
    public month: number | null = null,
    public year: number | null = null,
    public order: number | null = null,
    public title: string | null = null,
    public content: string | null = null,
    public check: boolean = false,
    public checked: boolean = false,
    public shared: boolean = false,
    public idOriginal: number | null = null
  ) {}

  get fullDate(): string {
    if (this.day !== null && this.month !== null && this.year !== null) {
      return `${padNumber(this.day)}/${padNumber(this.month)}/${this.year}`;
    }
    return '';
  }

  fromInterface(e: EntryInterface): Entry {
    this.id = e.id;
    this.day = e.day;
    this.month = e.month;
    this.year = e.year;
    this.order = e.order;
    this.title = urldecode(e.title);
    this.content = urldecode(e.content);
    this.check = e.check;
    this.checked = e.checked;
    this.shared = e.shared;
    this.idOriginal = e.idOriginal;

    return this;
  }

  toInterface(): EntryInterface {
    return {
      id: this.id,
      day: this.day,
      month: this.month,
      year: this.year,
      order: this.order,
      title: urlencode(this.title),
      content: urlencode(this.content),
      check: this.check,
      checked: this.checked,
      shared: this.shared,
      idOriginal: this.idOriginal,
    };
  }
}
