import { Component, Inject } from '@angular/core';
import { TodoItem } from '../../models/todo-item';
import { RouterLink } from "@angular/router";
import { ITodoService } from '../../services/interfaces';
import { TODO_SERVICE } from '../../app.config';

@Component({
  selector: 'app-view-todo-list',
  imports: [RouterLink],
  templateUrl: './view-todo-list.html',
  styleUrl: './view-todo-list.css',
})
export class ViewTodoList {
  todos: TodoItem[] = [];

  /**
   *
   */
  constructor(
    @Inject(TODO_SERVICE) private readonly todoService: ITodoService
  ) {
    this.todoService.getTodosAsync().subscribe((data) => {
      this.todos = data;
    });
  }
}
