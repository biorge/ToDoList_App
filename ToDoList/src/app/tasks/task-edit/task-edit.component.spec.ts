import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;
  let mockTaskService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(() => {
    // Создаем моки TaskService
    mockTaskService = jasmine.createSpyObj(['getTasks', 'updateTask']);
    mockTaskService.getTasks.and.returnValue(of([{ id: 1, title: 'Test Task', description: 'Description', status: 'не выполнена' }]));
    mockTaskService.updateTask.and.returnValue(of({}));

    // Создаем мок Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate') as jasmine.Spy<(commands: string[]) => Promise<boolean>>, // Указываем, что navigate принимает массив строк
    };

    // Создаем мок ActivatedRoute
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };

    TestBed.configureTestingModule({
      declarations: [TaskEditComponent],
      imports: [FormsModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task on init', () => {
    // Проверяем, что задача была загружена корректно
    expect(component.task.title).toBe('Test Task');
  });

  it('should call updateTask and navigate to tasks', () => {
    // Вызовем метод обновления задачи
    component.updateTask();

    // Проверяем, что метод updateTask был вызван
    expect(mockTaskService.updateTask).toHaveBeenCalledWith(component.task);

    // Проверяем, что после обновления задачи происходит навигация
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
