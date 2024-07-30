import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { switchMap, Subscription, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
export class UserListComponent implements OnInit, OnDestroy {
  @Input() searchTerm: number = 0;
  users: User[] = [];
  page = 1;
  totalPages: number | null = null;
  loading = false;
  hasMorePages = false;
  private routeSub: Subscription | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .pipe(
        switchMap(params => {
          this.searchTerm = params['search'] || '';
          this.page = Number(params['page']) || 1;
          return this.loadUsers(); // Return the observable
        }),
        catchError(error => {
          console.error('Error loading users:', error);
          return of(); // Return an empty observable in case of error
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadUsers(): Observable<UserResponse> {
    this.loading = true;

    if (this.totalPages !== null && this.page > this.totalPages) {
      this.hasMorePages = false;
      this.loading = false;
      return of({
        page: 1,
        per_page: 0,
        total: 0,
        total_pages: 0,
        data: [],
        support: {
          url: '',
          text: '',
        },
      } as UserResponse);
    }

    return this.userService.getUsers(this.page, this.searchTerm).pipe(
      tap(response => {
        this.users = response.data;
        this.totalPages = response.total_pages;
        this.hasMorePages = this.page < this.totalPages;
        this.loading = false;
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        this.loading = false;
        return of({
          page: 1,
          per_page: 0,
          total: 0,
          total_pages: 0,
          data: [],
          support: {
            url: '',
            text: '',
          },
        } as UserResponse);
      })
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
