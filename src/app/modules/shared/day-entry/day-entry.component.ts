import { Component, input, InputSignal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import Entry from '@model/entry.model';

@Component({
  selector: 'app-day-entry',
  imports: [MatCard, MatIcon],
  templateUrl: './day-entry.component.html',
  styleUrl: './day-entry.component.scss',
})
export default class DayEntryComponent {
  entry: InputSignal<Entry> = input.required<Entry>();
  edit: InputSignal<boolean> = input.required<boolean>();
}
