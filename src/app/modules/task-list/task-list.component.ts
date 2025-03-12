import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [MatToolbar, MatToolbarRow, MatIconButton, MatIcon, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export default class TaskListComponent {}
