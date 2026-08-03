import { computed, effect, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { OrdineService } from './ordine-service';
import { isPlatformBrowser } from '@angular/common';
import { ingrediente } from '../models/ingrediente.model';

interface composizione {
  id: number;
  idProdotto: number;
  ingrediente: ingrediente;
  quantita: number;
}

interface ordineProdotto {
    prodotto_id: number,
    prezzo: number,
    quantita: number,
    summary: string
}
interface Ordine {
    idUtente: number,
    prezzoTotale: number,
    status: string,
    indirizzoDestinazione: string,
    prodotti: ordineProdotto[]
}

@Service()
export class CartService {
    private platformId = inject(PLATFORM_ID);
    private STORAGE_KEY = 'cart';

    private ordineService = inject(OrdineService);

    cartItems = signal<CartItem[]>(this.loadFromStorage());

    totalItems = computed(() => 
        this.cartItems().reduce((acc, product) => acc + product.quantity, 0)
    );
    totalAmount = computed(() => 
        this.cartItems().reduce((acc, product) => acc + (product.price * product.quantity), 0)
    );

    constructor(){
        effect(() => {
            if(isPlatformBrowser(this.platformId))
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems()));
        })
    }

    private loadFromStorage(): CartItem[] {
        if(isPlatformBrowser(this.platformId)){
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } else
            return [];
    }

    addToCart(product: CartItem): void { //ancora non incrementa istanza giá presente di prodotto
        const compSet = new Set(product.composizione);
        let storage = this.loadFromStorage();
        if (storage.some((i) => i.composizione.every((comp) => compSet.has(comp))))
            this.addQuantity(product.composizione);
        else
            this.cartItems.update(items => {
                return items.concat(product);
            });
    }

    removeFromCart(comp: composizione[]): void {
        this.cartItems.update(items => items.filter(i => i.composizione !== comp));
    }

    removeQuantity(comp: composizione[]): void {
        if (this.cartItems().some(i => i.composizione === comp && i.quantity === 1))
            this.removeFromCart(comp);
        this.cartItems.update(items => items.map(i => i.composizione == comp ? {...i, quantity: i.quantity-1} : i));
    }
    addQuantity(comp:  composizione[]){
        this.cartItems.update(items => items.map(i => i.composizione == comp ? {...i, quantity: i.quantity+1} : i));
    }

    checkout(userId: number, indirizzoDestinazione: string): void {
        let newOrdine: Ordine = {
            idUtente: userId,
            prezzoTotale: this.totalAmount(),
            status: 'ORDINE_ACCETTATO',
            indirizzoDestinazione: indirizzoDestinazione,
            prodotti: []
        };

        this.loadFromStorage().forEach((cartItem) => {
            let detail: string = 'Personalizzazione:';
            for(const comp of cartItem.composizione)
                detail += ' ' + comp.ingrediente?.nome + ': ' + comp.quantita + ';';
            newOrdine.prodotti.push({
                prodotto_id: cartItem.productId,
                prezzo: Number(cartItem.price.toFixed(2)),
                quantita: cartItem.quantity,
                summary: detail
            })
        })
        console.log(newOrdine);
        this.ordineService.create(newOrdine).subscribe({
            next: (response) => console.log('successfully created!', response),
            error: (err => console.error('error occurred:', err)) 
        }); 
        console.log(this.platformId);
        this.clearCart();
    }

    clearCart(): void {
        this.cartItems.set([]);
    }
}
