import { Routes } from '@angular/router';
import { ViewTodoList } from './features/view-todo-list/view-todo-list';
import { CreateTodoItem } from './features/create-todo-item/create-todo-item';

export const routes: Routes = [
    {
        path: '',
        component: ViewTodoList
    },
    {
        path: 'todo/:id',
        component: CreateTodoItem,
    },
    {
        path: '**',
        redirectTo: '',
    }
];
