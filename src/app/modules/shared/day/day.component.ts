import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  CalendarDayInterface,
  DayResultInterface,
} from '@interfaces/calendar.interfaces';
import Entry from '@model/entry.model';
import DayAddComponent from '@modules/shared/day-add/day-add.component';
import DayListComponent from '@modules/shared/day-list/day-list.component';
import { CustomOverlayRef } from '@osumi/angular-tools';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';

@Component({
  selector: 'app-day',
  imports: [
    DayListComponent,
    DayAddComponent,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export default class DayComponent implements OnInit {
  private customOverlayRef: CustomOverlayRef<
    null,
    { day: CalendarDayInterface }
  > = inject(CustomOverlayRef<null, { day: CalendarDayInterface }>);
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);

  day: CalendarDayInterface | null = null;
  entries: Entry[] = [];
  add: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.day = this.customOverlayRef.data.day;

    this.as
      .getDay(this.day.day, this.day.month, this.day.year)
      .subscribe((result: DayResultInterface): void => {
        console.log(result);
        this.entries = this.cms.getEntries(result.list);
      });
  }

  showAdd(mode: boolean): void {
    this.add.set(mode);
  }
}
