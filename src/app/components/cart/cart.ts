import { Component, computed, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart-item.model';
import { IngredientsService } from '../../services/ingredients-service';

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

  private cartService = inject(CartService);
  private ingredienteService = inject(IngredientsService);

  cartSignal = this.cartService.cartItems;
  ingredienteSignal = this.ingredienteService.ingredients;

  ngOnInit(): void {
    this.ingredienteService.list();
  }

  cartDetails = computed<cartWDetails[]>(() => {
    let detailedCart: cartWDetails[] = []; 
    for(const cartIt of this.cartSignal()){
      let detail: string = 'Dettagli: ';
      for(const comp of cartIt.composizione){
        let foundIng = this.ingredienteSignal().find(ing => Number(ing.id) == Number(comp.idIngrediente));
        detail += foundIng?.nome + ': ' + comp.quantita + '   ';
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
    id: 1
  }

  clickCheckout(){
    this.cartService.checkout(this.userDetails.id, this.userDetails.indirizzo);
  }

}
