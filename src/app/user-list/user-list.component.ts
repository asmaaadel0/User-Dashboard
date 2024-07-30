import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatListModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  page = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("test");
    this.loadUsers();
  }

  loadUsers() {
    console.log(`test: ${this.page}`);
    this.http.get<{ data: User[] }>(`https://reqres.in/api/users?page=${this.page}`)
      .subscribe(response => this.users = response.data);
  }

  loadMore() {
    this.page++;
    this.loadUsers();
  }
  viewDetails(userId: number) {
    // Implement navigation to user details page
  }
}
