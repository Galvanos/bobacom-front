import { Component, input, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

export interface Product {
  name: string;
  imageUrl: string;
  description: string;
  tags: string[];
  price: number;
}

@Component({
  selector: 'app-bubble-tea',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './bubble-tea.html',
  styleUrl: './bubble-tea.css'
})
export class BubbleTea {
  // Input Signal con i dati di default del prodotto
  product = input<Product>({
    name: 'Brown Sugar Boba Milk',
    imageUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=500&auto=format&fit=crop&q=60',
    description: 'Tè nero Assam con latte fresco e perle di tapioca caramellate al momento.',
    tags: ['Best Seller', 'Latte Intero'],
    price: 6.50
  });

  // Signal per la quantità
  quantity = signal<number>(1);

  // Calcolo dinamico del prezzo in base alla quantità
  totalPrice = computed(() => (this.product().price * this.quantity()).toFixed(2));

  increment(): void {
    this.quantity.update(q => q + 1);
  }

  decrement(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart(): void {
    console.log(`Ordinato: ${this.quantity()}x ${this.product().name} (€${this.totalPrice()})`);
  }

  customizeProduct(): void {
    console.log('Personalizza prodotto!');
  }
}