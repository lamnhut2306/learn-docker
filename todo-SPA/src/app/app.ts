import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-SPA');

  todos: string[] = [];

  addTodo(newTodo: string) {
    console.log('Adding todo:', newTodo);
    this.todos.push(newTodo);
  }
}
