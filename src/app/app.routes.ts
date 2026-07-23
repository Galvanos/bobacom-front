import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { RegistrazioneUpdate } from './components/registrazione-update/registrazione-update';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login, pathMatch: 'full' },
    { path: 'registrazione', component: RegistrazioneUpdate, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
