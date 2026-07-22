import { Routes } from '@angular/router';
import { Login } from './dialogs/login/login';

export const routes: Routes = [
    {path:'login',component:Login, pathMatch:'full'}
];
