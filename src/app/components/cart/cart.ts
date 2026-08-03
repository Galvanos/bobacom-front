import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';
import { IngredientsService } from '../../services/ingredients-service';
import { UtenteService } from '../../services/utente-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { CreditoService } from '../../services/credito-service';

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

  private creditoService = inject(CreditoService);
  private cartService = inject(CartService);
  private ingredienteService = inject(IngredientsService);
  private authService = inject(AuthService);
  private userService = inject(UtenteService);
  private readonly routing = inject(Router);

  cartSignal = this.cartService.cartItems;
  ingredienteSignal = this.ingredienteService.ingredients;
  thisAuthUser = this.authService.grant();

  ngOnInit(): void {
    this.ingredienteService.list();
    this.userService.findByUsername().subscribe({
      next: ((user: any) => {
        this.userDetails.indirizzo =  user.indirizzo ? user.indirizzo : '';
        this.userDetails.crediti = user.credito ? user.credito : 0;
      })
    });
  }

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

  userDetails = {
    indirizzo: '',
    crediti: 0
  }

  clickCheckoutDEBUG(){ //for testing purposes
    this.cartService.checkout(this.thisAuthUser.userId ? this.thisAuthUser.userId : 1, this.userDetails.indirizzo);
  }

  broke = signal<boolean>(false);

  clickCheckout(){
    if(this.thisAuthUser.isLogged){
      if(this.userDetails.crediti < this.cartService.totalAmount())
        this.broke.set(true);
      else
        this.cartService.checkout(this.thisAuthUser.userId!, this.userDetails.indirizzo);
        //this.creditoService.
    } else {
      this.routing.navigate(['/dash/login']);
    }    
  }

}
