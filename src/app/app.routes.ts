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
import { ListUtenti } from './components/list-utenti/list-utenti';
import { adminGuard } from './auth/admin-guard';
import { Component } from '@angular/core';
import { DetailUtenteAdmin } from './components/detail-utente-admin/detail-utente-admin';
import { Cart } from './components/cart/cart';
import { TagManagement } from './components/tag-management/tag-management';
import { PromozioneManagement } from './components/promozione-management/promozione-management';
import { OrderHistory } from './components/order-history/order-history';

export const routes: Routes = [
    {path: '', redirectTo: 'dash', pathMatch: 'full'},
    {path: 'dash', component: Dashboard, children: [
			{
			    path: 'menu-page',
			    component: MenuPage
  			},
            {path: 'home', component: Home},
            {path: 'cart', component: Cart},
            { path: 'login', component: Login },
            { path: 'registrazione', component: RegistrazioneUpdate },
            {path: 'promo-management', component: PromozioneManagement, canActivate: [adminGuard]},
            {path: 'stock-management', component: StockManagement, canActivate: [adminGuard]},
            {path: 'ingredients-management', component: IngredientsManagement, canActivate: [adminGuard]},            
            {path: 'product-management', component: ProductManagement, canActivate: [adminGuard]},
            {path: 'tag', component: TagManagement, canActivate: [adminGuard]},
            { path: 'add-credito', component: AddCredito, canActivate: [authenticatedGuard] },            
            { path: 'order-history', component: OrderHistory, canActivate: [authenticatedGuard] },
            { path: 'list-utenti', component: ListUtenti, canActivate: [adminGuard]},
            {path:'detail-utente-admin',component:DetailUtenteAdmin,canActivate:[adminGuard]},
    ]
    },
];
