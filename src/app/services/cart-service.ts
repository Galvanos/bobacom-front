import { computed, effect, Service, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { composizione } from '../models/composizione.model';

@Service()
export class CartService {
    private STORAGE_KEY = 'cart'; // assegniamo un valore ai dati che salviamo in localstorage

    cartItems = signal<CartItem[]>(this.loadFromStorage());

    totalItems = computed(() => 
        this.cartItems().reduce((acc, product) => acc + product.quantity, 0)
    );
    totalAmount = computed(() => 
        this.cartItems().reduce((acc, product) => acc + (product.price * product.quantity), 0)
    );

    constructor(){
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems()));
        })
    }

    private loadFromStorage(): CartItem[] {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    }

    addToCart(product: CartItem): void {
        if (this.cartItems().some(i => i.composizione === product.composizione))
            this.addQuantity(product.composizione);
        this.cartItems.update(items => {
      return items.concat(product);
    });
    }

    removeFromCart(comp: composizione[]): void {
        this.cartItems.update(items => items.filter(i => i.composizione !== comp));
    }

    removeQuantity(comp:  composizione[]): void {
        if (this.cartItems().some(i => i.composizione === comp && i.quantity === 1))
            this.removeFromCart(comp);
        this.cartItems.update(items => items.map(i => i.composizione === comp ? {...i, quantity: i.quantity-1} : i));
    }
    addQuantity(comp:  composizione[]){
        this.cartItems.update(items => items.map(i => i.composizione === comp ? {...i, quantity: i.quantity+1} : i));
    }

    clearCart(): void {
    this.cartItems.set([]);
    }
}
