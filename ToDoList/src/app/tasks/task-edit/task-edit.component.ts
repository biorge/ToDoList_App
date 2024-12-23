import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TaskEditComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: '',
    userId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTaskById(taskId).subscribe(
        (task) => {
          this.task = task;
        },
        (err) => {
          console.error('Error fetching task:', err);
          this.router.navigate(['/tasks']);
        }
      );
    }
  }

  updateTask(): void {
    this.taskService.updateTask(this.task).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      (err) => console.error('Error updating task:', err)
    );
  }
}
