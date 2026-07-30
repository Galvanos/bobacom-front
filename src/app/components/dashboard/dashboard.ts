import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthNetworkService } from '../../security/auth-network-service';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule,
     RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  

  private readonly routing = inject(Router);
  private readonly authNetworkService:AuthNetworkService = inject(AuthNetworkService);
  private readonly authService:AuthService = inject(AuthService);


  isLogged = computed<boolean>(() => {
    return this.authService.grant().isLogged;
  })

  isAdmin= computed<boolean>(() => {
    return this.authService.isRoleAdmin();
  })

  isUser= computed<boolean>(() => {
    return this.authService.isRoleUser();
  })

  isNotLogged = computed<boolean>(() => {
    return !this.isLogged();
  })

  addRegisterMsg = computed<string>(() => {
    return this.isLogged() ? 'Aggiorna dati utente':'Registrati';
  })
 

  logout() {
    console.log('logout');
    this.authNetworkService.logout().subscribe({
        next: () => {
          this.routing.navigate(['/dash']);
        }
      });
  }

}
