import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { Router, RouterModule} from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TaskAddComponent {
  task = {
    title: '',
    description: '',
    status: 'не выполнена'
  };

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  addTask(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      const newTask: Task = {
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        userId, // Привязка задачи к текущему пользователю
      };

      this.taskService.addTask(newTask).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (err) => console.error('Error adding task:', err)
      );
    } else {
      console.error('User is not logged in');
      this.router.navigate(['/login']);
    }
  }
}
