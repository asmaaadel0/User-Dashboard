import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user-list/user-list.component'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}?page=${page}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
