import { Component, input, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CustomizationComponent } from '../customization/customization';
import { composizione } from '../../../../models/composizione.model';
import { tag } from '../../../../models/tag.model';
import { CartService } from '../../../../services/cart-service';
import { IngredientsService } from '../../../../services/ingredients-service';

interface promozione {
  id: number,
  sconto: number,
  isActive: boolean
}

export interface Product {
  id: number;
  nome: string;
  descrizione: string;
  imgUrl: string;
  tag: tag[];
  promozione: promozione[];
  composizione: any[];
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatDialogModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})

export class ProductCardComponent{
  cartService = inject(CartService);

  private dialog = inject(MatDialog); 
  product = input.required<Product>();
  quantity = signal<number>(1);
  totalPrice = computed(() => {
    let basePrice = 4;
    const compArray = this.product().composizione ?? [];
    console.log(compArray);
    for(const comp of compArray){
      const priceAdd = comp.ingrediente?.sovraprezzoAggiunta ?? 0 * comp.quantita;
      basePrice += priceAdd * comp.quantita;
    }
    return (basePrice * this.quantity()).toFixed(2);
  });

  increment(): void {
    this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart(): void {
    console.log(`Aggiunto al carrello: ${this.quantity()}x ${this.product().nome} (€${this.totalPrice()})`);
  }

  customizeProduct(): void {
    console.log(this.product());
    this.dialog.open(CustomizationComponent, {
      width: '700px',
      data: this.product(),
    });
  }
}