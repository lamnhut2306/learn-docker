import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: TodoItem[] = [];

  constructor() {
    // Initialize with some dummy data
    this.todos = [
      new TodoItem(1, 'Learn Angular', 'Study the Angular framework', false),
      new TodoItem(2, 'Build a SPA', 'Create a single-page application', false),
      new TodoItem(3, 'Write Tests', 'Implement unit tests for the app', false),
    ];
  }

  getTodos(): TodoItem[] {
    return this.todos;
  }

  getTodoById(id: number): TodoItem | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  addTodo(title: string, description: string): void {
    const newId = this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    const newTodo = new TodoItem(newId, title, description, false);
    this.todos.push(newTodo);
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  updateTodo(updatedTodo: TodoItem): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }
}
