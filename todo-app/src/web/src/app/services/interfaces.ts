import { Observable } from "rxjs";
import { TodoItem } from "../models/todo-item";
import { Inject } from "@angular/core";

export interface ITodoService {
    getTodosAsync(): Observable<TodoItem[]>;
    getTodoItemAsync(id: string): Observable<TodoItem>;
    createTodoItemAsync(item: TodoItem): Observable<TodoItem>;
    updateTodoItemAsync(item: TodoItem): Observable<TodoItem>;
    deleteTodoItemAsync(id: string): Observable<TodoItem>;
}