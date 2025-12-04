import { Component, Inject, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todo-item';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { Location } from '@angular/common';
import { TODO_SERVICE } from '../../app.config';
import { ITodoService } from '../../services/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-todo-item',
  imports: [ReactiveFormsModule],
  templateUrl: './create-todo-item.html',
  styleUrl: './create-todo-item.css',
})
export class CreateTodoItem implements OnInit {
  todoItem: TodoItem ={
    id: '',
    title: '',
    description: '',
    isCompleted: false,
  };

  newTodoItemForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  public isSaving = false;
  public error?: string;

  /**
   *
   */
  constructor(@Inject(TODO_SERVICE) private readonly todoService: ITodoService,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {
    this.todoItem.id = this.route.snapshot.params['id'];

    if (this.todoItem.id) {
      this.todoService.getTodoItemAsync(this.todoItem.id).subscribe((data) => {
      this.todoItem = data;
      this.newTodoItemForm.setValue({
        title: this.todoItem.title,
        description: this.todoItem.description
      });
    });
    }
  }


  public submit() {
    this.error = undefined;
    this.isSaving = true;

    this.todoItem.title = this.newTodoItemForm.value.title!;
    this.todoItem.description = this.newTodoItemForm.value.description!;

    this.todoService.createTodoItemAsync(this.todoItem).subscribe({
      error: (err) => {
        this.error = err?.message ?? 'Failed to create todo';
        this.isSaving = false;
      },
    });
  }

  public cancel() {
    this.location.back();
  }
}
