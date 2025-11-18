import { Routes } from '@angular/router';
import { WelcomePage } from './pages/welcome-page/welcome-page';
import { TodoListPage } from './pages/todo-list-page/todo-list-page';
import { TodoDetailPage } from './pages/todo-detail-page/todo-detail-page';

export const routes: Routes = [
    {
        path: '',
        component: WelcomePage
    },
    {
        path: 'todos',
        component: TodoListPage
    },
    {
        path: 'todos/:id',
        component: TodoDetailPage
    }
];
