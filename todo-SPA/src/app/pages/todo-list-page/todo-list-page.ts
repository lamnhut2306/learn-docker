import { Component } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { TodoItem } from '../../models/todo-item';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-todo-list-page',
  imports: [RouterLink],
  templateUrl: './todo-list-page.html',
  styleUrl: './todo-list-page.css',
})
export class TodoListPage {

  todoItems: TodoItem[] = [];

  constructor(
    private readonly todoService: TodoService
  ) { 
    this.todoItems = this.todoService.getTodos();
  }
}
