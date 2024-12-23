import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskAddComponent } from './tasks/task-add/task-add.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Редирект с корневого пути на /login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/add', component: TaskAddComponent },
  { path: 'tasks/edit/:id', component: TaskEditComponent },
  { path: '**', redirectTo: 'login' }, // Редирект на login, если путь не найден
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Инициализация маршрутов
  exports: [RouterModule], // Экспорт для использования в `app.module.ts`
})
export class AppRoutingModule {}
