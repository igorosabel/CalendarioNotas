import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import Entry from '@model/entry.model';
import MonthSeparator from '@model/month-separator.model';
import DayEntryComponent from '@modules/shared/day-entry/day-entry.component';
import MonthSeparatorComponent from '@modules/shared/month-separator/month-separator.component';

@Component({
  selector: 'app-day-list',
  imports: [DayEntryComponent, MonthSeparatorComponent],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.scss',
})
export default class DayListComponent {
  entries: InputSignal<(Entry | MonthSeparator)[]> =
    input.required<(Entry | MonthSeparator)[]>();
  edit: InputSignal<boolean> = input<boolean>(false);
  showDates: InputSignal<boolean> = input<boolean>(false);

  entryDeleted: OutputEmitterRef<number> = output<number>();

  entryDelete(id: number): void {
    this.entryDeleted.emit(id);
  }

  isEntry(item: Entry | MonthSeparator): item is Entry {
    return (item as Entry).day !== undefined;
  }

  isMonthSeparator(item: Entry | MonthSeparator): item is MonthSeparator {
    return (item as MonthSeparator).text !== undefined;
  }
}
