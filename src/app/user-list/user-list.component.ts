import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes['searchTerm']", changes['searchTerm']);
    if (changes['searchTerm']) {
      this.page = 1;
      this.loadUsers();
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.page = Number(this.route.snapshot.queryParamMap.get('page')) || 1;
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    if (this.totalPages !== null && this.page > this.totalPages) {
      this.hasMorePages = false;
      return;
    }

    this.userService.getUsers(this.page, this.searchTerm).subscribe(
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
    if (this.totalPages === null || this.page >= this.totalPages) {
      console.log('No more pages to load.');
      this.hasMorePages = false;
      return;
    }
    this.page++;
    this.updateUrl();
    this.loadUsers();
  }

  loadPrevious() {
    this.page--;
    this.updateUrl();
    this.loadUsers();
  }

  viewDetails(userId: number) {
    this.router.navigate(['/users', userId], {
      queryParams: { page: this.page },
    });
  }

  updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
  }
}
