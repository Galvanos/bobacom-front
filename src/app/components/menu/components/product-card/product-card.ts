import { Component, input, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CustomizationComponent } from '../customization/customization';
import { composizione } from '../../../../models/composizione.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  composizione: composizione[];
  price?: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatDialogModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})

export class ProductCardComponent {
  private dialog = inject(MatDialog); 
  product = input.required<Product>();
  quantity = signal<number>(1);
  totalPrice = computed(() => {
    const basePrice = this.product().price ?? 5.50;
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
    console.log(`Aggiunto al carrello: ${this.quantity()}x ${this.product().name} (€${this.totalPrice()})`);
  }

  customizeProduct(): void {
    console.log(this.product());
    this.dialog.open(CustomizationComponent, {
      width: '700px',
      data: this.product(),
    });
  }
}