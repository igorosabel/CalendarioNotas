import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import editorConfig from '@app/editor-config';
import {
  CalendarDayInterface,
  DayResultInterface,
} from '@interfaces/calendar.interfaces';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import Entry from '@model/entry.model';
import { CustomOverlayRef } from '@osumi/angular-tools';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';

@Component({
  selector: 'app-day',
  imports: [
    MatIconButton,
    MatIcon,
    MatButton,
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
  editorConfig: AngularEditorConfig = editorConfig;
  entryOptions = [
    { id: 0, name: 'Nota' },
    { id: 1, name: 'Tarea' },
  ];
  newEntry: Entry = new Entry();
  entryType: number = 0;
  titleValidation: WritableSignal<boolean> = signal<boolean>(false);

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
    if (mode) {
      this.newEntry = new Entry();
    }
    this.add.set(mode);
  }

  saveEntry(): void {
    this.titleValidation.set(false);
    if (this.newEntry.title === null || this.newEntry.title === '') {
      this.titleValidation.set(true);
      return;
    }
  }
}
