import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user-list/user-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule, MatCardModule],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  loading = true;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        user => {
          this.user = user;
          this.loading = false;
        },
        error => {
          console.error('Error fetching user details:', error);
          this.loading = false;
        }
      );
    }
  }
}