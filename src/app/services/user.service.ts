import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../user-list/user-list.component';
import { UserResponse } from '../user-list/user-list.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, id: number): Observable<UserResponse> {
    if (id) {
      return this.http
        .get<{ data: User }>(`${this.apiUrl}/${id}`)
        .pipe(
          map((response) => this.transformToUserResponse(response.data, page))
        );
    }
    return this.http
      .get<UserResponse>(`${this.apiUrl}?page=${page}`)
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<{ data: User }>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response) => response.data)
      );
  }

  private transformToUserResponse(user: User, page: number): UserResponse {
    return {
      page: page,
      per_page: 1,
      total: 1,
      total_pages: 1,
      data: [user],
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
      }
    };
  }
}
