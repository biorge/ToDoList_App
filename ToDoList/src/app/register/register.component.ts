import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; // Библиотека uuid для генерации уникального ID


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
  };


  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const newUser: User = {
      id: uuidv4(), // Генерация уникального id
      email: this.user.email,
      password: this.user.password,
    };

    this.authService.register(newUser).subscribe(
      () => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      (err) => console.error('Error during registration:', err)
    );
  }
}
