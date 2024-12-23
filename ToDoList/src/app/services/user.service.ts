import { Injectable } from '@angular/core';

interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { id: 1, username: 'admin', email: 'admin@example.com' },
    { id: 2, username: 'user', email: 'user@example.com' },
  ];

  constructor() {}

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(username: string, email: string): void {
    const newUser: User = {
      id: this.users.length + 1,
      username,
      email,
    };
    this.users.push(newUser);
  }
}
