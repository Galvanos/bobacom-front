import { Routes } from '@angular/router';
import { Login } from './dialogs/login/login';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
