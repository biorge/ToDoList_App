import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskAddComponent } from './task-add.component';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;
  let mockRouter: any;
  let mockTaskService: any;

  beforeEach(async () => {
    // Мокаем Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate') as jasmine.Spy<(commands: any[]) => Promise<boolean>>,
    };

    // Мокаем TaskService
    mockTaskService = {
      addTask: jasmine.createSpy('addTask').and.returnValue(of({})), // Возвращаем Observable
    };

    await TestBed.configureTestingModule({
      declarations: [TaskAddComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TaskService, useValue: mockTaskService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call addTask with correct data', () => {
    // Настроим компонент на создание новой задачи
    component.task = { title: 'New Task', description: 'Task description', status: 'не выполнена' };

    // Вызовем метод для добавления задачи
    component.addTask();

    // Проверим, что после добавления задачи, происходит редирект на список задач
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
