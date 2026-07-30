import { Routes } from '@angular/router';
import { StockManagement } from './components/stock-management/stock-management';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { IngredientsManagement } from './components/ingredients-management/ingredients-management';
import { ProductManagement } from './components/product-management/product-management';
import { MenuPage } from './components/menu/pages/menu-page/menu-page';
import { Cart } from './components/cart/cart';

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
            {path: 'cart', component: Cart}
    ]
    },
];
