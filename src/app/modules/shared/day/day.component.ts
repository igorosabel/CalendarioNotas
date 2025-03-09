import { Component, inject, OnInit } from '@angular/core';
import {
  CalendarDayInterface,
  DayResultInterface,
} from '@interfaces/calendar.interfaces';
import { CustomOverlayRef } from '@osumi/angular-tools';
import ApiService from '@services/api.service';

@Component({
  selector: 'app-day',
  imports: [],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export default class DayComponent implements OnInit {
  private customOverlayRef: CustomOverlayRef<
    null,
    { day: CalendarDayInterface }
  > = inject(CustomOverlayRef<null, { day: CalendarDayInterface }>);
  private as: ApiService = inject(ApiService);

  day: CalendarDayInterface | null = null;

  ngOnInit(): void {
    this.day = this.customOverlayRef.data.day;

    this.as
      .getDay(this.day.day, this.day.month, this.day.year)
      .subscribe((result: DayResultInterface): void => {
        console.log(result);
      });
  }
}
