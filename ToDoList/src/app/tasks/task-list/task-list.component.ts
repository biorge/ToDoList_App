import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TaskStatusPipe]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  currentUserId: string | null = null;
  searchQuery: string = ''; // Поисковый запрос
  filteredTasks: Task[] = []; // Отфильтрованные задачи
  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    if (this.currentUserId) {
      this.taskService.getTasks(this.currentUserId).subscribe(
        (tasks) => {
          this.tasks = tasks;
          this.filteredTasks = [...tasks]; // Инициализируем фильтрованный список
        },
        (err) => {
          console.error('Error fetching tasks:', err);
        }
      );
    } else {
      console.error('User is not logged in');
      this.router.navigate(['/login']);
    }
  }

  filterTasks(): void {
    if (this.searchQuery.trim() === '') {
      // Если запрос пуст, показываем все задачи
      this.filteredTasks = [...this.tasks];
    } else {
      // Фильтруем задачи, проверяя, содержит ли заголовок запрос
      const query = this.searchQuery.toLowerCase();
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(query)
      );
    }
  }

  editTask(taskId: number): void {
    this.router.navigate(['/tasks/edit', taskId]);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // Обновляем список задач, удаляя задачу
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        // Обновляем отфильтрованный список
        this.filterTasks(); // Применяем фильтрацию заново, если она была активна
        console.log(`Task with ID ${taskId} deleted`);
      },
      err => {
        console.error('Error deleting task:', err);
      }
    );
  }
  navigateToAddTask(): void {
    this.router.navigate(['/tasks/add']);
  }
}
