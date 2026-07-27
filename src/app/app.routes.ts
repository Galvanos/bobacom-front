import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { RegistrazioneUpdate } from './components/registrazione-update/registrazione-update';
import { AddCredito } from './components/add-credito/add-credito';
import { authenticatedGuard } from './auth/authenticated-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login, pathMatch: 'full' },
    { path: 'registrazione', component: RegistrazioneUpdate, pathMatch: 'full' },
    { path: 'add-credito', component: AddCredito, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
