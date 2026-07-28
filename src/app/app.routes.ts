import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { RegistrazioneUpdate } from './components/registrazione-update/registrazione-update';
import { AddCredito } from './components/add-credito/add-credito';
import { authenticatedGuard } from './auth/authenticated-guard';
import { StockManagement } from './components/stock-management/stock-management';
import { Dashboard } from './components/dashboard/dashboard';
import { IngredientsManagement } from './components/ingredients-management/ingredients-management';
import { ProductManagement } from './components/product-management/product-management';
import { MenuPage } from './components/menu/pages/menu-page/menu-page';

export const routes: Routes = [
    {path: '', redirectTo: 'dash', pathMatch: 'full'},
    {path: 'dash', component: Dashboard, children: [
			{
			    path: 'menu-page',
			    component: MenuPage
  			},
            {path: 'home', component: Home},
            {path: 'stock-management', component: StockManagement},
            {path: 'ingredients-management', component: IngredientsManagement},            
            {path: 'product-management', component: ProductManagement},
            { path: 'login', component: Login },
            { path: 'registrazione', component: RegistrazioneUpdate },
            { path: 'add-credito', component: AddCredito, canActivate: [authenticatedGuard] }
    ]
    },
];
