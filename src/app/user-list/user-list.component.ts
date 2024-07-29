import {Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';

export interface Section {
  name: string;
}
@Component({
  selector: 'app-user-list',
  styleUrl: 'user-list.component.css',
  templateUrl: 'user-list.component.html',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe],
})
export class UserListComponent {
  folders: Section[] = [
    {
      name: 'Asmaa',
    },
    {
      name: 'Adel',
    },
    {
      name: 'Work',
    },
  ];
}
