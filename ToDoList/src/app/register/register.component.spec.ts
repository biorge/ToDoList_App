import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    // Мокаем AuthService
    mockAuthService = jasmine.createSpyObj(['register']);
    mockAuthService.register.and.returnValue(of({ email: 'test@example.com', password: 'password' }));

    // Мокаем Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate') as jasmine.Spy<(commands: string[]) => Promise<boolean>>, // Указываем, что navigate принимает массив строк
    };

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login after successful registration', () => {
    // Задаем значения email и password
    component.email = 'test@example.com';
    component.password = 'password';

    // Вызываем метод регистрации
    component.register();

    // Проверяем, что метод AuthService.register был вызван
    expect(mockAuthService.register).toHaveBeenCalled();

    // Проверяем, что произошла навигация на '/login'
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
