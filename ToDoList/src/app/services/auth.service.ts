import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';
  private currentUserId: string | null = null; // Хранение ID текущего пользователя

  constructor(private http: HttpClient) {}
  // Метод регистрации пользователя
  register(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user).pipe(
      catchError(err => {
        console.error('Error during registration:', err);
        return throwError(() => new Error('Registration failed'));
      })
    );
  }
  // Метод для входа пользователя
  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length === 1) {
          const user = users[0];
          this.setCurrentUserId(user.id); // Сохраняем userId
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }
  // Установка текущего пользователя
  private setCurrentUserId(userId: string): void {
    this.currentUserId = userId;
    localStorage.setItem('currentUserId', userId); // Сохраняем ID в localStorage
  }
  // Получение текущего пользователя
  getCurrentUserId(): string | null {
    return this.currentUserId || localStorage.getItem('currentUserId');
  }
  // Метод для выхода
  logout(): void {
    this.currentUserId = null;
    localStorage.removeItem('currentUserId');
  }
}
