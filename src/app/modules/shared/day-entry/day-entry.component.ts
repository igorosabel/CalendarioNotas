import {
  Component,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { StatusResultInterface } from '@interfaces/interfaces';
import Entry from '@model/entry.model';
import { DialogService } from '@osumi/angular-tools';
import ApiService from '@services/api.service';
import CalendarService from '@services/calendar.service';

@Component({
  selector: 'app-day-entry',
  imports: [MatCard, MatIcon, MatCheckbox, MatIconButton, FormsModule],
  templateUrl: './day-entry.component.html',
  styleUrl: './day-entry.component.scss',
})
export default class DayEntryComponent {
  private as: ApiService = inject(ApiService);
  private dialog: DialogService = inject(DialogService);
  private cs: CalendarService = inject(CalendarService);

  entry: InputSignal<Entry> = input.required<Entry>();
  edit: InputSignal<boolean> = input.required<boolean>();
  showDate: InputSignal<boolean> = input<boolean>(false);

  entryDeleted: OutputEmitterRef<number> = output<number>();

  checkEntry(id: number | null): void {
    if (id !== null) {
      this.as
        .checkEntry(id)
        .subscribe((result: StatusResultInterface): void => {
          if (result.status === 'error') {
            this.dialog.alert({
              title: 'Error',
              content: 'Ocurrió un error al actualizar la tarea.',
            });
          }
        });
    }
  }

  deleteEntry(id: number | null): void {
    if (id !== null) {
      this.dialog
        .confirm({
          title: 'Confirmar',
          content: '¿Estás seguro de querer borrar esta entrada?',
        })
        .subscribe((result: boolean): void => {
          if (result === true) {
            this.confirmDeleteEntry(id);
          }
        });
    }
  }

  confirmDeleteEntry(id: number): void {
    this.as.deleteEntry(id).subscribe((result: StatusResultInterface): void => {
      if (result.status === 'error') {
        this.dialog.alert({
          title: 'Error',
          content: 'Ocurrió un error al borrar la entrada.',
        });
      } else {
        this.entryDeleted.emit(id);
        this.cs.triggerRefresh();
      }
    });
  }
}
