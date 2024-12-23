import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // GET: Получить задачу по ID
  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.tasksUrl}/${taskId}`).pipe(
      catchError((err) => {
        console.error('Error fetching task by ID:', err);
        return throwError(() => new Error('Failed to fetch task by ID'));
      })
    );
  }

  // GET: Получить задачи для конкретного пользователя
  getTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}?userId=${userId}`).pipe(
      catchError((err) => {
        console.error('Error fetching tasks:', err);
        return throwError(() => new Error('Failed to fetch tasks'));
      })
    );
  }

  // POST: Добавить новую задачу
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task).pipe(
      catchError(err => {
        console.error('Error adding task:', err);
        return throwError(() => new Error('Failed to add task'));
      })
    );
  }
  // PUT: Обновить задачу по ID
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task).pipe(
      catchError(err => {
        console.error('Error updating task:', err);
        return throwError(() => new Error('Failed to update task'));
      })
    );
  }
 // DELETE: Удалить задачу по ID
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`).pipe(
      catchError(err => {
        console.error('Error deleting task:', err);
        return throwError(() => new Error('Failed to delete task'));
      })
    );
  }
}

