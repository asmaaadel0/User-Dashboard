import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
  ],
})
export class UserListComponent implements OnInit {
  @Input() searchTerm: string = '';
  users: User[] = [];
  page = 1;
  totalPages: number | null = null;
  loading = false;
  hasMorePages = false;

  @Output() loadingChange = new EventEmitter<boolean>();

  constructor(private userService: UserService, private router: Router) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes["searchTerm"]) {
  //     console.log("testtt");
  //     this.loadUsers();
  //   }
  // }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    if (this.totalPages !== null && this.page > this.totalPages) {
      this.hasMorePages = false;
      return;
    }

    this.userService.getUsers(this.page).subscribe(
      (response) => {
        this.users = response.data;
        this.totalPages = response.total_pages;
        this.hasMorePages = this.page < this.totalPages;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  loadMore() {
    this.hasMorePages = false;
    if (this.totalPages === null || this.page >= this.totalPages) {
      console.log('No more pages to load.');
      this.hasMorePages = true;
      return;
    }

    this.page++;
    this.loadUsers();
  }

  loadPrevious() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  viewDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
