import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user-list/user-list.component';
import { UserResponse } from '../user-list/user-list.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, id: string): Observable<UserResponse> {
    console.log("id in service: ", id);
    if (id != '') {
      return this.http
        .get<{ data: UserResponse }>(`${this.apiUrl}/${id}`)
        .pipe(map((response) => response.data));
    }
    return this.http.get<UserResponse>(`${this.apiUrl}?page=${page}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<{ data: User }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
}
