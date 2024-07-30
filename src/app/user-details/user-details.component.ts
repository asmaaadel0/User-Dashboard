import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user-list/user-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
  standalone: true,
  imports: [MatProgressBarModule, CommonModule, MatCardModule, MatIconModule, MatButtonModule],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  loading = true;
  page: number = 1;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.page = Number(this.route.snapshot.queryParamMap.get('page')) || 1;

    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        (user: User) => {
          this.user = user;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }
  goBack() {
    this.router.navigate(['/users'], { queryParams: { page: this.page } });
  }
}
