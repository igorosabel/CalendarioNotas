import { Component, input, InputSignal } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import MonthSeparator from '@model/month-separator.model';

@Component({
  selector: 'app-month-separator',
  imports: [MatCard, MatCardContent],
  templateUrl: './month-separator.component.html',
  styleUrl: './month-separator.component.scss',
})
export default class MonthSeparatorComponent {
  monthSeparator: InputSignal<MonthSeparator> =
    input.required<MonthSeparator>();
}
