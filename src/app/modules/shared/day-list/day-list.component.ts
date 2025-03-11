import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import Entry from '@app/model/entry.model';
import DayEntryComponent from '@modules/shared/day-entry/day-entry.component';

@Component({
  selector: 'app-day-list',
  imports: [DayEntryComponent],
  templateUrl: './day-list.component.html',
  styleUrl: './day-list.component.scss',
})
export default class DayListComponent {
  entries: InputSignal<Entry[]> = input.required<Entry[]>();
  edit: InputSignal<boolean> = input.required<boolean>();

  entryDeleted: OutputEmitterRef<number> = output<number>();

  entryDelete(id: number): void {
    this.entryDeleted.emit(id);
  }
}
