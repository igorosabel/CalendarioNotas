import {
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import editorConfig from '@app/editor-config';
import { CalendarDayInterface } from '@app/interfaces/calendar.interfaces';
import { EntryTypeInterface } from '@interfaces/day.interfaces';
import { StatusResultInterface } from '@interfaces/interfaces';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import Entry from '@model/entry.model';
import { DialogService } from '@osumi/angular-tools';
import ApiService from '@services/api.service';

@Component({
  selector: 'app-day-add',
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    AngularEditorModule,
    MatSelect,
    MatOption,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  templateUrl: './day-add.component.html',
  styleUrl: './day-add.component.scss',
})
export default class DayAddComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private dialog: DialogService = inject(DialogService);

  day: InputSignal<CalendarDayInterface | null> =
    input.required<CalendarDayInterface | null>();
  order: InputSignal<number> = input.required<number>();
  editorConfig: AngularEditorConfig = editorConfig;
  entryOptions: EntryTypeInterface[] = [
    { name: 'Nota', value: false },
    { name: 'Tarea', value: true },
  ];
  newEntry: Entry = new Entry();
  titleBox: Signal<ElementRef> = viewChild.required<ElementRef>('titleBox');
  titleValidation: WritableSignal<boolean> = signal<boolean>(false);
  goBack: OutputEmitterRef<void> = output<void>();
  entryAdded: OutputEmitterRef<void> = output<void>();

  ngOnInit(): void {
    const day: CalendarDayInterface | null = this.day();
    if (day !== null) {
      this.newEntry.day = day.day;
      this.newEntry.month = day.month;
      this.newEntry.year = day.year;
    }
    this.newEntry.order = this.order();
    this.titleBox().nativeElement.focus();
  }

  back(): void {
    this.goBack.emit();
  }

  saveEntry(): void {
    this.titleValidation.set(false);
    if (this.newEntry.title === null || this.newEntry.title === '') {
      this.titleValidation.set(true);
      return;
    }

    this.as
      .addEntry(this.newEntry)
      .subscribe((result: StatusResultInterface): void => {
        if (result.status === 'error') {
          this.dialog.alert({
            title: 'Error',
            content: 'Ocurrió un error al guardar la entrada.',
          });
        } else {
          this.entryAdded.emit();
        }
      });
  }
}
