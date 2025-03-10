import {
  Component,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
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
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import Entry from '@model/entry.model';

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
  editorConfig: AngularEditorConfig = editorConfig;
  entryOptions = [
    { id: 0, name: 'Nota' },
    { id: 1, name: 'Tarea' },
  ];
  newEntry: Entry = new Entry();
  entryType: number = 0;
  titleValidation: WritableSignal<boolean> = signal<boolean>(false);
  goBack: OutputEmitterRef<void> = output<void>();

  ngOnInit(): void {
    console.log('init');
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
  }
}
