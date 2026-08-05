import { Component, inject, NgZoneOptions, OnInit, signal } from '@angular/core';
import { OrdineService } from '../../services/ordine-service';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-order-history',
  imports: [],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory implements OnInit{

  ordineService =  inject(OrdineService);
  private authService = inject(AuthService);

  thisAuthUser = this.authService.grant();
  ordineSignal = this.ordineService.ordine;

  ngOnInit(): void {
    this.ordineService.listByUser(this.thisAuthUser.userId!.toFixed(0));
  }
}
