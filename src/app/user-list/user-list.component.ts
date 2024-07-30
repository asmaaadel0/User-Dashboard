import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
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
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  page = 1;
  totalPages: number | null = null;
  loading = false;
  hasMorePages = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    if (this.totalPages !== null && this.page > this.totalPages) {
      this.hasMorePages = false;
      return;
    }

    this.loading = true;
    this.userService.getUsers(this.page).subscribe(
      response => {
        this.users = response.data;
        this.totalPages = response.total_pages;
        this.hasMorePages = this.page < this.totalPages;
        this.loading = false;
      },
      error => {
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
      return; // Prevent loading more if no pages are left
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
    // Implement navigation to user details page
  }
}