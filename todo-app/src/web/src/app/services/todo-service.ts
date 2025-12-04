import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { AppConfiguration } from '../models/app-configuration';
import { APP_CONFIGURATION } from '../app.config';
import { ITodoService } from './interfaces';
import { of } from 'rxjs';

@Injectable()
export class TodoService implements ITodoService {
  private readonly apiUrl: string = '';

  constructor(private readonly httpClient: HttpClient,
    @Inject(APP_CONFIGURATION) private appConfig: AppConfiguration
  ) {
    this.apiUrl = `${this.appConfig.apiBaseUrl}/api/todos`;
  }

  public getTodosAsync() {
    return this.httpClient.get<TodoItem[]>(this.apiUrl);
  }

  public getTodoItemAsync(id: string) {
    return this.httpClient.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  public deleteTodoItemAsync(id: string) {
    return this.httpClient.delete<TodoItem>(`${this.apiUrl}/${id}`);
  }

  public createTodoItemAsync(item: TodoItem) {
    return this.httpClient.post<TodoItem>(`${this.apiUrl}`, item);
  }

  public updateTodoItemAsync(item: TodoItem) {
    return this.httpClient.put<TodoItem>(`${this.apiUrl}/${item.id}`, item);
  }
}

@Injectable()
export class MockTodoService implements ITodoService {
  public getTodosAsync() {
    return of([
      {
        id: '1',
        title: 'Mock Todo 1',
        description: 'This is a mock todo item 1',
        isCompleted: false,
      },
      {
        id: '2',
        title: 'Mock Todo 2',
        description: 'This is a mock todo item 2',
        isCompleted: true,
      }
    ]);
  }

  public getTodoItemAsync(id: string) {
    return of({
      id: id,
      title: `Mock Todo ${id}`,
      description: 'This is a mock todo item 2',
      isCompleted: true,
    });
  }

  public deleteTodoItemAsync(id: string) {
    return of({
      id: id,
      title: 'Mock Todo 2',
      description: 'This is a mock todo item 2',
      isCompleted: true,
    });
  }

  public createTodoItemAsync(item: TodoItem) {
    return of(item);
  }

  public updateTodoItemAsync(item: TodoItem) {
    return of(item);
  }
}
