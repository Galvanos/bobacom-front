import { Component, computed, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../../services/cart-service';
import { IngredientsService } from '../../../../services/ingredients-service';
import { CategoriaIngredienteService } from '../../../../services/categoria-ingrediente-service';
import { FormsModule } from '@angular/forms';
import { ingrediente } from '../../../../models/ingrediente.model';

interface composizione {
  id: number;
  idProdotto: number;
  ingrediente: ingrediente;
  quantita: number;
}

interface prodotto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  composizione: composizione[];
}
interface SelectableIngredient {
  selected: boolean,
  quantity: number,
  ingrediente: any
}

@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './customization.html',
  styleUrl: './customization.css'
})

export class CustomizationComponent implements OnInit{
  private dialogRef = inject(MatDialogRef<CustomizationComponent>);
  BASE_PRICE = 4;

  private cartService = inject(CartService);
  private ingredienteService = inject(IngredientsService);
  private categoriaIngredienteService = inject(CategoriaIngredienteService);

  ingredienteSignal = this.ingredienteService.ingredients;
  categoriaSignal = this.categoriaIngredienteService.categorieIngredienti;

  ingredientSelection = computed<Map<string, SelectableIngredient[]>>(() => {
    const map = new Map<string, SelectableIngredient[]>();

    for (const ing of this.ingredienteSignal()) {
      const list = map.get(ing.categoriaIngrediente.nome) ?? [];
      if(this.ingredientPreselection.has(ing.id))
        list.push({selected: true, quantity: this.ingredientPreselection.get(ing.id) ?? 1, ingrediente: ing});
      else 
        list.push({selected: false, quantity: 1, ingrediente: ing});
      map.set(ing.categoriaIngrediente.nome, list);
    }
    return map;
  })

  ngOnInit(): void {
    this.categoriaIngredienteService.list();
    this.ingredienteService.list();
    console.log(this.ingredientSelection());
  }

 constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customProduct.name = data.nome;
    this.customProduct.composizione = data.composizione;
    this.customProduct.productId = data.id;
    this.customProduct.price = this.calculatePrice(data.composizione);
    console.log(data.composizione);
    for(const comp of this.customProduct.composizione)
      this.ingredientPreselection.set(comp.ingrediente.id, comp.quantita);
  }

  customProduct = {
    name: '',
    productId: 0,
    price: 0,
    quantity: 1,
    composizione: [] as composizione[]
  }
  ingredientPreselection = new Map<number, number>();



  onAddToCart(): void {
    const composArray = [] as composizione[];
        this.ingredientSelection().forEach((value, key) => {
          for(const ingS of value){
            if(ingS.selected)
              composArray.push({
                id: 0,
                idProdotto: this.customProduct.productId,
                ingrediente: ingS.ingrediente,
                quantita: ingS.quantity
              });            
          }
        })
    this.customProduct.composizione = composArray;
    this.customProduct.price = this.calculatePrice(composArray);
    console.log(this.customProduct);
    this.cartService.addToCart(this.customProduct);
    this.dialogRef.close({updated: 'true', add: 'add'});
  }

  calculatePrice(comp: composizione[]): number{
    let total = this.BASE_PRICE;
    comp.forEach(comp => total += comp.ingrediente?.sovraprezzoAggiunta ?? 0 * comp.quantita );
    return total;
  }

  toggleSelection(item: SelectableIngredient) {
    item.selected = !item.selected;
    if (!item.selected) {
      item.quantity = 1; // Reset default when unchecked
    }
  }

  getSelectedItems() {
    const composArray = [] as SelectableIngredient[];
      this.ingredientSelection().forEach((value, key) => {
        for(const ingS of value){
          if(ingS.selected)
            composArray.push(ingS);
        }
      })
    return composArray;
  }

}