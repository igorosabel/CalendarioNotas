import { Component, input, InputSignal } from '@angular/core';
import Entry from '@app/model/entry.model';

@Component({
  selector: 'app-day-list',
  imports: [],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.scss',
})
export default class DayListComponent {
  entries: InputSignal<Entry[]> = input.required<Entry[]>();
}
