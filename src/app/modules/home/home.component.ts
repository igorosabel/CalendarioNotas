import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatIconButton,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  currentMonth: WritableSignal<number> = signal(new Date().getMonth() + 1);
  currentYear: WritableSignal<number> = signal(new Date().getFullYear());
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from(
    { length: 11 },
    (_, i) => this.currentYear() - 5 + i
  );

  previousMonth(): void {
    if (this.currentMonth() === 1) {
      this.currentMonth.set(12);
      this.currentYear.update((value: number): number => value - 1);
    } else {
      this.currentMonth.update((value: number): number => value - 1);
    }
  }

  nextMonth(): void {
    if (this.currentMonth() === 12) {
      this.currentMonth.set(1);
      this.currentYear.update((value: number): number => value + 1);
    } else {
      this.currentMonth.update((value: number): number => value + 1);
    }
  }
}
