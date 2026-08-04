import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';
import { IngredientsService } from '../../services/ingredients-service';
import { UtenteService } from '../../services/utente-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { CreditoService } from '../../services/credito-service';
import { CreditoNetworkService } from '../../services/credito-network-service';

interface cartWDetails {
  cartItem: CartItem,
  details: string
}

@Component({
  selector: 'app-cart',
  imports: [FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit{

  private creditoService = inject(CreditoNetworkService);
  private cartService = inject(CartService);
  private ingredienteService = inject(IngredientsService);
  private authService = inject(AuthService);
  private userService = inject(UtenteService);
  private readonly routing = inject(Router);

  cartSignal = this.cartService.cartItems;
  cartTotal = this.cartService.totalAmount;
  ingredienteSignal = this.ingredienteService.ingredients;
  thisAuthUser = this.authService.grant();

  ngOnInit(): void {
    this.ingredienteService.list();
    this.userService.findByUsername().subscribe({
      next: ((user: any) => {
        console.log(user);
        this.userAddress.set(user.indirizzo ? user.indirizzo : '');
        this.userCredit.set(user.credito ? user.credito : 0);
      })
    });
  }

  total = computed<number>(() => {
    return this.cartTotal();
  })

  cartDetails = computed<cartWDetails[]>(() => {
    let detailedCart: cartWDetails[] = []; 
    for(const cartIt of this.cartSignal()){
      let detail: string = 'Dettagli:\n';
      for(const comp of cartIt.composizione){
        detail += comp.ingrediente?.nome + ': ' + comp.quantita + '\n';
      }

      detailedCart.push({
        cartItem: cartIt,
        details: detail
      })
    }
    return detailedCart;
  })

  userAddress = signal('');
  userCredit = signal(0);


  broke = computed(() => {
    return this.userCredit() < this.total();
  })
  orderSent = signal<boolean>(false);

  addQuantity(item: cartWDetails){
    this.cartService.addQuantity(item.cartItem.composizione);
  }

  removeQuantity(item: cartWDetails){
    this.cartService.removeQuantity(item.cartItem.composizione);
  }

  clickCheckout(){
    if(this.thisAuthUser.isLogged){
      if(this.userCredit() < this.cartService.totalAmount()){
      }
      else {
        const decrease = this.cartService.totalAmount();
        this.cartService.checkout(this.thisAuthUser.userId!, this.userAddress());
        this.creditoService.decreaseCredito({userId: this.thisAuthUser.userId ?? null, credit: decrease}).subscribe({
          next: (returnDTO) => {
            this.userCredit.set(returnDTO.credito!);
          },
          error: (error) => {
            console.log('credito insufficiente?');
          }
        });
        
        this.orderSent.set(true);
        setTimeout(() => {this.orderSent.set(false);}, 5000);
      }
    } else {
      this.routing.navigate(['/dash/login']);
    }    
  }

}
