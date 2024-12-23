import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: any;

  beforeEach(() => {
    mockTaskService = jasmine.createSpyObj(['getTasks']);
    mockTaskService.getTasks.and.returnValue(of([{ id: 1, title: 'Test Task' }]));

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test Task');
  });
});
