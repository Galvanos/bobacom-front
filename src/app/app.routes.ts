import { Routes } from '@angular/router';
import { StockManagement } from './components/stock-management/stock-management';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    {path: '', redirectTo: 'dash', pathMatch: 'full'},
    {path: 'dash', component: Dashboard, children: [
            {path: 'home', component: Home},
            {path: 'stock-management', component: StockManagement}
    ]
    },
];
